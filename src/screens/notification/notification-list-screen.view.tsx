import {ChatCheckIcon, DotsVerticalIcon} from '@assets/svg';
import {
  ButtonWrapper,
  Flex,
  Header,
  Layout,
  Loading,
  NotificationItem,
  Typography,
} from '@components';
import {NotificationListContainer} from './components/style';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Center, Content} from '@assets/styles/globals';
import {Screens} from '@shared/enums';
import {Notifications} from '@services';
import {useAuth} from '@shared/hooks';
import {notificationType} from '@shared/utils/list';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {EmptyNotification} from './empty-notification';

export const NotificationList: React.FC = ({navigation}: any) => {
  const {getNotifications, readAllNotifications} = Notifications;
  const {jwt} = useAuth();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const notificationRef = useRef<BottomSheet>(null);

  const getNotificationsList = async () => {
    try {
      setLoading(true);
      const response = await getNotifications(jwt);

      if (response) {
        if (response?.items.length !== 0) {
          setList(response?.items.reverse());
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleReadAllNotifications = async () => {
    try {
      notificationRef.current?.close();
      const response = await readAllNotifications(jwt, 1);

      if (response) {
        getNotificationsList();
      }
    } catch (error) {}
  };

  const handleNotificatioId = (item: any) => {
    if (item.type == 1 || item.type == 2 || item.type == 3 || item.type == 4) {
      navigation.navigate(Screens.NOTIFICATION_INVITE_ID, {
        notificationId: item?._id,
      });
    }
    if (item.type == 0) {
      navigation.navigate(Screens.NOTIFICATION_SERVICE_ID, {
        notificationId: item?._id,
      });
    }
    if (item.type == 6) {
      navigation.navigate(Screens.NOTIFICATION_REVIEW_ID, {
        notificationId: item?._id,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNotificationsList();
    }, []),
  );

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={1} />,
    [],
  );

  if (loading) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          title="Уведомления"
          rightContent={<></>}
          background="#040404"
        />
        <Loading />
      </Layout>
    );
  }

  if (list.length == 0) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          title="Уведомления"
          background="#040404"
          rightContent={<></>}
        />
        <EmptyNotification />
      </Layout>
    );
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Уведомления"
        background="#040404"
        rightContent={
          <ButtonWrapper handle={() => notificationRef.current?.snapToIndex(1)}>
            <DotsVerticalIcon />
          </ButtonWrapper>
        }
      />
      <NotificationListContainer
        //   {
        //     title: 'Оплата тарифа',
        //     description:
        //       'Завтра ночью будет списана плата за тариф 150 000 ₽. Проверьте остаток средств на вашей карте, чтобы вы',
        //     type: 'Подписка',
        //     route: Screens.NOTIFICATION_SUBSCRIPTE_ID,
        //   },
        data={list}
        // ListHeaderComponent={<SupportItem />}
        renderItem={({item, index}: any) => {
          return (
            <NotificationItem
              title={item?.title}
              date={item?.createdAt}
              isRead={item?.status}
              isSubscription={item?.type == 'Подписка'}
              type={notificationType(item?.type)}
              handle={() => handleNotificatioId(item)}
              description={item?.description}
              key={index}
              marginTop={8}
            />
          );
        }}
      />

      <BottomSheet
        snapPoints={[0.1, 84]}
        backdropComponent={renderBackdrop}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={notificationRef}>
        <Center>
          <ButtonWrapper handle={handleReadAllNotifications}>
            <Content>
              <Flex marginTop={16} justifyContent="flex-start">
                <ChatCheckIcon color="#F2F2F2" />
                <Typography
                  marginLeft={12}
                  fontWeight={400}
                  lineHeight={20}
                  size={15}
                  color="#F2F2F2">
                  Прочитать все
                </Typography>
              </Flex>
            </Content>
          </ButtonWrapper>
        </Center>
      </BottomSheet>
    </Layout>
  );
};
