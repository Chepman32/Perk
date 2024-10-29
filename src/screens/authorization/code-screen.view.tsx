import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Header,
  Layout,
  Box,
} from '@components';
import {ConfirmationCodeField} from './components/CodeField';
import {Screens} from '@shared/enums';
import {Wrapper} from '@assets/styles/globals';
import {useState} from 'react';
import {useSelector} from '@store/store';
import {getAuth} from '@slices';
import {useAuth} from '@shared/hooks';
import {navigate} from 'src/navigation/navigation.action';

export const Code: React.FC = ({navigation, route}: any) => {
  const {phone} = useSelector(getAuth);
  const [code, setCode] = useState('');
  const {handleSignin, getUserInfo} = useAuth();

  const handleSignIn = async () => {
    const {status}: any = await handleSignin(phone, code);

    if (status == 'ok') {
      if (route.params?.isLogin) {
        navigate(Screens.TABS);
        getUserInfo();
      } else {
        navigation.navigate(Screens.NAME);
      }
    }
  };

  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            onPress={handleSignIn}
            disabled={code.length < 4}
            opacity={code.length < 4 ? 0.5 : 1}
            subtractScreenWidth={24}>
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
        <Wrapper>
          <Typography
            marginTop={24}
            align="center"
            lineHeight={32}
            size={24}
            color="#F2F2F2">
            СМС-подтверждение
          </Typography>
          <Typography
            marginTop={12}
            align="center"
            lineHeight={20}
            size={15}
            color="#7F7F7F">
            Код отправлен на {phone}
          </Typography>
          <ConfirmationCodeField
            marginTop={44}
            onChangeCode={code => setCode(code)}
          />
        </Wrapper>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
