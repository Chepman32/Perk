import notifee, {AndroidImportance} from '@notifee/react-native';
import {Screens} from '@shared/enums';
import {Platform} from 'react-native';
import {navigateNotification} from 'src/navigation/navigation.action';

export const onDisplayNotification = async (item: any) => {
  if (Platform.OS == 'android') {
    const channelId = await notifee.createChannel({
      id: 'Id' + Date.now(),
      name: 'Default Channel',
      importance: AndroidImportance.DEFAULT,
      vibration: true,
    });

    await notifee.displayNotification({
      title: item?.notification?.body,
      body: item?.notification?.title,
      data: {
        type: item?.data?.type,
        id: item?.data?.id,
      },
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });

    notifeeListener();
  }
};

const notifeeListener = () => {
  notifee.onBackgroundEvent(async event => {
    const type = event?.detail?.notification?.data?.type;
    const id = event?.detail?.notification?.data?.id;
    navigateNotificationType(type, id);
  });
};

const navigateNotificationType = (type: any, id: any) => {
  if (type == 1 || type == 2 || type == 3 || type == 4) {
    navigateNotification(Screens.NOTIFICATION_INVITE_ID, {
      notificationId: id,
    });
  }
  if (type == 0) {
    navigateNotification(Screens.NOTIFICATION_SERVICE_ID, {
      notificationId: id,
    });
  }
  if (type == 6) {
    navigateNotification(Screens.NOTIFICATION_REVIEW_ID, {
      notificationId: id,
    });
  }
};

export const requestPermissionIos = async () => {
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }
};
