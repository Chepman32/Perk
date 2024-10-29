import {TrashIcon} from '@assets/svg';
import {
  Button,
  ButtonWrapper,
  DataPicker,
  Flex,
  Header,
  Input,
  InputSelect,
  KeyboardAvoidingWrapper,
  Layout,
  Loading,
  Typography,
} from '@components';
import {UploadImage} from './components';
import {useDispatch, useSelector} from '@store/store';
import {
  getGarage,
  setColorsSlice,
  setConfigurationSlice,
  setGenerationSlice,
  setMarksSlice,
  setModelSlice,
  setModificationSlice,
  setYearSlice,
} from '@slices';
import {Screens, Variables} from '@shared/enums';
import ImagePicker from 'react-native-image-crop-picker';
import {useEffect, useState} from 'react';
import {Cars} from '@services';
import {useAuth} from '@shared/hooks';
import {Alert, Modal} from 'react-native';
import {imagePickerGetName} from '@shared/utils/list';
import {
  ModalDeleteRecord,
  ModalDeleteWrapper,
} from '@screens/serviceHistory/components/style';

export const EditCar: React.FC = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {marks, model, generation, configuration, modification, year, colors} =
    useSelector(getGarage);
  const {editCar, carUploadImage, carId, carDeletePhoto, carDelete} = Cars;
  const {jwt} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [uploadedImages, setUploadedImages] = useState<any>([]);
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [vin, setVin] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);

  const openDocument = async () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: 'photo',
        multiple: true,
        maxFiles: 3,
      }).then(image => {
        setImages(image);
      });
    } catch (error) {}
  };

  const handleRemove = (localIdentifier: string) => {
    setImages(images.filter((i: any) => i.localIdentifier !== localIdentifier));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        mark: marks._id,
        model: model._id,
        generation: generation._id,
        configuration: configuration._id,
        modification: modification._id,
        year: Number(year.name),
        color: colors.name,
        licensePlate: licensePlate,
        vin: vin,
      };

      const response = await editCar(jwt, data, route.params?.carId);

      if (response) {
        handleUploadImageListener(route.params?.carId);
        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUploadImageListener = async (carId: string) => {
    if (images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        await handleUploadImage(carId, {
          type: images[i].mime,
          uri: images[i].path,
          name: imagePickerGetName(images[i].path),
        });
      }
    }
  };

  const handleUploadImage = async (
    carId: string,
    file: {type: string; uri: string; name: string},
  ) => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await carUploadImage(jwt, formData, carId);

    if (!response) {
      Alert.alert('Ошибка загрузки фото');
    }
  };

  const handleRemoveImage = async (_id: string) => {
    try {
      const response = await carDeletePhoto(jwt, route.params?.carId, _id);
      setUploadedImages(uploadedImages.filter((i: any) => i._id !== _id));

      if (response) {
        Alert.alert('Фото удаленно');
      }
    } catch (error) {}
  };

  const getCarId = async () => {
    const response = await carId(jwt, route.params.carId);

    if (response) {
      dispatch(
        setMarksSlice({
          _id: response?.mark._id,
          name: response?.mark.name,
        }),
      );
      dispatch(
        setModelSlice({
          _id: response?.model._id,
          name: response?.model.name,
        }),
      );
      dispatch(
        setGenerationSlice({
          _id: response?.generation._id,
          name: response?.generation.name,
          yearStart: response?.generation.yearStart,
          yearStop: response?.generation.yearStop,
        }),
      );
      dispatch(
        setConfigurationSlice({
          _id: response?.configuration._id,
          name: response?.configuration.name,
        }),
      );
      dispatch(
        setModificationSlice({
          _id: response?.modification._id,
          name: response?.modification.name,
        }),
      );
      dispatch(
        setColorsSlice({
          _id: response?.color,
          name: response?.color,
        }),
      );
      setUploadedImages(response?.photos);

      dispatch(
        setYearSlice({
          _id: response?.year,
          name: response?.year + '',
        }),
      );
      setVin(response?.vin);
      setLicensePlate(response?.licensePlate);
    }
  };

  const handleDeleteCar = async () => {
    try {
      setModalVisible(false);
      const response = await carDelete(jwt, route.params.carId);

      if (response) {
        navigation.pop(2);
      }
    } catch (error) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    getCarId();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Редактировать авто"
        rightContent={
          <ButtonWrapper handle={() => setModalVisible(true)}>
            <TrashIcon color="#F2F2F2" />
          </ButtonWrapper>
        }
      />
      <KeyboardAvoidingWrapper>
        <UploadImage
          handleRemove={handleRemove}
          images={images}
          uploadedImages={uploadedImages}
          handleRemoveUploadedImage={handleRemoveImage}
          handle={() => {
            openDocument();
            setDisabled(false);
          }}
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          label="Марка авто"
          value={marks.name}
          handle={() => {
            setDisabled(false);
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.BRAND,
            });
          }}
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={model.name}
          label="Модель"
          disabled={marks.name == null}
          handle={() => {
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.MODEL,
            });
            setDisabled(false);
          }}
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={generation.name}
          disabled={model.name == null}
          label="Поколение"
          handle={() => {
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.GENERATION,
            });
            setDisabled(false);
          }}
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={configuration.name}
          disabled={generation.name == null}
          label="Конфигурация"
          handle={() => {
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.CONFIGURATIONS,
            });
            setDisabled(false);
          }}
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={modification.name}
          disabled={configuration.name == null}
          label="Модификация"
          handle={() => {
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.MODIFICATIONS,
            });
            setDisabled(false);
          }}
        />

        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={
            year?.name !== 'null' && year?.name !== 'undefined'
              ? year?.name
              : ''
          }
          disabled={generation.name == null}
          label="Год выпуска"
          handle={() => {
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.YEAR,
            });
            setDisabled(false);
          }}
        />

        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={colors.name}
          label="Цвет"
          handle={() => {
            setDisabled(false);
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.COLORS,
            });
          }}
        />
        <Input
          onChangeText={value => {
            setLicensePlate(value);
            setDisabled(false);
          }}
          marginTop={12}
          value={licensePlate}
          placeholder="Госномер"
          hasDefaultValue
          subtractScreenWidth={32}
          xValue={28}
        />
        <Input
          onChangeText={value => {
            setVin(value);
            setDisabled(false);
          }}
          marginTop={12}
          value={vin}
          hasDefaultValue
          placeholder="VIN"
          subtractScreenWidth={32}
          xValue={8}
        />

        <Button
          disabled={
            generation._id == null ||
            configuration._id == null ||
            modification._id == null ||
            loading ||
            disabled
          }
          opacity={
            generation._id == null ||
            configuration._id == null ||
            modification._id == null ||
            loading ||
            disabled
              ? 0.5
              : 1
          }
          onPress={handleSubmit}
          subtractScreenWidth={24}
          marginTop={24}>
          <Typography
            fontWeight={500}
            lineHeight={20}
            size={15}
            color="#1D1D1D">
            Сохранить
          </Typography>
        </Button>
      </KeyboardAvoidingWrapper>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <ModalDeleteWrapper>
          <ModalDeleteRecord>
            <Typography
              fontWeight={600}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              Удалить автомобиль?
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
              <ButtonWrapper handle={handleDeleteCar}>
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
