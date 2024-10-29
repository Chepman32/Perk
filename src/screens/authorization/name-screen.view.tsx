import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Header,
  Input,
  Layout,
} from '@components';
import {Logo} from './style';
import {Screens} from '@shared/enums';
import {useState} from 'react';
import {User} from '@services';
import {useAuth} from '@shared/hooks';
import { navigate } from 'src/navigation/navigation.action';

export const Name: React.FC = ({navigation}: any) => {
  const [name, setName] = useState('');
  const {jwt, getUserInfo} = useAuth();
  const {updateUser} = User;

  const handleUserUpdate = async () => {
    const response = await updateUser(jwt, {firstName: name});

    if (response) {
      getUserInfo();
      navigate(Screens.YOUR_GARAGE_LIST);
    }
  };

  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            onPress={handleUserUpdate}
            disabled={!name.trim().length}
            opacity={!name.trim().length ? 0.5: 1}
            subtractScreenWidth={32}>
            <Typography
              align="center"
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Продолжить
            </Typography>
          </Button>
        }>
        <Header title="Вход" handleNavigateBack={() => navigation.goBack()} />
        <Typography
          marginTop={24}
          align="center"
          lineHeight={32}
          size={24}
          color="#F2F2F2">
          Давайте познакомимся
        </Typography>
        <Typography
          marginTop={12}
          align="center"
          lineHeight={20}
          size={15}
          color="#7F7F7F">
          Введите ваше имя
        </Typography>
        <Input
          placeholder="Ваше имя"
          onChangeText={name => setName(name)}
          subtractScreenWidth={32}
          marginTop={56}
          xValue={32}
        />
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
