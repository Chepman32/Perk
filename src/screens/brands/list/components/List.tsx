import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ListWrapper, ListColumnWrapper} from './style';
import {
  BrandItemCard,
  BrandItemHorizotal,
  Loading,
  RecommendItemHorizontal,
} from '@components';
import {Brands} from '@services';
import {useAuth} from '@shared/hooks';
import {Screens} from '@shared/enums';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {BrandsListFooter} from '@screens/serviceHistory/components/style';
import {getBradnsListFilter, getCategory} from '@slices';
import {useSelector} from '@store/store';
import {Category} from './Category';
import {Wrapper} from '@assets/styles/globals';

interface Props {
  selectedService: boolean;
  handleChangeService: () => void;
}

export const List = ({
  selectedService,
  handleChangeService,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {service} = useSelector(getCategory);
  const {brandListFilter} = useSelector(getBradnsListFilter);
  const {getBrands} = Brands;
  const {jwt} = useAuth();

  const [brandsList, setBrandList] = useState<any>([]);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [isListView, setListView] = useState(false);
  const brandIndex = useRef<number>(1);
  const initialLoading = useRef<boolean>(true);

  const brands = async () => {
    try {
      if (!loadingPagination) {
        setLoadingPagination(true);

        const response: any = await getBrands(
          jwt,
          brandIndex.current,
          service?._id,
        );

        if (response) {
          if (response?.items.length > 0) {
            if (response?.items.length > 10) {
              setBrandList((prev: any) => [...prev, ...response?.items]);
            }

            if (initialLoading.current) {
              setBrandList(response?.items);
            } else {
              brandIndex.current = brandIndex.current + 1;
            }
            initialLoading.current = false;
            setLoadingPagination(false);
          } else {
            setLoadingPagination(false);
            setBrandList([]);
          }
        }
      }
    } catch (error) {
      setLoadingPagination(false);
    }
  };

  const handle = (_id: string) => {
    navigation.navigate(Screens.BRAND_CARD, {brandId: _id});
  };

  const handleOnEndReached = () => {
    if (brandListFilter.length == 0) {
      brands();
    }
  };

  const resetInitial = () => {
    brandIndex.current = 1;
    initialLoading.current = true;
  };

  const handleSwithType = () => {
    resetInitial();
    setListView(!isListView);
  };

  useEffect(() => {
    if (selectedService) {
      resetInitial();
      brands();
    }
  }, [service?._id]);

  useFocusEffect(
    useCallback(() => {
      if (brandListFilter.length == 0) {
        resetInitial();
        brands();
      }
    }, [service?._id]),
  );

  return (
    <Wrapper>
      <Category
        brandsLenght={brandsList.length}
        type={isListView}
        switchType={handleSwithType}
        handle={handleChangeService}
      />
      {isListView ? (
        <ListWrapper
          data={brandListFilter.length !== 0 ? brandListFilter : brandsList}
          keyExtractor={(i: any, index) => String(i._id + index)}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <BrandsListFooter>
              {loadingPagination && <Loading />}
            </BrandsListFooter>
          }
          renderItem={({item, index}: any) => {
            if (index === 5) {
              return (
                <RecommendItemHorizontal
                  marginTop={8}
                  subtractScreenWidth={10}
                />
              );
            } else {
              return (
                <BrandItemHorizotal
                  title={item?.title}
                  address={item?.address}
                  imageSize={{width: 48, height: 48}}
                  isUserFavorite={item?.isUserFavorite}
                  handle={() => handle(item?._id)}
                  image={item?.photos?.[0]?.url}
                />
              );
            }
          }}
        />
      ) : (
        <ListColumnWrapper
          data={brandListFilter.length !== 0 ? brandListFilter : brandsList}
          keyExtractor={(i: any, index) => String(i._id + index)}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <BrandsListFooter>
              {loadingPagination && <Loading />}
            </BrandsListFooter>
          }
          renderItem={({item}: any) => {
            return (
              <BrandItemCard
                image={item?.photos?.[0]?.url}
                rating={item?.rating}
                reviewsCount={item?.reviewsCount}
                title={item?.title}
                avatar={item?.avatar?.url}
                isUserFavorite={item?.isUserFavorite}
                address={item?.address}
                handle={() => handle(item?._id)}
              />
            );
          }}
        />
      )}
    </Wrapper>
  );
};
