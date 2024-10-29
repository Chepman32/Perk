import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Input,
  Layout,
  Header,
} from '@components';
import {Screens} from '@shared/enums';
import {Wrapper} from '@assets/styles/globals';

export const ProfilePhone: React.FC = ({navigation}: any) => {
  return (
    <Layout>
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            onPress={() =>
              navigation.navigate(Screens.PROFILE_CODE_VERIFICATION)
            }
            marginTop={20}
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
            Введите номер телефона
          </Typography>
          <Input
            placeholder="Введите номер телефона"
            subtractScreenWidth={20}
            marginTop={15}
          />
        </Wrapper>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
