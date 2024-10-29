import {Content} from '@assets/styles/globals';
import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  InputSelect,
  CarItem,
  Flex,
  Box,
  Layout,
  Loading,
} from '@components';
import {Cars} from '@services';
import {Screens, Variables} from '@shared/enums';
import {useAuth} from '@shared/hooks';
import {getGarage, setClearGarageSlice} from '@slices';
import {useDispatch, useSelector} from '@store/store';
import {useState} from 'react';
import {navigate} from 'src/navigation/navigation.action';

export const YourGarage: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();

  const {marks, model, generation, configuration, modification} =
    useSelector(getGarage);

  const {createCar} = Cars;
  const {jwt} = useAuth();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (list.length !== 0) {
        for (let i = 0; i < list.length; i++) {
          try {
            await createCar(jwt, {
              mark: list[i].marksId,
              model: list[i].modelId,
              generation: list[i].generationId,
              configuration: list[i].configurationId,
              modification: list[i].modificationId,
            });
          } catch (error) {}
        }
      }
      setLoading(false);
      navigation.replace(Screens.TABS);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddCar = () => {
    setList(prevState => [
      ...prevState,
      {
        marksName: marks.name,
        marksId: marks._id,
        modelId: model._id,
        generationId: generation._id,
        configurationId: configuration._id,
        modificationId: modification._id,
      },
    ]);
    dispatch(setClearGarageSlice());
  };

  const handleDeleteCar = (_id: string) => {
    setList(list.filter(i => i.marksId !== _id));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <KeyboardAvoidingWrapper
        bottom={
          <Content>
            <Flex>
              {!list?.length && (
                <Button
                  onPress={() => {
                    navigate(Screens.TABS);
                  }}
                  background="rgba(255, 255, 255, 0.08)"
                  fixedWidth={'100%'}>
                  <Typography lineHeight={20} size={15} color="#F2F2F2">
                    Заполню позже
                  </Typography>
                </Button>
              )}
              {!!list?.length && (
                <Button
                  onPress={handleSubmit}
                  fixedWidth={'100%'}
                  background="#F2F2F2">
                  <Typography
                    lineHeight={20}
                    size={15}
                    color="rgba(29, 29, 29, 1)">
                    Сохранить
                  </Typography>
                </Button>
              )}
            </Flex>
          </Content>
        }>
        <Typography
          marginTop={20}
          align="center"
          lineHeight={32}
          size={24}
          color="#F2F2F2">
          Ваш гараж
        </Typography>
        <Typography
          marginTop={12}
          align="center"
          lineHeight={20}
          marginLeft={10}
          marginRight={10}
          size={15}
          color="#7F7F7F">
          Заполните информацию о ваших {'\n'}
          автомобилях, чтобы мы могли предлагать {'\n'}
          вам наиболее подходящие услуги от наших {'\n'}
          партнёров
        </Typography>

        {!!list?.length && (
          <Box subtractScreenWidth={26} marginTop={24} marginBottom={20}>
            {list.map((item, index) => {
              return (
                <CarItem
                  removeIcon
                  key={index}
                  onPress={() => handleDeleteCar(item.marksId)}
                  marginBottom={12}
                  title={item.marksName}
                />
              );
            })}
          </Box>
        )}

        <InputSelect
          subtractScreenWidth={32}
          marginTop={!list?.length ? 24 : 0}
          label="Марка авто"
          value={marks.name}
          handle={() =>
            navigation.navigate(Screens.LIST_CAR_ITEMS, {
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
            navigation.navigate(Screens.LIST_CAR_ITEMS, {
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
            navigation.navigate(Screens.LIST_CAR_ITEMS, {
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
            navigation.navigate(Screens.LIST_CAR_ITEMS, {
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
            navigation.navigate(Screens.LIST_CAR_ITEMS, {
              listType: Variables.MODIFICATIONS,
            })
          }
        />
        {/* <InputSelect
          subtractScreenWidth={32}
          marginTop={15}
          label="Год выпуска"
        /> */}
        <Box subtractScreenWidth={26} marginBottom={20}>
          <Button
            height={44}
            borderRadius={12}
            disabled={modification._id == null}
            opacity={modification._id == null ? 0.5 : 1}
            marginTop={16}
            onPress={handleAddCar}
            background="rgba(242, 242, 242, 1)"
            fixedWidth={'50%'}>
            <Typography
              align="center"
              lineHeight={20}
              size={15}
              color="rgba(29, 29, 29, 1)">
              Добавить в гараж
            </Typography>
          </Button>
        </Box>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
