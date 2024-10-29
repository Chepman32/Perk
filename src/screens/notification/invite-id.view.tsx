import {
  Box,
  Button,
  ContactItem,
  Flex,
  Frame,
  Header,
  Layout,
  Typography,
} from '@components';
import {HeaderId} from './components';
import {Center, Content} from '@assets/styles/globals';
import {IconModel} from './components/style';
import {Cars, ContactsService, Notifications} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useState} from 'react';
import {dateMouthYearLetters} from '@shared/utils/date';
import {Alert} from 'react-native';
import {notificationType} from '@shared/utils/list';

export const NotificationInviteId: React.FC = ({navigation, route}: any) => {
  const {getNotificationId, readNotificationId} = Notifications;
  const {setContactInvite} = ContactsService;
  const {carShareStatus} = Cars;
  const {jwt} = useAuth();
  const [item, setItem] = useState<any>({});
  const [loadingAccept, setLoadingAccept] = useState<any>(false);
  const [loadingReject, setLoadingReject] = useState<any>(false);

  const [showButton, setShowButton] = useState(true);

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

  const setInviteContactStatus = async (status: number) => {
    try {
      if (status == 1) {
        setLoadingAccept(true);
      } else {
        setLoadingReject(true);
      }

      const response = await setContactInvite(
        jwt,
        item?.contactInvite?.from?._id,
        status,
      );

      if (response) {
        setShowButton(false);
        if (status == 1) {
          Alert.alert('Приглашение принято');
          setLoadingAccept(false);
        } else {
          Alert.alert('Приглашение отклонено');
          setLoadingReject(false);
        }
        navigation.goBack();
      }
      setLoadingAccept(false);
      setLoadingReject(false);
    } catch (error) {
      setLoadingAccept(false);
      setLoadingReject(false);
    }
  };

  const setInviteDriverStatus = async (status: number) => {
    try {
      const response = await carShareStatus(
        jwt,
        item?.carShare?.car?._id,
        status,
      );

      if (response) {
        setShowButton(false);
        if (status == 1) {
          Alert.alert('Приглашение принято');
        } else {
          Alert.alert('Приглашение отклонено');
        }
        navigation.goBack();
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
        {(item?.type == 1 ||
          item?.type == 2 ||
          item?.type == 3 ||
          item?.type == 4) && (
          <ContactItem
            firstName={
              item?.carShare?.sharedBy?.firstName ||
              item?.carShare?.sharedWith?.firstName ||
              item?.contactInvite?.from?.firstName ||
              item?.contactInvite?.to?.firstName
            }
            phone={
              item?.carShare?.sharedBy?.phone ||
              item?.carShare?.sharedWith?.phone ||
              item?.contactInvite?.from?.phone ||
              item?.contactInvite?.to?.phone
            }
            marginTop={8}
            background="#1D1D1D"
            addPadding
          />
        )}
        {(item?.type == 3 || item?.type == 4) && (
          <Frame marginTop={8} subtractScreenWidth={32}>
            <Flex>
              {/* <Box fixedWidth="24px">
                <IconModel
                  source={require('@assets/images/temp/Volkswagen.png')}
                />
              </Box> */}
              <Box subtractScreenWidth={80}>
                <Typography
                  lineHeight={20}
                  marginLeft={8}
                  fontWeight={600}
                  size={15}
                  color="#F2F2F2">
                  {item?.carShare?.car?.mark?.name}{' '}
                  {item?.carShare?.car?.model?.name} {item?.carShare?.car?.year}
                </Typography>
              </Box>
            </Flex>
          </Frame>
        )}
        {item?.type == 1 && item?.contactInvite?.status == 0 && showButton && (
          <Content>
            <Flex marginTop={12}>
              <Button
                background="rgba(255, 255, 255, 0.08)"
                height={44}
                onPress={() => setInviteContactStatus(-1)}
                loader={loadingReject}
                disabled={loadingReject}
                borderRadius={12}
                fixedWidth="49%">
                <Typography
                  lineHeight={16}
                  fontWeight={500}
                  size={13}
                  color="#F2F2F2">
                  Отклонить
                </Typography>
              </Button>
              <Button
                background="#F2F2F2"
                height={44}
                onPress={() => setInviteContactStatus(1)}
                loader={loadingAccept}
                disabled={loadingAccept}
                borderRadius={12}
                fixedWidth="49%">
                <Typography
                  lineHeight={16}
                  fontWeight={500}
                  size={13}
                  color="#1D1D1D">
                  Принять
                </Typography>
              </Button>
            </Flex>
          </Content>
        )}
        {item?.type == 3 && item?.carShare?.status == 0 && showButton && (
          <Content>
            <Flex marginTop={12}>
              <Button
                background="rgba(255, 255, 255, 0.08)"
                height={44}
                onPress={() => setInviteDriverStatus(-1)}
                borderRadius={12}
                fixedWidth="49%">
                <Typography
                  lineHeight={16}
                  fontWeight={500}
                  size={13}
                  color="#F2F2F2">
                  Отклонить
                </Typography>
              </Button>
              <Button
                background="#F2F2F2"
                height={44}
                onPress={() => setInviteDriverStatus(1)}
                borderRadius={12}
                fixedWidth="49%">
                <Typography
                  lineHeight={16}
                  fontWeight={500}
                  size={13}
                  color="#1D1D1D">
                  Принять
                </Typography>
              </Button>
            </Flex>
          </Content>
        )}
      </Center>
    </Layout>
  );
};
