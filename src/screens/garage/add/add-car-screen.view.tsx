import {
  Button,
  Header,
  Input,
  InputSelect,
  KeyboardAvoidingWrapper,
  Layout,
  Loading,
  Typography,
} from '@components';
import {UploadImage} from './components';
import {useSelector} from '@store/store';
import {getGarage} from '@slices';
import {Screens, Variables} from '@shared/enums';
import ImagePicker from 'react-native-image-crop-picker';
import {useState} from 'react';
import {Cars} from '@services';
import {useAuth} from '@shared/hooks';
import {Alert} from 'react-native';
import {imagePickerGetName} from '@shared/utils/list';

export const AddCar: React.FC = ({navigation}: any) => {
  const {marks, model, generation, colors, configuration, year, modification} =
    useSelector(getGarage);
  const {createCar, carUploadImage} = Cars;
  const {jwt} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [vin, setVin] = useState<string>('');

  const openDocument = async () => {
    try {
      ImagePicker.openPicker({
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
      const response = await createCar(jwt, data);
      if (response) {
        handleUploadImageListener(response._id);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Добавление авто"
      />
      <KeyboardAvoidingWrapper>
        <UploadImage
          handleRemove={handleRemove}
          images={images}
          handle={openDocument}
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          label="Марка авто"
          value={marks.name}
          handle={() =>
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.BRAND,
            })
          }
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={model.name}
          label="Модель"
          disabled={marks.name == null}
          handle={() =>
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.MODEL,
            })
          }
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={generation.name}
          disabled={model.name == null}
          label="Поколение"
          handle={() =>
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.GENERATION,
            })
          }
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={configuration.name}
          disabled={generation.name == null}
          label="Конфигурация"
          handle={() =>
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.CONFIGURATIONS,
            })
          }
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={modification.name}
          disabled={configuration.name == null}
          label="Модификация"
          handle={() =>
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.MODIFICATIONS,
            })
          }
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={year.name}
          disabled={generation.name == null}
          label="Год выпуска"
          handle={() =>
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.YEAR,
            })
          }
        />
        <InputSelect
          subtractScreenWidth={32}
          marginTop={12}
          value={colors.name}
          label="Цвет"
          handle={() =>
            navigation.push(Screens.LIST_CAR_ITEMS, {
              listType: Variables.COLORS,
            })
          }
        />
        <Input
          onChangeText={value => setLicensePlate(value)}
          marginTop={12}
          placeholder="Госномер"
          subtractScreenWidth={32}
          xValue={26}
        />
        <Input
          onChangeText={value => setVin(value)}
          marginTop={12}
          placeholder="VIN"
          subtractScreenWidth={32}
          xValue={6}
        />

        <Button
          disabled={modification._id == null || loading}
          opacity={modification._id == null || loading ? 0.5 : 1}
          onPress={handleSubmit}
          subtractScreenWidth={32}
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
    </Layout>
  );
};
