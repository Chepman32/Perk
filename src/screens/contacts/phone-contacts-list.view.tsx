import {Header, Layout, Typography} from '@components';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Contacts from 'react-native-contacts';
import {FlatList} from 'react-native-gesture-handler';
import {PhoneContactItem} from './components/style';
import {useDispatch} from '@store/store';
import {setContactPhone} from '@slices';
import {searchList} from '@shared/utils/search';
import {SearchIcon} from '@assets/svg';

export const PhoneContactList: React.FC = ({navigation}: any) => {
  const dispath = useDispatch();
  const [contactsList, setContactsList] = useState<any>([]);
  const [tempContactsList, setTempContactsList] = useState<any>([]);

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContactsList(contacts);
        setTempContactsList(contacts);
      })
      .catch(e => {
        Alert.alert('Разрешение на доступ к контактам отклонено');
      });
  };

  const handleSearch = async (text: string) => {
    if (text.trim().length > 2) {
      setContactsList(searchList(tempContactsList, text, 'displayName'));
    } else {
      setContactsList(tempContactsList);
    }
  };

  const handleSetPhoneContact = (phone: string) => {
    dispath(setContactPhone(phone));
    navigation.goBack();
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <Layout>
      <Header
        title={'Список контактов'}
        handleNavigateBack={() => navigation.goBack()}
        onChangeText={handleSearch}
        handleSearchIcon={() => setContactsList(tempContactsList)}
        rightContent={<SearchIcon />}
        isSearchHeader
      />
      <FlatList
        data={contactsList}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        renderItem={({item}: any) => (
          <PhoneContactItem
            onPress={() =>
              handleSetPhoneContact(item?.phoneNumbers?.at(0)?.number)
            }>
            <Typography lineHeight={20} size={15} color="#F2F2F2">
              {item?.displayName}
            </Typography>
            <Typography
              lineHeight={20}
              marginTop={5}
              size={15}
              color="rgba(127, 127, 127, 1)">
              {item?.phoneNumbers?.at(0)?.number}
            </Typography>
          </PhoneContactItem>
        )}
      />
    </Layout>
  );
};
