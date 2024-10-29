import {Wrapper} from '@assets/styles/globals';
import {
  Button,
  Header,
  KeyboardAvoidingWrapper,
  Layout,
  Typography,
} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {AgreeRate, Info} from './components';
import {Screens} from '@shared/enums';
import {RateAgree, RateEmpty, RateWrapper} from './components/style';

export const RateConditions: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {params} = useRoute<any>();

  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <KeyboardAvoidingWrapper
        bottom={
          <>
            <RateAgree>
              <RateEmpty />
              <AgreeRate />
            </RateAgree>
            <Button
              onPress={() => navigation.navigate(Screens.RATE_PAYMENT)}
              subtractScreenWidth={20}
              disabled
              marginTop={10}
              background="#fff">
              <Typography
                lineHeight={20}
                size={15}
                fontWeight={500}
                color="#1D1D1D">
                Перейти к оплате
              </Typography>
            </Button>
          </>
        }>
        <Header
          title="Условия тарифа"
          handleNavigateBack={() => navigation.goBack()}
        />
        <Wrapper>
          <RateWrapper>
            <Typography lineHeight={24} size={18} color="#F2F2F2">
              {params?.rate?.title}
            </Typography>
            <Typography
              marginTop={12}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {params?.rate?.price}
            </Typography>
          </RateWrapper>
          <Info />
        </Wrapper>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
