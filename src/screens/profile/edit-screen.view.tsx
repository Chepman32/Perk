import {Center, Content} from '@assets/styles/globals';
import {
  CalendarBorderIcon,
  CloseIcon,
  DownIcon,
  EditInputIcon,
  RigthArrow,
  UploadImageIcon,
} from '@assets/svg';
import {
  Box,
  Button,
  ButtonWrapper,
  DataPicker,
  Flex,
  Header,
  Input,
  InputSelect,
  KeyboardAvoidingWrapper,
  Layout,
  Typography,
  UserCompletedStatus,
} from '@components';
import {Logout} from './components';
import {scale} from 'react-native-size-matters';
import {useCallback, useEffect, useRef, useState} from 'react';
import {User} from '@services';
import {useAuth} from '@shared/hooks';
import {dateFormatFromISO} from '@shared/utils/date';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {imagePickerGetName} from '@shared/utils/list';
import {UserAvatar} from './components/style';
import {DateTime} from 'luxon';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {ModalChildrenLocation} from '@screens/filter/components';

const TYPE_DATE = {
  birthday: 'Birthday',
  driverSince: 'DriverSince',
};

export const EditProfile: React.FC = ({navigation, route}: any) => {
  const dataPickerRef = useRef<any>();
  const dataPickerDriverSinceRef = useRef<any>();
  const {updateUser, userUploadAvatar} = User;
  const locationRef = useRef<BottomSheet>(null);
  const {jwt} = useAuth();
  const typeDate = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false);

  const [birthdayError, setBirthdayError] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ),
    firstName: Yup.string().trim().min(1),
    lastName: Yup.string().trim().min(3),
    middleName: Yup.string().trim().min(3),
    city: Yup.string().trim().min(3),
    driverSince: Yup.string(),
    birthday: Yup.string(),
  });

  const selectDate = (date: string) => {
    if (typeDate.current === TYPE_DATE.birthday) {
      setFieldValue('birthday', date);
      return false;
    }
    if (typeDate.current === TYPE_DATE.driverSince) {
      setFieldValue('driverSince', date);
      return false;
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={1} />,
    [],
  );

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
      email: route.params?.item?.email ? route.params?.item?.email : '',
      firstName: route.params?.item?.firstName,
      lastName: route.params?.item?.lastName
        ? route.params?.item?.lastName
        : '',
      middleName: route.params?.item?.middleName
        ? route.params?.item?.middleName
        : '',
      birthday: route.params?.item?.birthday
        ? dateFormatFromISO(route.params?.item?.birthday)
        : '',
      driverSince: route.params?.item?.driverSince
        ? dateFormatFromISO(route.params?.item?.driverSince)
        : '',
      city: route.params?.item?.city ? route.params?.item?.city : '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        setLoading(true);

        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: values.middleName,
          email: values.email || '',
          birthday: values.birthday || '',
          city: values.city || '',
          driverSince: values.driverSince || '',
        };

        const response = await updateUser(jwt, data);

        if (response) {
          Alert.alert('Профиль отредактирован');
          navigation.goBack();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  const uploadAvatar = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        type: image?.mime,
        uri: image?.path,
        name: imagePickerGetName(image?.path),
      });

      const response = await userUploadAvatar(jwt, formData);

      if (response) {
        Alert.alert('Фото загружено');
      }
    } catch (error) {}
  };

  const handleUploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      multiple: false,
    }).then(image => {
      uploadAvatar(image);
    });
  };

  useEffect(() => {
    setFieldValue('firstName', route.params?.item?.firstName);
    setFieldValue('lastName', route.params?.item?.lastName);
    setFieldValue('middleName', route.params?.item?.middleName);
    setFieldValue('city', route.params?.item?.city);
    setFieldValue('email', route.params?.item?.email);
    setFieldValue('driverSince', route.params?.item?.driverSince);
    setFieldValue('birthday', route.params?.item?.birthday);
  }, []);

  const getYear = () => {
    if (
      DateTime.now().toJSDate().getFullYear() &&
      values.birthday?.getFullYear?.()
    ) {
      return DateTime.now()
        .minus({
          year:
            +DateTime.now().toJSDate().getFullYear() -
            +values.birthday?.getFullYear?.() -
            18,
        })
        .toJSDate();
    }
  };

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        title="Мои данные"
        handleNavigateBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingWrapper>
        <UserCompletedStatus userInfo={route.params?.item} marginTop={16} />
        <Content>
          <Typography
            marginTop={8}
            fontWeight={400}
            lineHeight={16}
            size={13}
            color="#7F7F7F">
            Укажите больше о себе. Это откроет вам {'\n'}возможности
            использования Консьерж-сервиса
          </Typography>
        </Content>
        <Flex marginTop={12} subtractScreenWidth={24}>
          <Button
            background="rgba(255, 255, 255, 0.08)"
            fixedWidth={`${scale(60)}px`}
            height={60}
            onPress={handleUploadImage}
            borderRadius={60}>
            {route.params?.item?.avatar?.url ? (
              <UserAvatar
                source={{
                  uri: route.params?.item?.avatar?.url,
                }}
              />
            ) : (
              <UploadImageIcon />
            )}
          </Button>
          <Box subtractScreenWidth={90}>
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={11}
              color="#7F7F7F">
              Фамилия, имя, отчество
            </Typography>
            <Typography
              marginTop={2}
              fontWeight={600}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {route?.params?.item?.lastName} {route?.params?.item?.firstName}{' '}
              {route?.params?.item?.middleName}
            </Typography>
          </Box>
          {/* <RigthArrow /> */}
        </Flex>
        {/* <InputSelect
            rightContent={<EditInputIcon />}
            marginTop={12}
            subtractScreenWidth={24}
            handle={() => navigation.navigate(Screens.PROFILE_CODE)}
            label="Номер телефона"
          /> */}
        <Input
          marginTop={12}
          onChangeText={e => {
            handleChange('firstName')(e);
            setEdited(true);
          }}
          value={values.firstName}
          errors={errors.firstName}
          subtractScreenWidth={24}
          placeholder="Имя"
          xValue={15}
        />
        <Input
          marginTop={12}
          onChangeText={e => {
            handleChange('lastName')(e);
            setEdited(true);
          }}
          value={values.lastName}
          errors={errors.lastName}
          subtractScreenWidth={24}
          placeholder="Фамилия"
          xValue={29}
        />
        <Input
          marginTop={12}
          onChangeText={e => {
            handleChange('middleName')(e);
            setEdited(true);
          }}
          value={values.middleName}
          errors={errors.middleName}
          subtractScreenWidth={26}
          placeholder="Отчество"
          xValue={30}
        />
        <Input
          marginTop={12}
          onChangeText={e => {
            handleChange('email')(e);
            setEdited(true);
          }}
          value={values.email}
          errors={errors.email}
          subtractScreenWidth={24}
          placeholder="Email"
          xValue={17}
        />
        <InputSelect
          marginTop={12}
          rightContent={<CalendarBorderIcon />}
          errors={errors.birthday || birthdayError}
          subtractScreenWidth={24}
          label="Дата рождения"
          value={dateFormatFromISO(values.birthday)}
          handle={() => {
            setEdited(true);
            dataPickerRef.current.openDataPicker();
            typeDate.current = TYPE_DATE.birthday;
          }}
        />
        <InputSelect
          marginTop={12}
          subtractScreenWidth={24}
          value={values.city}
          errors={errors.city}
          rightContent={<DownIcon />}
          label="Город"
          handle={() => {
            setEdited(true);
            locationRef.current?.snapToIndex(1);
          }}
        />
        <InputSelect
          marginTop={12}
          rightContent={<CalendarBorderIcon />}
          subtractScreenWidth={24}
          value={dateFormatFromISO(values.driverSince)}
          errors={errors.driverSince}
          label="Дата получения прав"
          handle={() => {
            if (values.birthday) {
              setEdited(true);
              dataPickerDriverSinceRef.current.openDataPicker();
              typeDate.current = TYPE_DATE.driverSince;
            } else {
              setBirthdayError(true);
              setTimeout(() => {
                setBirthdayError(false);
              }, 2000);
            }
          }}
        />
        <Button
          onPress={handleSubmit}
          marginTop={20}
          loader={loading}
          disabled={!(isValid && dirty) || loading || !edited}
          profileDisabled={!(isValid && dirty) || loading || !edited}
          subtractScreenWidth={24}>
          <Typography
            fontWeight={500}
            marginLeft={8}
            lineHeight={20}
            size={15}
            color="#1D1D1D">
            Сохранить
          </Typography>
        </Button>
        <Logout />
      </KeyboardAvoidingWrapper>

      <DataPicker
        maximumDate={DateTime.now().minus({year: 18}).toJSDate()}
        selectedDate={DateTime.now().minus({year: 18}).toJSDate()}
        setDate={value => selectDate(value)}
        ref={dataPickerRef}
      />

      {!!getYear() && (
        <DataPicker
          minimumDate={getYear()}
          maximumDate={DateTime.now().toJSDate()}
          selectedDate={DateTime.now().toJSDate()}
          setDate={value => selectDate(value)}
          ref={dataPickerDriverSinceRef}
        />
      )}

      <BottomSheet
        snapPoints={[0.1, '100%']}
        backdropComponent={renderBackdrop}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={locationRef}>
        <Header
          handleNavigateBack={() => locationRef.current?.close()}
          initShowSearch
          paddingHorizontal={16}
          placeholder="Введите место"
          background="transparent"
        />
        <ModalChildrenLocation
          handle={value => {
            setFieldValue('city', value);
            locationRef.current?.close();
          }}
        />
      </BottomSheet>
    </Layout>
  );
};
