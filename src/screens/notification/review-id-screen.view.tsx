import {
  Box,
  Button,
  Flex,
  Frame,
  Header,
  Layout,
  Typography,
} from '@components';
import {HeaderId} from './components';
import {Center, Content} from '@assets/styles/globals';
import {IconBrand} from './components/style';
import {Notifications} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useState} from 'react';
import {notificationType} from '@shared/utils/list';
import {dateMouthYearLetters} from '@shared/utils/date';
import {Screens} from '@shared/enums';

export const NotificationReviewId: React.FC = ({navigation, route}: any) => {
  const {getNotificationId, readNotificationId} = Notifications;
  const {jwt} = useAuth();
  const [item, setItem] = useState<any>({});

  const getNotification = async () => {
    try {
      const response = await getNotificationId(
        jwt,
        route.params?.notificationId,
      );

      if (response) {
        setItem(response);
        return response?.status;
      }
    } catch (error) {}
  };

  const handleReadNotificationId = async (status: number) => {
    try {
      if (status == 0) {
        await readNotificationId(jwt, 1, route.params?.notificationId);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getNotification().then(status => {
      handleReadNotificationId(status);
    });
  }, []);

  return (
    <Layout statusBarColor="#121212">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Уведомление"
        background="#121212"
      />
      <HeaderId
        title={notificationType(item?.type)}
        description={item?.description}
        date={dateMouthYearLetters(item?.createdAt)}
      />
      <Center>
        <Frame marginTop={8} subtractScreenWidth={32}>
          <Flex>
            <Box fixedWidth="48px">
              <IconBrand
                source={{
                  uri: item?.review?.brand?.avatar?.url,
                }}
              />
            </Box>
            <Box subtractScreenWidth={104}>
              <Typography
                lineHeight={20}
                marginLeft={8}
                fontWeight={600}
                size={15}
                color="#F2F2F2">
                {item?.review?.brand?.title}
              </Typography>
              <Typography
                lineHeight={16}
                marginLeft={8}
                fontWeight={400}
                size={13}
                color="#7F7F7F">
                {item?.review?.brand?.address}
              </Typography>
            </Box>
          </Flex>
        </Frame>
        <Content>
          <Typography
            lineHeight={20}
            marginTop={8}
            fontWeight={400}
            size={15}
            color="#F2F2F2">
            Добрый день! Благодарим за обратную связь. Мы искренне рады, что вы
            остались довольны обслуживанием.
          </Typography>

          <Button
            marginTop={12}
            background="#F2F2F2"
            height={44}
            onPress={() =>
              navigation.navigate(Screens.BRAND_CARD, {
                brandId: item?.review?.brand?._id,
              })
            }
            borderRadius={12}
            fixedWidth="100%">
            <Typography
              lineHeight={16}
              fontWeight={500}
              size={13}
              color="#1D1D1D">
              К отзыву
            </Typography>
          </Button>
        </Content>
      </Center>
    </Layout>
  );
};
