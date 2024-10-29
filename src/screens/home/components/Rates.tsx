import {Typography, Button, Flex, Box} from '@components';
import {ContactsWrapper, ContactsLevelBox, RatesWrapper} from './style';
import {PhoneIcon, RigthArrow, TelegramIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {scale} from 'react-native-size-matters';
import {Linking} from 'react-native';
import {useAuth} from '@shared/hooks';

export const Rates = () => {
  const {user}: any = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const handleOpenLink = (isPhone: boolean) => {
    if (isPhone) {
      Linking.openURL(`tel:${user?.manager?.phone}`);
    } else {
      Linking.openURL(`https://t.me/${user?.manager?.telegram}`);
    }
  };

  const hasManager = !!user?.manager && !!Object.keys(user?.manager)?.length;

  return (
    <RatesWrapper hasManager={hasManager} level={user?.manager?.level}>
      <ContactsWrapper
        source={
          hasManager ? require('@assets/images/item-frame.png') : undefined
        }
        style={{
          width: '100%',
          padding: scale(12),
        }}>
        <Flex>
          <Flex widthAuto>
            <Typography lineHeight={20} size={15} color="#F2F2F2">
              Консьерж-сервис
            </Typography>
            {hasManager && (
              <ContactsLevelBox>
                <Typography lineHeight={16} size={11} color="#F2F2F2">
                  {user?.manager?.level} уровень
                </Typography>
              </ContactsLevelBox>
            )}
          </Flex>
        </Flex>
        {hasManager ? (
          <Flex marginTop={12}>
            <Box fixedWidth="150px">
              <Typography lineHeight={16} size={13} color="#F2F2F2">
                Личный менеджер
              </Typography>
              <Typography
                lineHeight={16}
                marginTop={4}
                size={13}
                color="rgba(255, 255, 255, 0.5)">
                {`${user?.manager?.firstName} ${user?.manager?.lastName}`}
              </Typography>
            </Box>
            <Flex widthAuto>
              <Button
                fixedWidth={`${scale(44)}px`}
                height={44}
                onPress={handleOpenLink.bind(null, true)}
                background="rgba(255, 255, 255, 0.08)"
                borderRadius={44}>
                <PhoneIcon />
              </Button>
              <Button
                fixedWidth={`${scale(44)}px`}
                marginLeft={10}
                onPress={handleOpenLink.bind(null, false)}
                height={44}
                background="rgba(255, 255, 255, 0.08)"
                borderRadius={44}>
                <TelegramIcon />
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex marginTop={12}>
            <Box>
              <Typography lineHeight={16} size={13} color="#7F7F7F">
                Подберем для вас актуальные и эффективные решения, поможем
                решить любой вопрос
              </Typography>
            </Box>
          </Flex>
        )}
      </ContactsWrapper>
    </RatesWrapper>
  );
};
