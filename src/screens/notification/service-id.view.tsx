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
import {IconBrand, IconModel} from './components/style';
import {Center, Content} from '@assets/styles/globals';
import {Notifications} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useState} from 'react';
import {notificationType} from '@shared/utils/list';
import {dateMouthYearLetters} from '@shared/utils/date';
import {Screens} from '@shared/enums';

export const NotificationServiceId: React.FC = ({navigation, route}: any) => {
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
      <Typography
        marginTop={8}
        marginLeft={16}
        lineHeight={20}
        fontWeight={600}
        size={15}
        color="#F2F2F2">
        {item?.title}
      </Typography>
      <Center>
        <Frame marginTop={8} subtractScreenWidth={32}>
          <Flex>
            <Box subtractScreenWidth={80}>
              <Typography
                lineHeight={20}
                marginLeft={8}
                fontWeight={600}
                size={15}
                color="#F2F2F2">
                {item?.task?.car?.mark?.name}
              </Typography>
            </Box>
          </Flex>
        </Frame>
        <Frame marginTop={8} subtractScreenWidth={32}>
          <Flex>
            <Box fixedWidth="48px">
              <IconBrand
                source={{
                  uri: item?.task?.brand?.avatar?.url,
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
                {item?.task?.brand?.title}
              </Typography>
              <Typography
                lineHeight={16}
                marginLeft={8}
                fontWeight={400}
                size={13}
                color="#7F7F7F">
                {item?.task?.brand?.address}
              </Typography>
            </Box>
          </Flex>
        </Frame>

        <Content>
          <Button
            marginTop={12}
            background="#F2F2F2"
            height={44}
            borderRadius={12}
            onPress={() =>
              navigation.navigate(Screens.BRAND_CARD, {
                brandId: item?.task?.brand?._id,
              })
            }
            fixedWidth="100%">
            <Typography
              lineHeight={16}
              fontWeight={500}
              size={13}
              color="#1D1D1D">
              К бренду
            </Typography>
          </Button>
        </Content>
      </Center>
    </Layout>
  );
};
