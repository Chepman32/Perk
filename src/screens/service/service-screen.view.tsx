import {Wrapper, ScrollVertical} from '@assets/styles/globals';
import {Header, Layout, Typography} from '@components';
import {Category, FilterButton} from './components';
import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useRef, useState} from 'react';
import {Screens} from '@shared/enums';
import {ModalChildrenCategory, ModalHeader} from '@screens/filter/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from '@store/store';
import {getCategory, setCategorySlice, setServiceSlice} from '@slices';
import {useAuth} from '@shared/hooks';
import {Categories, Services} from '@services';
import {ServiceItem} from './components/style';

export const Service: React.FC = ({navigation}: any) => {
  const {category} = useSelector(getCategory);
  const dispatch = useDispatch();
  const {categories} = Categories;
  const {services} = Services;
  const {jwt} = useAuth();
  const categoryRef = useRef<BottomSheet>(null);
  const [list, setList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  const getCategories = async () => {
    const response = await categories(jwt);

    if (response) {
      setList(response);
    }
  };

  const getServices = async () => {
    const response = await services(jwt, category._id);

    if (response) {
      setServiceList(response);
    }
  };

  const handleSelectCategory = (item: any) => {
    dispatch(
      setCategorySlice({
        _id: item._id,
        title: item.title,
      }),
    );
    categoryRef.current?.close();
  };

  const handleSelectService = (item: any) => {
    dispatch(
      setServiceSlice({
        _id: item._id,
        title: item.title,
      }),
    );
    navigation.navigate(Screens.BRANDS_LIST);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getServices();
  }, [category._id]);

  return (
    <Layout chidlrenBackground={'#121212'} statusBarColor="#121212">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        initShowSearch
        typeSearchInput="button"
        handleSearchInput={() => navigation.navigate(Screens.SEARCH_CATALOG)}
        rightContent={<></>}
        placeholder="Поиск в Москве"
        background="#121212"
      />
      <ScrollVertical>
        <Wrapper>
          <Category
            serviceCount={serviceList.length}
            handle={() => categoryRef.current?.snapToIndex(1)}
          />

          {serviceList.map((item: any, index) => {
            return (
              <ServiceItem
                key={index}
                onPress={() => handleSelectService(item)}>
                <Typography
                  lineHeight={20}
                  size={15}
                  fontWeight={400}
                  color="#F2F2F2">
                  {item.title}
                </Typography>
              </ServiceItem>
            );
          })}
        </Wrapper>
      </ScrollVertical>

      <BottomSheet
        snapPoints={[0.1, '100%']}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={categoryRef}>
        <ModalHeader
          handleClose={() => categoryRef.current?.close()}
          title="Категории"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {list.map((item: any, index) => {
            return (
              <ModalChildrenCategory
                handle={() => handleSelectCategory(item)}
                key={index}
                selectedId={category._id}
                item={item}
              />
            );
          })}
        </ScrollView>
      </BottomSheet>
    </Layout>
  );
};
