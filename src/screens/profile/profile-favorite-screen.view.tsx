import {Wrapper} from '@assets/styles/globals';
import {BrandItemHorizotal, Header, Layout} from '@components';
import {FilterButton} from '@screens/service/components/FilterButton';
import {Screens} from '@shared/enums';
import {EmptyFavorite} from './empty-favorite';
import {useCallback, useEffect, useState} from 'react';
import {Brands} from '@services';
import {useAuth} from '@shared/hooks';
import {FlatList} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

export const ProfileFavorite: React.FC = ({navigation}: any) => {
  const {getStatusBrands, brandEdit} = Brands;
  const {jwt} = useAuth();
  const [favoriteList, setFavoriteList] = useState([]);

  const getFavoriteList = async () => {
    const response = await getStatusBrands(jwt, 1);
    if (response) {
      setFavoriteList(response?.items);
    }
  };

  const handleRemoveFavoriteList = async (_id: string) => {
    const response = await brandEdit(jwt, _id, -1);
    if (response) {
      navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFavoriteList();
    }, []),
  );

  if (favoriteList.length == 0) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          title="Избранное"
          background="#040404"
        />
        <EmptyFavorite />
      </Layout>
    );
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        background="rgba(4, 4, 4, 0.4)"
        title="Избранное"
      />

      <Wrapper>
        <FlatList
          data={favoriteList}
          keyExtractor={(i: any) => String(i._id)}
          renderItem={({item}: any) => {
            return (
              <BrandItemHorizotal
                imageSize={{width: 48, height: 48}}
                title={item?.title}
                image={item?.avatar?.url}
                address={item?.address}
                isUserFavorite={item?.isUserFavorite}
                handleIcon={() => handleRemoveFavoriteList(item?._id)}
                handle={() =>
                  navigation.navigate(Screens.BRAND_CARD, {brandId: item?._id})
                }
              />
            );
          }}
        />
      </Wrapper>
    </Layout>
  );
};
