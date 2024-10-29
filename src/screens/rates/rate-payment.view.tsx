import {Wrapper} from '@assets/styles/globals';
import {
  Button,
  Header,
  KeyboardAvoidingWrapper,
  Layout,
  Typography,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';

export const RatePayment: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Layout>
      <KeyboardAvoidingWrapper
        bottom={
          <>
            <Button subtractScreenWidth={20} marginTop={10} background="#fff">
              <Typography lineHeight={20} size={15} color="#1D1D1D">
                Перейти к оплате
              </Typography>
            </Button>
          </>
        }>
        <Header
          title="Оплата тарифа"
          handleNavigateBack={() => navigation.goBack()}
        />
        <Wrapper></Wrapper>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
