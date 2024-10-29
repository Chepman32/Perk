import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Input,
  Layout,
} from '@components';
import {Logo, PrivacyPolicyWrapper} from './style';
import {Screens} from '@shared/enums';
import {Wrapper} from '@assets/styles/globals';
import {useState} from 'react';
import {Authorization} from '@services';
import {useDispatch} from '@store/store';
import {setPhoneSlice} from '@slices';
import {Text, View} from 'react-native';
import {CheckBox} from '@screens/garage/add/components/style';
import {AgreeTariffCheckBox} from '@screens/rates/components/style';
import {CheckSquareIcon} from '@assets/svg';
import Checkbox from 'src/components/Checkbox';

export const Phone: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {signUp, sendCode} = Authorization;
  const [phone, setPhone] = useState<string>('7');
  const [check, setCheck] = useState(false);

  const handleSingUp = async () => {
    const response: any = await signUp(phone);

    if (response) {
      dispatch(setPhoneSlice(phone));
      navigation.navigate(Screens.CODE, {
        isLogin: false,
      });
    }
  };

  const handleSingIn = async () => {
    const response: any = await sendCode(phone);

    if (response.status == 201) {
      dispatch(setPhoneSlice(phone));
      navigation.navigate(Screens.CODE, {
        isLogin: true,
      });
    } else {
      handleSingUp();
    }
  };

  const handleCheckAuth = () => {
    handleSingIn();
  };

  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <KeyboardAvoidingWrapper>
        <Wrapper>
          <Logo marginTop={40} source={require('@assets/images/logo.png')} />
          <Typography
            marginTop={20}
            align="center"
            lineHeight={32}
            fontWeight={600}
            size={24}
            color="#F2F2F2">
            Укажите телефон
          </Typography>
          <Typography
            marginTop={8}
            align="center"
            lineHeight={20}
            size={15}
            color="#7F7F7F">
            Чтобы войти или стать пользователем Perk
          </Typography>

          <View
            style={{
              paddingBottom: 77,
            }}>
            <Input
              placeholder="Введите номер телефона"
              subtractScreenWidth={20}
              marginTop={28}
              height={56}
              keyboardType="number-pad"
              value={`${phone}`}
              onChangeText={phone => setPhone(phone)}
              type="phone"
              xValue={76}
            />
          </View>

          <PrivacyPolicyWrapper>
            <Checkbox
              onChange={() => {
                setCheck(!check);
              }}
              checked={check}
            />
            <Typography
              lineHeight={16}
              size={12}
              marginLeft={8}
              color="#7F7F7F">
              Продолжая, вы соглашаетесь с{' \n'}
              <Text style={{textDecorationLine: 'underline'}}>
                Политикой обработки персональных данных
              </Text>
            </Typography>
          </PrivacyPolicyWrapper>
          <Button
            onPress={handleCheckAuth}
            marginTop={20}
            opacity={phone.length < 17 || !check ? 0.5 : 1}
            disabled={phone.length < 17 || !check}
            height={56}
            subtractScreenWidth={22}>
            <Typography
              align="center"
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Продолжить
            </Typography>
          </Button>
        </Wrapper>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
