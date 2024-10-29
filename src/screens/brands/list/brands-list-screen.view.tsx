import {Header, Layout} from '@components';
import {List} from './components';
import {useEffect, useRef, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {FilterButton} from '@screens/service/components/FilterButton';
import {Screens} from '@shared/enums';
import {ModalHeader} from '../card/modals/components/ModalHeader';
import {ModalChildrenCategory} from '@screens/filter/components';
import {useDispatch, useSelector} from '@store/store';
import {getCategory, setServiceSlice} from '@slices';
import {Services} from '@services';
import {useAuth} from '@shared/hooks';

export const BrandsList: React.FC = ({navigation}: any) => {
  const {category, service} = useSelector(getCategory);
  const {services} = Services;
  const {jwt} = useAuth();
  const dispatch = useDispatch();
  const categoryRef = useRef<BottomSheet>(null);
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState(false);

  const getServices = async () => {
    const response = await services(jwt, category._id);

    if (response) {
      setServiceList(response);
    }
  };

  const handleSelectService = (item: any) => {
    dispatch(
      setServiceSlice({
        _id: item._id,
        title: item.title,
      }),
    );
    setSelectedService(true);
    categoryRef.current?.close();
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        initShowSearch
        placeholder="Поиск в Москве"
        typeSearchInput="button"
        handleSearchInput={() => navigation.navigate(Screens.SEARCH_CATALOG)}
        rightContent={
          <FilterButton handle={() => navigation.navigate(Screens.FILTER)} />
        }
        background="#040404"
      />
      <List
        handleChangeService={() => categoryRef.current?.snapToIndex(1)}
        selectedService={selectedService}
      />

      <BottomSheet
        snapPoints={[0.1, '100%']}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={categoryRef}>
        <ModalHeader
          handleClose={() => categoryRef.current?.close()}
          title="Услуги"
        />
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          {serviceList.map((item, index) => {
            return (
              <ModalChildrenCategory
                selectedId={service._id}
                handle={() => handleSelectService(item)}
                key={index}
                item={item}
              />
            );
          })}
        </BottomSheetScrollView>
      </BottomSheet>
    </Layout>
  );
};
