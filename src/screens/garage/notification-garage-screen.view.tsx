import {ScrollVertical, Wrapper} from '@assets/styles/globals';
import {Header, Layout, NotificationItem, Typography} from '@components';
import {Notifications} from '@services';
import {Screens} from '@shared/enums';
import {useAuth} from '@shared/hooks';
import {notificationType} from '@shared/utils/list';
import {useEffect, useState} from 'react';

export const NotificationGarage: React.FC = ({navigation, route}: any) => {
  const {getNotifications} = Notifications;
  const {jwt} = useAuth();
  const [list, setList] = useState<any>([]);

  const getCarNotification = async () => {
    const response = await getNotifications(jwt, route.params.carItem?._id);

    if (response) {
      setList(response?.items);
    }
  };

  const handleNotificatioId = (item: any) => {
    navigation.navigate(Screens.NOTIFICATION_SERVICE_ID, {
      notificationId: item?._id,
    });
  };

  useEffect(() => {
    getCarNotification();
  }, []);

  return (
    <Layout>
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Уведомления"
      />
      <ScrollVertical>
        <Typography
          fontWeight={600}
          marginLeft={16}
          marginTop={12}
          lineHeight={20}
          align="left"
          size={15}
          color="#F2F2F2">
          {route.params.carItem?.mark?.name} {route.params.carItem?.model?.name}
          , {route.params.carItem?.year}
        </Typography>
        <Wrapper>
          {list.map((item: any, index: number) => {
            return (
              <NotificationItem
                date={item?.createdAt}
                type={notificationType(item?.type)}
                handle={() => handleNotificatioId(item)}
                title={item?.title}
                description={item?.description}
                key={index}
                marginTop={12}
              />
            );
          })}
        </Wrapper>
      </ScrollVertical>
    </Layout>
  );
};
