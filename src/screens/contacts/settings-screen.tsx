import {ScrollVertical, Center, Content} from '@assets/styles/globals';
import {RemoveProfileIcon} from '@assets/svg';
import {
  ButtonWrapper,
  CarItem,
  ContactItem,
  Flex,
  Header,
  Layout,
  Loading,
  Typography,
} from '@components';
import {
  ModalDeleteRecord,
  ModalDeleteWrapper,
} from '@screens/serviceHistory/components/style';
import {Cars, ContactsService} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useState} from 'react';
import {Alert, Modal} from 'react-native';

export const ContactSettings: React.FC = ({navigation, route}: any) => {
  const {contactId, contactsDelete} = ContactsService;
  const {carShareDeleteUser} = Cars;
  const {jwt} = useAuth();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const getContactId = async () => {
    try {
      setLoading(true);
      const response = await contactId(jwt, route.params?.contactId);

      if (response) {
        setItem(response);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDeleteContact = async () => {
    setModalVisible(false);
    const response = await contactsDelete(jwt, route.params?.contactId);

    if (response) {
      Alert.alert('Контакт удален');
      navigation.goBack();
    }
  };

  const handleDeleteFromCar = async (carItem: any) => {
    try {
      const response = await carShareDeleteUser(jwt, carItem?._id, item?._id);
      if (response) {
        getContactId();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getContactId();
  }, []);

  if (loading) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          title="Настройки контакта"
          background="#040404"
        />
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Настройки контакта"
        background="#040404"
        rightContent={
          <ButtonWrapper handle={() => setModalVisible(true)}>
            <RemoveProfileIcon />
          </ButtonWrapper>
        }
      />
      <ScrollVertical>
        <Center>
          <ContactItem
            firstName={item?.firstName}
            phone={item?.phone}
            marginTop={12}
          />
        </Center>
        {item && item?.mySharedCars && item?.mySharedCars.length !== 0 && (
          <>
            <Typography
              fontWeight={600}
              marginLeft={16}
              marginTop={16}
              lineHeight={20}
              size={15}
              color="#7F7F7F">
              Управляет вашими авто:
            </Typography>

            <Center>
              <Content>
                {item?.mySharedCars.map((item: any, index: number) => {
                  return (
                    <CarItem
                      marginTop={8}
                      key={index}
                      removeIcon
                      onPress={() => handleDeleteFromCar(item)}
                      title={`${item?.mark?.name} ${item?.model?.name}`}
                    />
                  );
                })}
              </Content>
            </Center>
          </>
        )}
        {item &&
          item?.sharedCarsWithMe &&
          item?.sharedCarsWithMe?.length !== 0 && (
            <>
              <Typography
                fontWeight={600}
                marginLeft={16}
                marginTop={16}
                lineHeight={20}
                size={15}
                color="#7F7F7F">
                Владеет моими авто:
              </Typography>

              <Center>
                <Content>
                  {item?.sharedCarsWithMe.map((item: any, index: number) => {
                    return (
                      <CarItem
                        marginTop={8}
                        key={index}
                        title={`${item?.mark?.name} ${item?.model?.name}`}
                      />
                    );
                  })}
                </Content>
              </Center>
            </>
          )}
      </ScrollVertical>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <ModalDeleteWrapper>
          <ModalDeleteRecord>
            <Typography
              fontWeight={600}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              Удалить контакт?
            </Typography>
            <Flex marginTop={12} justifyContent="flex-end">
              <ButtonWrapper handle={() => setModalVisible(false)}>
                <Typography
                  fontWeight={500}
                  lineHeight={16}
                  marginRight={12}
                  size={13}
                  color="#F2F2F2">
                  Отмена
                </Typography>
              </ButtonWrapper>
              <ButtonWrapper handle={handleDeleteContact}>
                <Typography
                  fontWeight={500}
                  lineHeight={16}
                  size={13}
                  color="#C53830">
                  Удалить
                </Typography>
              </ButtonWrapper>
            </Flex>
          </ModalDeleteRecord>
        </ModalDeleteWrapper>
      </Modal>
    </Layout>
  );
};
