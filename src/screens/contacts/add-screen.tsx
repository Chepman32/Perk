import {Content} from '@assets/styles/globals';
import {BookSquareIcon} from '@assets/svg';
import {
  Button,
  ButtonWrapper,
  ContactItem,
  Header,
  Input,
  KeyboardAvoidingWrapper,
  Layout,
  Typography,
} from '@components';
import {Info} from './components/style';
import {useCallback, useEffect, useState} from 'react';
import {ContactsService} from '@services';
import {useAuth} from '@shared/hooks';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Screens} from '@shared/enums';
import {useDispatch, useSelector} from '@store/store';
import {getPhoneContact, clearPhoneContact} from '@slices';
import {phoneMaskFormat} from '@shared/utils/list';
import {useFocusEffect} from '@react-navigation/native';

export const ContactAdd: React.FC = ({navigation}: any) => {
  const {phone} = useSelector(getPhoneContact);

  const {searchPhoneUser, sendInviteUser} = ContactsService;
  const {jwt} = useAuth();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userList, setUserList] = useState<any>({});
  const [value, setValue] = useState('7');

  const handleSearchUser = async (phone: string) => {
    try {
      setValue(phoneMaskFormat(phone));

      if (phone.length > 16) {
        setLoading(true);

        const response = await searchPhoneUser(jwt, phone);

        if (response) {
          setUserList(response);
          setError(false);
        } else {
          setError(true);
          setUserList({});
        }
        setLoading(false);
      } else {
        setError(false);
        setUserList({});
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSendInvite = async () => {
    try {
      setButtonLoading(true);

      const response = await sendInviteUser(jwt, userList?._id);

      if (response) {
        Alert.alert('Приглашение отправлено');
        navigation.pop(2);
      }
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
    }
  };

  const handleNavigate = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ).then(status => {
        if (status == 'granted') {
          navigation.navigate(Screens.PHONE_CONTACTS_LIST);
        }
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (phone) {
        setValue(phoneMaskFormat(phone));
      }
    }, [phone]),
  );

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Добавить контакт"
        background="#040404"
      />
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            disabled={Object.keys(userList).length == 0 || buttonLoading}
            loader={buttonLoading}
            onPress={handleSendInvite}
            subtractScreenWidth={32}>
            <Typography
              fontWeight={500}
              marginLeft={8}
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Отправить приглашение
            </Typography>
          </Button>
        }>
        <Content>
          <Typography
            fontWeight={600}
            marginTop={16}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            Введите номер телефона пользователя Perk
          </Typography>
          <Input
            placeholder="Введите номер телефона"
            subtractScreenWidth={20}
            marginTop={12}
            background="#121212"
            rightContent={
              loading ? (
                <ActivityIndicator />
              ) : (
                <ButtonWrapper handle={handleNavigate}>
                  <BookSquareIcon />
                </ButtonWrapper>
              )
            }
            keyboardType="number-pad"
            onChangeText={phone => handleSearchUser(phone)}
            type="phone"
            value={value}
            errors={error}
            xValue={76}
          />
          {error && (
            <Typography
              fontWeight={400}
              marginTop={12}
              lineHeight={16}
              size={13}
              color="#C53830">
              Пользователь не найден
            </Typography>
          )}
          {Object.keys(userList).length !== 0 && (
            <>
              <Typography
                fontWeight={400}
                marginTop={12}
                lineHeight={16}
                size={13}
                color="#7F7F7F">
                Найден пользователь:
              </Typography>
              <ContactItem
                firstName={userList?.firstName}
                phone={userList?.phone}
                marginTop={8}
                addPadding
                background="#1D1D1D"
              />
              <Info>
                <Typography
                  fontWeight={400}
                  align="center"
                  lineHeight={16}
                  size={13}
                  color="#F2F2F2">
                  Пользователь должен принять приглашение в личных уведомлениях,
                  чтобы стать вашим контактом
                </Typography>
              </Info>
            </>
          )}
        </Content>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
