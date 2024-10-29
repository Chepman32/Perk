import {Car, AddButton, Empty} from './components';
import {Layout, Loading} from '@components';
import {useAuth} from '@shared/hooks';
import {useCallback, useState} from 'react';
import {Cars} from '@services';
import {CarList} from './components/style';
import {useFocusEffect} from '@react-navigation/native';

export const List = () => {
  const {jwt} = useAuth();
  const {cars} = Cars;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCars = async () => {
    setLoading(true);
    const response = await cars(jwt);

    if (response) {
      setList(response);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getCars();
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      chidlrenBackground="#040404"
      statusBarColor="#040404"
      edges={['right', 'left', 'top']}>
      {list.length == 0 ? (
        <Empty />
      ) : (
        <CarList
          data={list}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          keyExtractor={(i: any) => String(i._id)}
          renderItem={({item}: any) => {
            return <Car item={item} />;
          }}
        />
      )}
      <AddButton />
    </Layout>
  );
};
