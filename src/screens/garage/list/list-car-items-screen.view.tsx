import {Box, Flex, Header, Layout, Loading, Typography} from '@components';
import {CarList, DidnFindBrand, BorderCarItem} from './components/style';
import {SearchIcon} from '@assets/svg';
import {Cars} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from '@store/store';
import {
  getGarage,
  setMarksSlice,
  setModelSlice,
  setGenerationSlice,
  setConfigurationSlice,
  setModificationSlice,
  setColorsSlice,
  setYearSlice,
} from '@slices';
import {Screens, Variables} from '@shared/enums';
import {BrandsListFooter} from '@screens/serviceHistory/components/style';
import {searchList} from '@shared/utils/search';

export const ListCarItems: React.FC = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {jwt} = useAuth();
  const {marks, model, generation, configuration} = useSelector(getGarage);
  const {
    carMarks,
    carModel,
    carGeneration,
    carConfigurations,
    carModifications,
  } = Cars;
  const [list, setList] = useState<any>([]);
  const [tempList, setTempList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const getCarMarks = async () => {
    try {
      setPaginationLoading(true);
      const response = await carMarks(jwt, currentPage);

      if (response) {
        setList(response?.items);
        setTempList(response?.items);
      }
      setPaginationLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMoreMarks = async () => {
    if (route.params.listType == Variables.BRAND) {
      if (paginationLoading) return;

      setPaginationLoading(true);
      const nextPage = currentPage + 1;
      const response = await carMarks(jwt, nextPage);

      if (response) {
        setTempList([...tempList, ...response?.items]);
        if (!search) {
          setList([...list, ...response?.items]);
        }
        setCurrentPage(nextPage);
      }
      setPaginationLoading(false);
    }
  };

  const getCarModel = async () => {
    setLoading(true);
    const response = await carModel(jwt, marks._id);

    if (response) {
      setList(response);
      setTempList(response);
    }
    setLoading(false);
  };

  const getCarGeneration = async () => {
    setLoading(true);
    const response = await carGeneration(jwt, model._id);

    if (response) {
      setList(response);
      setTempList(response);
    }
    setLoading(false);
  };

  const getCarConfigurations = async () => {
    setLoading(true);
    const response = await carConfigurations(jwt, generation._id);

    if (response) {
      setList(response);
      setTempList(response);
    }
    setLoading(false);
  };

  const getCarModifications = async () => {
    setLoading(true);
    const response = await carModifications(jwt, configuration._id);

    if (response) {
      setList(response);
      setTempList(response);
    }
    setLoading(false);
  };

  const getColors = () => {
    setList([
      {
        _id: 1,
        name: 'Белый',
      },
      {
        _id: 2,
        name: 'Желтый',
      },
      {
        _id: 3,
        name: 'Коричневый',
      },
      {
        _id: 4,
        name: 'Красный',
      },
      {
        _id: 5,
        name: 'Оранжевый',
      },
      {
        _id: 6,
        name: 'Фиолетовый',
      },
      {
        _id: 7,
        name: 'Синий',
      },
      {
        _id: 8,
        name: 'Зеленый',
      },
      {
        _id: 9,
        name: 'Черный',
      },
      {
        _id: 10,
        name: 'Серый',
      },
    ]);
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    let start = generation?.yearStart || currentYear;
    const stop = generation?.yearStop || currentYear;
    const years = [];

    for (start; start <= stop; start++) {
      years.push({
        _id: start,
        name: start + '',
      });
    }
    setList(years);
  };

  const title = useMemo(() => {
    if (route.params.listType == Variables.BRAND) {
      return {title: 'Марки авто'};
    }
    if (route.params.listType == Variables.MODEL) {
      return {title: marks.name};
    }
    if (route.params.listType == Variables.GENERATION) {
      return {title: 'Поколение'};
    }
    if (route.params.listType == Variables.CONFIGURATIONS) {
      return {title: 'Конфигурация'};
    }
    if (route.params.listType == Variables.MODIFICATIONS) {
      return {title: 'Модификация'};
    }
    if (route.params.listType == Variables.COLORS) {
      return {title: 'Цвет'};
    }
    if (route.params.listType == Variables.YEAR) {
      return {title: 'Год выпуска'};
    }
  }, [route.params.listType]);

  const handleSelectItem = (item: any) => {
    if (route.params.listType == Variables.BRAND) {
      dispatch(
        setMarksSlice({
          _id: item._id,
          name: item.name,
        }),
      );
      if (route.params.step == 2) {
        navigation.replace(Screens.LIST_CAR_ITEMS, {
          listType: Variables.MODEL,
          step: 3,
        });
        return false;
      }
    }
    if (route.params.listType == Variables.MODEL) {
      dispatch(
        setModelSlice({
          _id: item._id,
          name: item.name,
        }),
      );
      if (route.params.step == 3) {
        navigation.replace(Screens.ADD_CAR);
        return false;
      }
    }
    if (route.params.listType == Variables.GENERATION) {
      dispatch(
        setGenerationSlice({
          _id: item._id,
          name: item.name,
          yearStart: item.yearStart,
          yearStop: item.yearStop,
        }),
      );
    }
    if (route.params.listType == Variables.CONFIGURATIONS) {
      dispatch(
        setConfigurationSlice({
          _id: item._id,
          name: item.name,
        }),
      );
    }
    if (route.params.listType == Variables.MODIFICATIONS) {
      dispatch(
        setModificationSlice({
          _id: item._id,
          name: item.name,
        }),
      );
    }
    if (route.params.listType == Variables.COLORS) {
      dispatch(
        setColorsSlice({
          _id: item._id,
          name: item.name,
        }),
      );
    }
    if (route.params.listType == Variables.YEAR) {
      dispatch(
        setYearSlice({
          _id: item._id,
          name: item.name,
        }),
      );
    }

    navigation.goBack();
  };

  const handleSearch = async (text: string) => {
    setSearch(text);

    if (text.trim().length) {
      if (route.params.listType == Variables.BRAND) {
        const response = await carMarks(jwt, null, text);
        if (response) {
          setList(response?.items);
        }
      } else {
        setList(searchList(tempList, text, 'name'));
      }
    } else {
      setList(tempList);
    }
  };

  useEffect(() => {
    if (route.params.listType == Variables.BRAND) {
      getCarMarks();
    }
    if (route.params.listType == Variables.MODEL) {
      getCarModel();
    }
    if (route.params.listType == Variables.GENERATION) {
      getCarGeneration();
    }
    if (route.params.listType == Variables.CONFIGURATIONS) {
      getCarConfigurations();
    }
    if (route.params.listType == Variables.MODIFICATIONS) {
      getCarModifications();
    }
    if (route.params.listType == Variables.COLORS) {
      getColors();
    }
    if (route.params.listType == Variables.YEAR) {
      getYears();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header
        title={title?.title}
        handleNavigateBack={() => navigation.goBack()}
        onChangeText={handleSearch}
        handleSearchIcon={() => setList(tempList)}
        rightContent={<SearchIcon />}
        isSearchHeader
        setSearch={setSearch}
      />
      <CarList
        data={list}
        onEndReached={fetchMoreMarks}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <BrandsListFooter>
            {paginationLoading && (
              <Loading loadingWidth={30} loadingHeight={20} />
            )}
          </BrandsListFooter>
        )}
        renderItem={({item}: any) => (
          <BorderCarItem onPress={() => handleSelectItem(item)}>
            <Box subtractScreenWidth={32}>
              <Flex>
                {/* <Box fixedWidth="24px"></Box> */}
                <Box marginTop={16} marginBottom={16} subtractScreenWidth={80}>
                  <Typography
                    marginLeft={5}
                    lineHeight={20}
                    size={15}
                    color="#F2F2F2">
                    {item.name}
                  </Typography>
                </Box>
                <Box fixedWidth="24px">{/* icon */}</Box>
              </Flex>
            </Box>
          </BorderCarItem>
        )}
      />
      {/* <DidnFindBrand>
        <Typography
          align="center"
          lineHeight={16}
          size={13}
          color="rgba(242, 242, 242, 1)">
          Не нашел свою марку
        </Typography>
      </DidnFindBrand> */}
    </Layout>
  );
};
