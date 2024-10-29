import {Flex, Header, Layout, Typography} from '@components';
import {useState} from 'react';
import {useAuth} from '@shared/hooks';
import {Center, Content} from '@assets/styles/globals';
import {Platform, Switch} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Notifications} from '@services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Variables} from '@shared/enums';

export const NotificationSettings: React.FC = ({navigation}: any) => {
  const {jwt} = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const {notificationsEnable, notificationsDisable} = Notifications;

  const handleToggleNotification = async () => {
    try {
      setIsEnabled(prev => !prev);
      if (jwt) {
        const notificatioToken = await AsyncStorage.getItem(
          Variables.NOTIFICATION_TOKEN,
        );
        let deviceId = await DeviceInfo.getDeviceId();

        if (isEnabled) {
          await notificationsEnable(jwt, {
            token: notificatioToken,
            deviceType: `${Platform.OS} - ${deviceId}`,
          });
        } else {
          await notificationsDisable(jwt, {
            deviceType: `${Platform.OS} - ${deviceId}`,
          });
        }
      }
    } catch (error) {}
  };

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        title="Настроить уведомления"
        background="#040404"
        handleNavigateBack={() => navigation.goBack()}
      />
      <Center>
        <Content>
          <Flex marginTop={16} widthAuto>
            <Typography
              fontWeight={400}
              lineHeight={16}
              marginRight={8}
              size={13}
              color="#F2F2F2">
              Включить уведомления
            </Typography>
            <Switch
              trackColor={{
                false: 'rgba(255, 255, 255, 0.08)',
                true: 'rgba(255, 255, 255, 0.08)',
              }}
              thumbColor={isEnabled ? '#F2F2F2' : '#7F7F7F'}
              ios_backgroundColor="rgba(255, 255, 255, 0.08)"
              // onValueChange={handleToggleNotification}
              value={isEnabled}
            />
          </Flex>
        </Content>
      </Center>
    </Layout>
  );
};
