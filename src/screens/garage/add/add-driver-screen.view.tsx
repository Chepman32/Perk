import {Center} from '@assets/styles/globals';
import {
  Button,
  ContactItem,
  Header,
  Layout,
  Loading,
  Typography,
} from '@components';
import {CheckBox} from './components/style';
import {InviteSend} from './components';
import {Cars, ContactsService} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {CheckSquareIcon, RadioIcon} from '@assets/svg';
import {Alert} from 'react-native';
import {alphabeticalSorting} from '@shared/utils/list';

export const AddDriver: React.FC = ({navigation, route}: any) => {
  const {contacts} = ContactsService;
  const {carShareUser} = Cars;
  const {jwt} = useAuth();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [contactsList, setContactsList] = useState([]);
  const [selectedContact, setSelectedContact] = useState<any>({});

  const getContactsList = async () => {
    try {
      setLoading(true);
      const response = await contacts(jwt);

      if (response) {
        const sharedWithId = route.params?.sharedWith.map((i: any) => i._id);
        const filterList = response.filter(
          (i: any) => !sharedWithId.includes(i._id),
        );
        setContactsList(alphabeticalSorting(filterList, 'firstName'));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSendInvite = async () => {
    try {
      setButtonLoading(true);
      const response = await carShareUser(
        jwt,
        route.params?.carId,
        selectedContact?._id,
      );

      if (response) {
        setSelectedContact({});
        Alert.alert('Приглашение отправлено');
      }
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
    }
  };

  const handleSelectList = (item: any) => {
    setSelectedContact(item);
  };

  useEffect(() => {
    getContactsList();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Header handleNavigateBack={() => navigation.goBack()} />
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Добавить водителя"
      />
      <FlatList
        data={contactsList}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 20}}
        keyExtractor={(i: any) => String(i?._id)}
        renderItem={({item}) => {
          return (
            <ContactItem
              firstName={item?.firstName}
              phone={item?.phone}
              rightContent={
                selectedContact?._id === item?._id ? (
                  <CheckSquareIcon />
                ) : (
                  <CheckBox onPress={() => handleSelectList(item)} />
                )
              }
              marginTop={12}
            />
          );
        }}
      />
      <Center>
        <Button
          loader={buttonLoading}
          marginBottom={20}
          disabled={Object.keys(selectedContact).length == 0}
          onPress={handleSendInvite}
          subtractScreenWidth={32}>
          <Typography
            fontWeight={500}
            lineHeight={20}
            size={15}
            color="#1D1D1D">
            Отправить приглашение
          </Typography>
        </Button>
      </Center>
    </Layout>
  );
};
