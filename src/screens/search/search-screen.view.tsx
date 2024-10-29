import {Wrapper, ScrollVertical} from '@assets/styles/globals';
import {
  SearchInput,
  SearchItem,
  SearchCategory,
  SearchBrands,
} from './components';
import {Layout, Typography} from '@components';
import {Brands, Categories, Services} from '@services';
import {useAuth} from '@shared/hooks';
import {useMemo, useState} from 'react';
import {useDispatch} from '@store/store';
import {Screens} from '@shared/enums';
import {setServiceSlice} from '@slices';
import {InfoBox} from './components/style';

export const SearchCatalog: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {searchCategories} = Categories;
  const {searchBrands} = Brands;
  const {searchServices} = Services;
  const {jwt} = useAuth();
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (value: string) => {
    try {
      if (value.trim().length >= 3) {
        setSearchValue(value);
        const categoriesResponse = await searchCategories(jwt, value);

        if (categoriesResponse) {
          setCategoriesList(categoriesResponse);
        }

        const brandsResponse = await searchBrands(jwt, value);

        if (brandsResponse) {
          setBrandsList(brandsResponse?.items);
        }

        const serviceResponse = await searchServices(jwt, value);

        if (serviceResponse) {
          setServiceList(serviceResponse);
        }
      }
      if (value.length == 0) {
        handleClearSearch();
      }
    } catch (error) {}
  };

  const handleClearSearch = () => {
    setCategoriesList([]);
    setBrandsList([]);
    setServiceList([]);
    setSearchValue('');
  };

  const handleOpenBrands = (item: any) => {
    dispatch(
      setServiceSlice({
        _id: item._id,
        title: item.title,
      }),
    );
    navigation.navigate(Screens.BRANDS_LIST);
  };

  const info = useMemo(() => {
    if (
      searchValue.trim().length > 3 &&
      !serviceList.length &&
      !categoriesList.length &&
      !brandsList.length
    ) {
      return (
        <InfoBox>
          <Typography
            lineHeight={20}
            size={15}
            fontWeight={400}
            color="#7F7F7F">
            Ничего не найдено
          </Typography>
        </InfoBox>
      );
    } else {
      return (
        <ScrollVertical>
          <Wrapper>
            {serviceList.map((item: any, index) => {
              return (
                <SearchItem
                  handle={() => handleOpenBrands(item)}
                  key={item?._id}
                  text={item?.title}
                />
              );
            })}
            <SearchCategory categories={categoriesList} />
            <SearchBrands brands={brandsList} />
          </Wrapper>
        </ScrollVertical>
      );
    }
  }, [
    serviceList?.length,
    searchValue,
    categoriesList?.length,
    brandsList?.length,
  ]);

  return (
    <Layout chidlrenBackground="#121212" statusBarColor="#121212">
      <SearchInput clearInput={handleClearSearch} onChangeText={handleSearch} />
      {info}
    </Layout>
  );
};
