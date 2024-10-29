import {Box, ButtonWrapper, Flex, Frame, Typography} from '@components';
import {SupportItemAvatar, SupportItemCounter} from './style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

export const SupportItem = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Frame marginTop={8} subtractScreenWidth={8}>
      <ButtonWrapper handle={() => navigation.navigate(Screens.SUPPORT)}>
        <Flex>
          <Box fixedWidth="48px">
            <SupportItemAvatar
              source={require('@assets/images/chat/supportAvatar.png')}
            />
          </Box>
          <Box subtractScreenWidth={72}>
            <Box>
              <Flex>
                <Typography
                  lineHeight={16}
                  fontWeight={400}
                  size={13}
                  color="#F2F2F2">
                  Поддержка
                </Typography>
                <Typography
                  lineHeight={16}
                  fontWeight={400}
                  size={13}
                  color="#7F7F7F">
                  06.03 в 13:41
                </Typography>
              </Flex>
            </Box>
            <Box>
              <Flex marginTop={8}>
                <Box subtractScreenWidth={112}>
                  <Typography
                    lineHeight={16}
                    fontWeight={400}
                    size={13}
                    color="#7F7F7F">
                    Был рад помочь. Хорошего вам дня!
                  </Typography>
                </Box>
                <SupportItemCounter>
                  <Typography
                    lineHeight={16}
                    fontWeight={400}
                    size={11}
                    color="#343434">
                    3
                  </Typography>
                </SupportItemCounter>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </ButtonWrapper>
    </Frame>
  );
};
