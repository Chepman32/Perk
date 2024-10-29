import {Wrapper, ScrollVertical} from '@assets/styles/globals';
import {
  Category,
  Search,
  Rates,
  Garage,
  Service,
  Lifehacks,
} from './components';
import {SearchCategoryWrapper} from './components/style';
import {Layout} from '@components';
import {useAuth} from '@shared/hooks';
import {Notifications} from '@services';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Variables} from '@shared/enums';

export const Home: React.FC = () => {
  const {user}: any = useAuth();

  const {getNotifications, notificationsEnable} = Notifications;
  const {jwt, getUserInfo} = useAuth();
  const [countNotifications, setCountNotifications] = useState(0);

  const getNotificationsList = async () => {
    try {
      const response = await getNotifications(jwt);

      if (response) {
        setCountNotifications(
          response?.items.filter((i: any) => i.status == 0)?.length,
        );
      }
    } catch (error) {
      setCountNotifications(0);
    }
  };

  const requestFirebasePermission = async () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem(Variables.NOTIFICATION_TOKEN, token);

        sendTokenNotification(token);
      }
    }
  };

  const sendTokenNotification = async (token: string) => {
    try {
      if (jwt) {
        let deviceId = await DeviceInfo.getDeviceId();

        await notificationsEnable(jwt, {
          token,
          deviceType: `${Platform.OS} - ${deviceId}`,
        });
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getNotificationsList();
      getUserInfo();
    }, []),
  );

  useEffect(() => {
    requestFirebasePermission();
  }, []);

  return (
    <Layout
      edges={['right', 'left', 'top']}
      statusBarColor="#1D1D1D"
      chidlrenBackground="#040404">
      <ScrollVertical>
        <Wrapper>
          <SearchCategoryWrapper>
            <Search countNotifications={countNotifications} />
            <Category />
          </SearchCategoryWrapper>
          <Rates />
          <Garage garageCount={user?.garageCount} />
          <Service />
          <Lifehacks />
        </Wrapper>
      </ScrollVertical>
    </Layout>
  );
};
