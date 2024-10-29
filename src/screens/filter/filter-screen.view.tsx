import {Wrapper, ScrollVertical} from '@assets/styles/globals';
import {CloseIcon, DownIcon} from '@assets/svg';
import {
  Header,
  InputSelect,
  Typography,
  Button,
  Layout,
  ButtonWrapper,
} from '@components';
import {
  ModalChildrenCar,
  ModalChildrenLocation,
  ModalChildrenCategory,
  ModalHeader,
  SwitcherItem,
  WorkTime,
} from './components';
import {useCallback, useEffect, useRef, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Brands, Cars} from '@services';
import {useAuth} from '@shared/hooks';
import {FlatList} from 'react-native-gesture-handler';
import {getNoun, uniqueMark} from '@shared/utils/list';
import {useDispatch, useSelector} from '@store/store';
import {
  getBradnsListFilter,
  setBradnsListFilterSlice,
  setFilterField,
  clearBrandListFilter,
  getCategory,
} from '@slices';

const bottomSheetStyle = {
  bottomSheet: {backgroundColor: '#1D1D1D'},
  indicatorStyle: {backgroundColor: '#fff'},
};

export const Filter: React.FC = ({navigation}: any) => {
  const dispath = useDispatch();
  const {cars} = Cars;
  const {service} = useSelector(getCategory);
  const {getBrands} = Brands;
  const {jwt} = useAuth();
  const {filterFields} = useSelector(getBradnsListFilter);
  const carRef = useRef<BottomSheet>(null);
  const locationRef = useRef<BottomSheet>(null);
  const [carList, setCarList] = useState<any>([]);
  const [rating, setRating] = useState(false);
  const [status, setStatus] = useState(false);
  const [city, setCity] = useState('');
  const [selectedMark, setSelectedMark] = useState<any>([]);
  const [filterBrandList, setFilterBrandList] = useState([]);

  const marksIdRef = useRef<string[]>([]);
  const statusRef = useRef<number | string>('');
  const ratingRef = useRef<boolean | string>('');

  const getMarks = async () => {
    try {
      const response = await cars(jwt);

      if (response) {
        setCarList(uniqueMark(response));
      }
    } catch (error) {}
  };

  const getBrandsList = async () => {
    try {
      if (
        marksIdRef.current.length !== 0 ||
        statusRef.current ||
        ratingRef.current
      ) {
        const response = await getBrands(
          jwt,
          '',
          service?._id,
          marksIdRef.current,
          statusRef.current,
          ratingRef.current,
        );

        if (response) {
          setFilterBrandList(response?.items);
        }
      } else {
        const response = await getBrands(jwt, '', service?._id);

        if (response) {
          setFilterBrandList(response?.items);
        }
      }
    } catch (error) {}
  };

  const handleSetRating = () => {
    setRating(prev => !prev);
    if (!rating) {
      ratingRef.current = true;
      getBrandsList();
    } else {
      ratingRef.current = '';
      getBrandsList();
    }
  };

  const handleSetStatus = () => {
    setStatus(prev => !prev);
    if (!status) {
      statusRef.current = 1;
      getBrandsList();
    } else {
      statusRef.current = '';
      getBrandsList();
    }
  };

  const resetFilter = () => {
    ratingRef.current = '';
    statusRef.current = '';
    marksIdRef.current = [];
    setRating(false);
    setCity('');
    setStatus(false);
    setSelectedMark([]);
    dispath(clearBrandListFilter());
    setFilterBrandList([]);
    getBrandsList();
  };

  const handleNavigate = () => {
    dispath(setBradnsListFilterSlice(filterBrandList));
    dispath(
      setFilterField({
        markId: selectedMark.length == 0 ? null : selectedMark,
        rating: rating,
        status: status,
      }),
    );
    navigation.goBack();
  };

  const filterMarkName = () => {
    if (selectedMark.length !== 0) {
      if (selectedMark.length == carList.length) {
        return 'Мой гараж';
      }
      return selectedMark.map((i: any) => i?.mark?.name).join(', ');
    } else {
      return 'Не выбрано';
    }
  };

  const handelClearMarks = () => {
    marksIdRef.current = [];
    setSelectedMark([]);
    getBrandsList();
    carRef.current?.close();
  };

  const handleSelectCar = (car: any) => {
    marksIdRef.current.push(car?._id);

    setSelectedMark((prev: any) => {
      if (prev) {
        return [...prev, car];
      }
      return [car];
    });
    getBrandsList();
    carRef.current?.close();
  };

  const selectedMarksIds = (_id: string) => {
    if (selectedMark.length !== 0) {
      return selectedMark.filter((i: any) => i._id == _id).at(0)?._id;
    }
  };

  const selectedAllMarksIds = () => {
    marksIdRef.current = carList.map((i: any) => i?._id);
    setSelectedMark(carList);
    getBrandsList();
    carRef.current?.close();
  };

  const handleDeleteMark = (_id: string) => {
    marksIdRef.current = marksIdRef.current.filter((i: any) => i !== _id);
    setSelectedMark(selectedMark.filter((i: any) => i._id !== _id));
    getBrandsList();
    carRef.current?.close();
  };

  useEffect(() => {
    setStatus(filterFields?.status);
    setRating(filterFields?.rating);
    setSelectedMark(filterFields?.markId ? filterFields?.markId : []);
    getBrandsList();
    getMarks();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  );

  return (
    <Layout>
      <ScrollVertical>
        <Wrapper>
          <Header
            handleNavigateBack={() => navigation.goBack()}
            title="Фильтры"
            rightBigContent={
              <ButtonWrapper
                disabled={
                  rating == false && status == false && selectedMark.length == 0
                }
                handle={resetFilter}>
                <Typography
                  fontWeight={400}
                  lineHeight={20}
                  size={15}
                  color="#F2F2F2">
                  Сбросить
                </Typography>
              </ButtonWrapper>
            }
          />
          <InputSelect
            subtractScreenWidth={32}
            label="Ваше авто"
            rightContent={<DownIcon />}
            marginTop={8}
            value={filterMarkName()}
            handle={() => carRef.current?.snapToIndex(1)}
          />
          <InputSelect
            subtractScreenWidth={32}
            label="Где искать"
            rightContent={<DownIcon />}
            value={city}
            marginTop={12}
            handle={() => locationRef.current?.snapToIndex(1)}
          />
          <SwitcherItem
            title="Высокий рейтинг"
            handle={handleSetRating}
            isEnabled={rating}
            description="Бренды с рейтингом 4 и 5 звезд"
          />
          <SwitcherItem
            title="Мне нравятся"
            handle={handleSetStatus}
            isEnabled={status}
            description="Бренды из вашего избранного"
          />
          <Button
            disabled={filterBrandList.length == 0}
            onPress={handleNavigate}
            subtractScreenWidth={32}
            marginTop={20}>
            <Typography
              lineHeight={20}
              size={15}
              fontWeight={500}
              color="#1D1D1D">
              Показать {filterBrandList.length}{' '}
              {getNoun(filterBrandList.length, 'бренд', 'бренда', 'брендов')}
            </Typography>
          </Button>
        </Wrapper>
      </ScrollVertical>

      <BottomSheet
        snapPoints={[0.1, 432]}
        index={-1}
        handleIndicatorStyle={bottomSheetStyle.indicatorStyle}
        backdropComponent={renderBackdrop}
        backgroundStyle={bottomSheetStyle.bottomSheet}
        ref={carRef}>
        <FlatList
          data={carList}
          keyExtractor={(i: any) => String(i?._id)}
          ListHeaderComponent={
            <>
              <ModalHeader
                handleClose={() => carRef.current?.close()}
                title="Выберите авто"
              />
              <ModalChildrenCar
                color="#7F7F7F"
                item={{name: 'Не выбрано'}}
                handleSelectRadio={handelClearMarks}
                showRadio
              />
              <ModalChildrenCar
                color="#7F7F7F"
                item={{name: 'Мой гараж', _id: selectedMark.at(0)?._id}}
                handleSelectRadio={selectedAllMarksIds}
                showRadio
                selectedMarkId={
                  selectedMark.length == carList.length &&
                  selectedMarksIds(carList.at(0)?._id)
                }
              />
            </>
          }
          renderItem={({item}) => {
            return (
              <ModalChildrenCar
                handleSelectRadio={() => handleSelectCar(item)}
                item={item}
                handleRadio={() => handleDeleteMark(item?._id)}
                showRadio
                selectedMarkId={selectedMarksIds(item?._id)}
              />
            );
          }}
        />
      </BottomSheet>

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
            setCity(value);
            locationRef.current?.close();
          }}
        />
      </BottomSheet>
    </Layout>
  );
};
