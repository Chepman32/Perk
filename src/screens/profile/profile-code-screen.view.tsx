import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Header,
  Layout,
} from '@components';
import {Screens} from '@shared/enums';
import {Wrapper} from '@assets/styles/globals';
import {ConfirmationCodeField} from '@screens/authorization/components/CodeField';

export const ProfileCode: React.FC = ({navigation}: any) => {
  return (
    <Layout>
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            onPress={() => navigation.navigate(Screens.PROFILE_PHONE)}
            subtractScreenWidth={32}>
            <Typography
              align="center"
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Отправить
            </Typography>
          </Button>
        }>
        <Header
          title="Изменение номера телефона"
          handleNavigateBack={() => navigation.goBack()}
        />
        <Wrapper>
          <Typography
            marginTop={24}
            align="center"
            lineHeight={20}
            fontWeight={600}
            size={15}
            color="#F2F2F2">
            Введите код из СМС
          </Typography>
          <Typography
            fontWeight={400}
            marginTop={12}
            align="center"
            lineHeight={20}
            size={15}
            color="#7F7F7F">
            Код отправлен на +7 (950) 325-96-90
          </Typography>
          <ConfirmationCodeField marginTop={24} onChangeCode={code => {}} />
        </Wrapper>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
