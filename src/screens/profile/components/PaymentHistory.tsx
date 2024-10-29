import {Button, Flex, Typography} from '@components';
import {
  PaymentHistoryWrapper,
  FlexRowBox,
  ContactsLevelBox,
  ContactsRigthArrowBox,
} from './style';
import {RigthArrow} from '@assets/svg';
import {Screens} from '@shared/enums';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';

export const PaymentHistory = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <PaymentHistoryWrapper source={require('@assets/images/item-frame.png')}>
      <Flex>
        <FlexRowBox>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Консьерж-сервис
          </Typography>
          <ContactsLevelBox>
            <Typography lineHeight={16} size={11} color="#F2F2F2">
              2 уровень
            </Typography>
          </ContactsLevelBox>
        </FlexRowBox>
        <ContactsRigthArrowBox
          onPress={() => navigation.navigate(Screens.RATES)}>
          <RigthArrow />
        </ContactsRigthArrowBox>
      </Flex>
      <Flex marginTop={15}>
        <Button
          fixedWidth="49%"
          borderRadius={12}
          height={44}
          background="rgba(255, 255, 255, 0.08)">
          <Typography lineHeight={16} size={13} color="#F2F2F2">
            Способ оплаты
          </Typography>
        </Button>
        <Button
          fixedWidth="49%"
          height={44}
          borderRadius={12}
          background="rgba(255, 255, 255, 0.08)">
          <Typography lineHeight={16} size={13} color="#F2F2F2">
            История оплат
          </Typography>
        </Button>
      </Flex>
    </PaymentHistoryWrapper>
  );
};
