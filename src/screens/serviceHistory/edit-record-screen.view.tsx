import {
  Attachment,
  Box,
  BrandItemHorizotal,
  Button,
  ButtonWrapper,
  DataPicker,
  Flex,
  Frame,
  Header,
  Input,
  InputSelect,
  KeyboardAvoidingWrapper,
  Layout,
  TimePicker,
  Typography,
} from '@components';
import {
  CalendarBorderIcon,
  CloseIcon,
  DocumentBorderIcon,
  DocumentIcon,
  DownIcon,
  NotificationIcon,
  PlusIcon,
  TrashIcon,
} from '@assets/svg';
import {Center, Content} from '@assets/styles/globals';
import {Brands, Tasks} from '@services';
import {useAuth} from '@shared/hooks';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {
  BrandsList,
  BrandsListFooter,
  ModalDeleteRecord,
  ModalDeleteWrapper,
} from './components/style';
import {ActivityIndicator, Alert, Modal, View} from 'react-native';
import {dateFormatFromISO, dateMouthYearLetters} from '@shared/utils/date';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {DateTime} from 'luxon';
import {filterRemindersTitle, imagePickerGetName} from '@shared/utils/list';
import {reminders} from '@shared/data/reminders';
import {ScrollView} from 'react-native-gesture-handler';
import {ModalChildrenCategory} from '@screens/filter/components';
import {scale} from 'react-native-size-matters';
import {useAttachment} from '@shared/hooks/useAttachment';

const TYPE_DATE = {
  start: 'START',
  end: 'END',
};

export const EditRecord: React.FC = ({navigation, route}: any) => {
  const {editTask, deleteTask, uploadCheck, deleteReminder, createReminders} =
    Tasks;
  const {getBrands} = Brands;
  const {jwt} = useAuth();
  const {attachments, handleDeleteAttach, setAttachments, handleImageAttach} =
    useAttachment();

  const brandsRef = useRef<BottomSheet>(null);
  const addReminderRef = useRef<BottomSheet>(null);
  const dataPickerRef = useRef<any>();
  const typeDate = useRef<any>();
  const timePickerRef = useRef<any>();
  const [loadingPagination, setLoadingPagination] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [brandsList, setBrandList] = useState<any>([]);
  const [remindersList, setRemindersList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [check, setCheck] = useState<any>({});

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    time: Yup.string().required(),
    startDate: Yup.string().required(),
    brand: Yup.object().shape({_id: Yup.string().required()}).required(),
  });

  const getInitialBrands = async () => {
    try {
      setLoading(true);
      const response = await getBrands(jwt, currentPage);

      if (response) {
        setBrandList(response?.items);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMoreMarks = async () => {
    setLoadingPagination(true);
    const nextPage = currentPage + 1;

    const response = await getBrands(jwt, nextPage);

    if (response) {
      if (response?.items.length > 10) {
        setBrandList([...brandsList, ...response?.items]);
        setCurrentPage(nextPage);
      }
    }
    setLoadingPagination(false);
  };

  const onSearchBrands = async (search: string) => {
    const response = await getBrands(
      jwt,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      search,
    );

    if (response) {
      setBrandList(response?.items);
    }
  };

  const selectDate = (date: string) => {
    if (typeDate.current === TYPE_DATE.start) {
      setFieldValue('startDate', date);
      return false;
    }
    if (typeDate.current === TYPE_DATE.end) {
      setFieldValue('endDate', date);
      return false;
    }
  };

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    dirty,
    isValid,
    values,
    errors,
  } = useFormik({
    initialValues: {
      brand: {
        _id: route.params?.item?.brand?._id,
        title: route.params?.item?.brand?.title,
      },
      title: route.params?.item?.title,
      description: route.params?.item?.description,
      startDate: route.params?.item?.startDate,
      endDate: route.params?.item?.endDate,
      price: String(route.params?.item?.price),
      time: dateMouthYearLetters(route.params?.item?.startDate, {
        minute: '2-digit',
        hour: '2-digit',
      }),
      selectedReminder: {time: 0, title: '', _id: ''},
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        setLoading(true);
        const parsed = DateTime.fromISO(values.time);

        const startDateSetTime = DateTime.fromISO(values.startDate).set({
          minute: parsed.minute,
          hour: parsed.hour,
        });

        const data = {
          brand: values.brand?._id,
          title: values.title,
          description: values.description,
          startDate: startDateSetTime,
          price: Number(values.price),
        };

        if (attachments?.length) {
          data.attachments = attachments?.map(el => el.id);
        }

        if (values.endDate) {
          data.endDate = values.endDate;
        }

        const response: any = await editTask(
          jwt,
          route?.params?.item?._id,
          data,
        );

        if (response) {
          Alert.alert('Запись отредактирована');
          handleCreateReminders();
          uploadFile();
          navigation.pop(2);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  const handleCreateReminders = async () => {
    try {
      if (values.selectedReminder) {
        await createReminders(
          jwt,
          route?.params?.item?._id,
          values.selectedReminder.time,
        );
      }
    } catch (error) {}
  };

  const handleDocument = async () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
      }).then(image => {
        setCheck(image);
      });
    } catch (error) {}
  };

  const uploadFile = async () => {
    try {
      if (Object.values(check).length == 0) {
        const formData = new FormData();
        formData.append('check', {
          type: check?.mime,
          uri: check.path,
          name: imagePickerGetName(check?.path),
        });

        const response = await uploadCheck(
          jwt,
          route.params?.item?._id,
          formData,
        );

        if (!response) {
          Alert.alert('Ошибка загрузки чека');
        }
      }
    } catch (error) {
      return false;
    }
  };

  const handleDeleteRecord = async () => {
    try {
      setModalVisible(false);
      const response: any = await deleteTask(jwt, route?.params?.item?._id);
      if (response) {
        navigation.pop(2);
      }
    } catch (error) {
      setModalVisible(false);
    }
  };

  const handleDeleteReminders = async (_id: string) => {
    try {
      const response = await deleteReminder(jwt, _id);

      if (response) {
        setRemindersList(remindersList.filter((i: any) => i._id !== _id));
        Alert.alert('Напоминание удаленно');
      }
    } catch (error) {}
  };

  useEffect(() => {
    setFieldValue('title', route.params?.item?.title);
    setFieldValue(
      'time',
      dateMouthYearLetters(route.params?.item?.startDate, {
        minute: '2-digit',
        hour: '2-digit',
      }),
    );
    setFieldValue('brand', {
      _id: route.params?.item?.brand?._id,
      title: route.params?.item?.brand?.title,
    });
    setFieldValue('description', route.params?.item?.description);
    setFieldValue('startDate', route.params?.item?.startDate);
    setFieldValue('endDate', route.params?.item?.endDate);
    setFieldValue('price', String(route.params?.item?.price));
    setRemindersList(route.params?.item.reminders);
  }, []);

  useEffect(() => {
    if (route.params?.item?.attachments?.length) {
      setAttachments(
        route.params?.item?.attachments?.map(
          (el: {url: string; mimetype: string; _id: string}) => ({
            id: el._id,
            file: {
              mime: el.mimetype,
              path: el.url,
            },
          }),
        ),
      );
    }
  }, []);

  useEffect(() => {
    getInitialBrands();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  );

  const brandListMemo = useMemo(() => {
    return (
      <BottomSheet
        snapPoints={[0.1, '97%']}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        backdropComponent={renderBackdrop}
        ref={brandsRef}>
        <Header
          handleNavigateBack={() => brandsRef.current?.close()}
          initShowSearch
          paddingHorizontal={16}
          placeholder="Введите место"
          rightContent={<CloseIcon color="#F2F2F2" />}
          handleRightContent={() => brandsRef.current?.close()}
          onChangeText={onSearchBrands}
          background="transparent"
        />
        <BrandsList
          data={brandsList}
          keyExtractor={(i: any) => String(i._id)}
          renderItem={({item}: any) => {
            return (
              <BrandItemHorizotal
                image={item?.avatar?.url}
                handle={() => {
                  setFieldValue('brand', {
                    _id: item?._id,
                    title: item?.title,
                  });
                  brandsRef.current?.close();
                }}
                title={item?.title}
              />
            );
          }}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd > 1) {
              fetchMoreMarks();
            }
          }}
          ListFooterComponent={
            <BrandsListFooter>
              {loadingPagination && <ActivityIndicator color={'#f2f2f2'} />}
            </BrandsListFooter>
          }
          onEndReachedThreshold={0.5}
        />
      </BottomSheet>
    );
  }, [brandsList, currentPage]);

  return (
    <Layout>
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Редактирование записи"
        rightContent={
          <ButtonWrapper handle={() => setModalVisible(true)}>
            <TrashIcon color="#F2F2F2" />
          </ButtonWrapper>
        }
      />
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            loader={loading}
            opacity={!(isValid && dirty) || loading ? 0.6 : 1}
            disabled={!(isValid && dirty) || loading}
            onPress={() => {
              handleSubmit();
              uploadFile();
            }}
            subtractScreenWidth={32}>
            <Typography
              fontWeight={500}
              marginLeft={8}
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Сохранить
            </Typography>
          </Button>
        }>
        <Content>
          <InputSelect
            rightContent={<CalendarBorderIcon />}
            marginTop={8}
            handle={() => {
              dataPickerRef.current.openDataPicker();
              typeDate.current = TYPE_DATE.start;
            }}
            label="Дата начала обслуживания"
            value={dateFormatFromISO(values.startDate)}
            errors={errors.startDate}
          />
          <InputSelect
            rightContent={<CalendarBorderIcon />}
            marginTop={8}
            handle={() => timePickerRef.current.openDataPicker()}
            label="Время"
            value={values.time}
            errors={errors.time}
          />
          <InputSelect
            rightContent={<CalendarBorderIcon />}
            label="Дата окончания обслуживания"
            marginTop={12}
            handle={() => {
              dataPickerRef.current.openDataPicker();
              typeDate.current = TYPE_DATE.end;
            }}
            value={dateFormatFromISO(values.endDate)}
          />
          <Input
            borderNone
            placeholder="Что нужно сделать"
            onChangeText={handleChange('title')}
            marginTop={12}
            value={values.title}
            errors={errors.title}
            xValue={58}
          />
          <InputSelect
            label="Место"
            rightContent={<DownIcon />}
            marginTop={12}
            value={values.brand?.title}
            handle={() => brandsRef.current?.snapToIndex(1)}
            errors={errors.brand}
          />
          <Input
            multiline
            borderNone
            height={100}
            placeholder="Комментарий"
            onChangeText={handleChange('description')}
            marginTop={12}
            value={values.description}
            errors={errors.description}
            xValue={44}
          />
          <Input
            borderNone
            placeholder="Стоимость"
            onChangeText={handleChange('price')}
            marginTop={12}
            value={values.price}
            errors={errors.price}
            xValue={34}
          />

          <Button
            marginTop={12}
            marginBottom={14}
            onPress={handleDocument}
            background="rgba(255, 255, 255, 0.08)">
            <Flex justifyContent="center">
              <DocumentBorderIcon />
              <Typography
                fontWeight={500}
                marginLeft={8}
                lineHeight={20}
                size={15}
                color="#F2F2F2">
                Прикрепить чек
              </Typography>
            </Flex>
          </Button>

          {values.selectedReminder?.title.length !== 0 && (
            <InputSelect
              label="Напоминание"
              value={values.selectedReminder?.title}
            />
          )}

          <Typography
            size={13}
            lineHeight={16}
            color="#f2f2f2"
            marginTop={+`${scale(16)}`}
            marginBottom={+`${scale(8)}`}
            fontWeight={400}>
            До 5 фотографий, каждая не более 10 Мб
          </Typography>

          <View style={{marginLeft: -8}}>
            <Attachment
              scale
              type={'image'}
              setAttachments={setAttachments}
              attachments={attachments}
              handleDeleteAttach={handleDeleteAttach}
              handleImageAttach={handleImageAttach}
            />
          </View>

          <Button
            marginTop={12}
            fixedWidth="240px"
            onPress={() => addReminderRef.current?.snapToIndex(1)}
            height={44}
            marginBottom={20}
            background="rgba(255, 255, 255, 0.08)">
            <Flex justifyContent="center">
              <PlusIcon width={16} height={16} color="#F2F2F2" />
              <Typography
                fontWeight={500}
                marginLeft={8}
                lineHeight={16}
                size={13}
                color="#F2F2F2">
                Добавить напоминание
              </Typography>
            </Flex>
          </Button>

          {Object.values(check).length !== 0 && (
            <Frame marginTop={1} marginBottom={20}>
              <Flex>
                <Box fixedWidth="24px">
                  <DocumentIcon />
                </Box>
                <Box subtractScreenWidth={110}>
                  <Typography
                    fontWeight={500}
                    lineHeight={20}
                    size={15}
                    color="#F2F2F2">
                    {check?.filename || 'Файл'}
                  </Typography>
                </Box>
                <Box fixedWidth="20px">
                  <Flex justifyContent="flex-end">
                    <ButtonWrapper handle={() => setCheck({})}>
                      <CloseIcon />
                    </ButtonWrapper>
                  </Flex>
                </Box>
              </Flex>
            </Frame>
          )}
          {remindersList.length !== 0 &&
            remindersList.map((item: any, index: number) => {
              return (
                <Frame key={index} marginTop={1} marginBottom={20}>
                  <Flex>
                    <Box fixedWidth="24px">
                      <NotificationIcon />
                    </Box>
                    <Box subtractScreenWidth={110}>
                      <Typography
                        fontWeight={500}
                        lineHeight={20}
                        size={15}
                        color="#F2F2F2">
                        {filterRemindersTitle(
                          reminders,
                          item?.fireDiffInMinutes,
                        )}
                      </Typography>
                    </Box>
                    <Box fixedWidth="20px">
                      <Flex justifyContent="flex-end">
                        <ButtonWrapper
                          handle={() => handleDeleteReminders(item?._id)}>
                          <CloseIcon />
                        </ButtonWrapper>
                      </Flex>
                    </Box>
                  </Flex>
                </Frame>
              );
            })}
        </Content>
      </KeyboardAvoidingWrapper>

      {brandListMemo}

      <BottomSheet
        snapPoints={[0.1, '55%']}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        backdropComponent={renderBackdrop}
        ref={addReminderRef}>
        <Center>
          <Content>
            <Flex marginBottom={20}>
              <Typography
                fontWeight={600}
                lineHeight={24}
                size={18}
                color="#F2F2F2">
                Добавить напоминание
              </Typography>
              <ButtonWrapper handle={() => addReminderRef.current?.close()}>
                <CloseIcon />
              </ButtonWrapper>
            </Flex>
          </Content>
        </Center>
        <ScrollView showsVerticalScrollIndicator={false}>
          {reminders.map((item: any, index) => {
            return (
              <ModalChildrenCategory
                handle={() => {
                  addReminderRef.current?.close();
                  setFieldValue('selectedReminder', item);
                }}
                key={index}
                selectedId={values.selectedReminder?._id}
                item={item}
              />
            );
          })}
        </ScrollView>
      </BottomSheet>

      <DataPicker setDate={value => selectDate(value)} ref={dataPickerRef} />
      <TimePicker
        setDate={value => setFieldValue('time', value)}
        ref={timePickerRef}
      />

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <ModalDeleteWrapper>
          <ModalDeleteRecord>
            <Typography
              fontWeight={600}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              Удалить событие?
            </Typography>
            <Typography
              fontWeight={400}
              marginTop={8}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              Вы уверены? Восстановить его будет невозможно. Аналитика по
              текущему событию пропадет.
            </Typography>

            <Flex marginTop={12} justifyContent="flex-end">
              <ButtonWrapper handle={() => setModalVisible(false)}>
                <Typography
                  fontWeight={500}
                  lineHeight={16}
                  marginRight={12}
                  size={13}
                  color="#F2F2F2">
                  Отмена
                </Typography>
              </ButtonWrapper>
              <ButtonWrapper handle={handleDeleteRecord}>
                <Typography
                  fontWeight={500}
                  lineHeight={16}
                  size={13}
                  color="#C53830">
                  Удалить
                </Typography>
              </ButtonWrapper>
            </Flex>
          </ModalDeleteRecord>
        </ModalDeleteWrapper>
      </Modal>
    </Layout>
  );
};
