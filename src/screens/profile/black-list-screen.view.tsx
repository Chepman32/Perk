import {Center, Content} from '@assets/styles/globals';
import {CloseIcon, InfoIcon} from '@assets/svg';
import {
  BrandItemHorizotal,
  Flex,
  Header,
  Layout,
  Typography,
} from '@components';
import {EmptyBlackList} from './empty-black-list';
import {Brands} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';

export const BlackList: React.FC = ({navigation}: any) => {
  const {getStatusBrands, brandEdit} = Brands;
  const {jwt} = useAuth();
  const [blackList, setBlackList] = useState([]);

  const getBlackList = async () => {
    const response = await getStatusBrands(jwt, 0);

    if (response) {
      setBlackList(response?.items);
    }
  };

  const handleRemoveFromBlackList = async (_id: string) => {
    const response = await brandEdit(jwt, _id, -1);

    if (response) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    getBlackList();
  }, []);

  if (blackList.length == 0) {
    return (
      <Layout chidlrenBackground="#040404" statusBarColor="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          title="Чёрный список"
          background="#040404"
        />
        <EmptyBlackList />
      </Layout>
    );
  }

  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Чёрный список"
        background="#040404"
      />
      <FlatList
        data={blackList}
        keyExtractor={(i: any) => String(i._id)}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        ListHeaderComponent={
          <Center>
            <Content>
              <Flex marginTop={12} justifyContent="flex-start">
                <InfoIcon />
                <Typography
                  marginLeft={8}
                  lineHeight={16}
                  size={13}
                  color="#F2F2F2">
                  Эти бренды не будут видны вам в каталоге
                </Typography>
              </Flex>
            </Content>
          </Center>
        }
        renderItem={({item}: any) => {
          return (
            <BrandItemHorizotal
              title={item?.title}
              image={item?.avatar?.url}
              address={item?.address}
              handleIcon={() => handleRemoveFromBlackList(item?._id)}
              rightIcon={<CloseIcon />}
            />
          );
        }}
      />
    </Layout>
  );
};
