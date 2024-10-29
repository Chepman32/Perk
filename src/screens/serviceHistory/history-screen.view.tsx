import {ButtonFixed, Header, Layout, Loading, Typography} from '@components';
import {HistoryItem} from './components';
import {Tasks} from '@services';
import {useAuth} from '@shared/hooks';
import {useCallback, useEffect, useState} from 'react';
import {Screens} from '@shared/enums';
import {SectionList} from 'react-native';
import {TitleWrapper} from './components/style';
import {useFocusEffect} from '@react-navigation/native';
import {sectionListFormat} from '@shared/utils/list';
import {dateFormatFromISO} from '@shared/utils/date';

export const History: React.FC = ({navigation, route}: any) => {
  const {getTasks} = Tasks;
  const {jwt} = useAuth();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const brands = async () => {
    setLoading(true);
    try {
      const response: any = await getTasks(jwt, '', route.params?.item?._id);

      if (response) {
        setList(sectionListFormat(response?.items, 'group', 'tasks'));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      brands();
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="История обслуживания"
      />
      <TitleWrapper>
        <Typography fontWeight={600} lineHeight={16} size={13} color="#F2F2F2">
          {route.params?.item?.mark?.name} {route.params?.item?.model?.name}{' '}
          {route.params?.item?.year}
        </Typography>
      </TitleWrapper>

      <SectionList
        sections={list}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return <HistoryItem item={item} />;
        }}
        renderSectionHeader={({section: {title}}) => (
          <Typography
            marginLeft={12}
            marginTop={12}
            fontWeight={600}
            lineHeight={16}
            size={13}
            color="#7F7F7F">
            {dateFormatFromISO(title)}
          </Typography>
        )}
      />

      <ButtonFixed
        handle={() =>
          navigation.navigate(Screens.SERVICE_ADD_RECORD, {
            carId: route.params?.item?._id,
          })
        }
      />
    </Layout>
  );
};
