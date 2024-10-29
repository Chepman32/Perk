import {
  BrandItemHorizotal,
  Button,
  ButtonWrapper,
  DataPicker,
  TimePicker,
  Flex,
  Header,
  Input,
  InputSelect,
  KeyboardAvoidingWrapper,
  Layout,
  Loading,
  Typography,
} from '@components';
import {CalendarBorderIcon, CloseIcon, DownIcon, PlusIcon} from '@assets/svg';
import * as Yup from 'yup';
import {Center, Content} from '@assets/styles/globals';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {ModalChildrenCategory} from '@screens/filter/components';
import {ScrollView} from 'react-native-gesture-handler';
import {Brands, Cars, Tasks} from '@services';
import {useAuth} from '@shared/hooks';
import {BrandsList, BrandsListFooter} from './components/style';
import {dateFormatFromISO} from '@shared/utils/date';
import {Alert, View} from 'react-native';
import {reminders} from '@shared/data/reminders';
import {DateTime} from 'luxon';
import {useFormik} from 'formik';
import {Attachment} from 'src/components/Attachment';
import {useAttachment} from '@shared/hooks/useAttachment';
import {scale} from 'react-native-size-matters';

const TYPE_DATE = {
  start: 'START',
  end: 'END',
};

export const AddRecord: React.FC = ({navigation, route}: any) => {
  const {getBrands} = Brands;
  const {createTask, createReminders} = Tasks;
  const {jwt} = useAuth();

  const dataPickerRef = useRef<any>();
  const timePickerRef = useRef<any>();
  const addReminderRef = useRef<BottomSheet>(null);
  const typeDate = useRef<any>();
  const brandsRef = useRef<BottomSheet>(null);
  const [brandsList, setBrandList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<any>(null);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstCarId, setFirstCarId] = useState(null);

  const {attachments, handleDeleteAttach, setAttachments, handleImageAttach} =
    useAttachment();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    time: Yup.string().required(),
    startDate: Yup.string().required(),
    brand: Yup.object().shape({_id: Yup.string().required()}).required(),
  });

  useEffect(() => {
    if (!route.params?.carId) {
      Cars.cars(jwt).then(response => {
        if (response?.[0]?._id) {
          setFirstCarId(response?.[0]?._id);
        }
      });
    }
  }, []);

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
    setPaginationLoading(true);
    const nextPage = currentPage + 1;

    const response = await getBrands(jwt, nextPage);

    if (response) {
      if (response?.items.length > 10) {
        setBrandList([...brandsList, ...response?.items]);
        setCurrentPage(nextPage);
      }
    }
    setPaginationLoading(false);
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
        _id: '',
        title: '',
      },
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      price: '',
      time: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        setLoading(true);

        const parsed = DateTime.fromISO(values.time);

        const startDateSetTime = DateTime.fromJSDate(values.startDate)
          .set({
            minute: parsed.minute,
            hour: parsed.hour,
          })
          .toUTC();

        const data = {
          car: route.params?.carId || firstCarId,
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
          data.endDate = values.endDate.toISOString();
        }

        const response: any = await createTask(jwt, data);

        if (response) {
          Alert.alert('Запись добавлена');
          handleCreateReminders(response?._id);
          navigation.goBack();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  const handleCreateReminders = async (taskId: string) => {
    try {
      if (selectedReminder) {
        await createReminders(jwt, taskId, selectedReminder.time);
      }
    } catch (error) {}
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
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <BrandsListFooter>
              {paginationLoading && (
                <Loading loadingWidth={30} loadingHeight={20} />
              )}
            </BrandsListFooter>
          }
        />
      </BottomSheet>
    );
  }, [brandsList, currentPage]);

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Добавить запись"
      />
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            loader={loading}
            opacity={
              !(isValid && dirty) ||
              loading ||
              (!firstCarId && !route.params?.carId)
                ? 0.6
                : 1
            }
            disabled={
              !(isValid && dirty) ||
              loading ||
              (!firstCarId && !route.params?.carId)
            }
            onPress={handleSubmit}
            subtractScreenWidth={32}>
            <Typography
              fontWeight={500}
              marginLeft={8}
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Добавить
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
            onChangeText={handleChange('title')}
            placeholder="Что нужно сделать"
            height={52}
            borderRadius={12}
            marginTop={12}
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
            onChangeText={handleChange('description')}
            placeholder="Комментарий"
            marginTop={12}
            xValue={44}
          />
          <Input
            borderNone
            placeholder="Стоимость"
            onChangeText={handleChange('price')}
            marginTop={12}
            keyboardType="numeric"
            height={52}
            borderRadius={12}
            errors={errors.price}
            xValue={34}
          />
          {selectedReminder && (
            <InputSelect marginTop={12} value={selectedReminder?.title} />
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
                  setSelectedReminder(item);
                }}
                key={index}
                selectedId={selectedReminder?._id}
                item={item}
              />
            );
          })}
        </ScrollView>
      </BottomSheet>
      <TimePicker
        setDate={value => setFieldValue('time', value)}
        ref={timePickerRef}
      />
      <DataPicker setDate={value => selectDate(value)} ref={dataPickerRef} />
    </Layout>
  );
};
