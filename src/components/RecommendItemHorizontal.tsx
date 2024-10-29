import {Box, Flex, Typography} from '@components';
import {HelpIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import styled from 'styled-components/native';
import {PropsWithChildren} from 'react';

const RecommendListButtonWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<Props>>`
  width: ${({theme, subtractScreenWidth}) =>
    theme.screenWidth - subtractScreenWidth}px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  border-radius: 16px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.11);
`;

const RecommendListItemWrapper = styled.ImageBackground`
  width: 100%;
  background: #121212;
  border-radius: 16px;
  padding: 12px 16px;
`;

interface Props {
  subtractScreenWidth: number;
  marginTop?: number;
}

export const RecommendItemHorizontal = ({
  subtractScreenWidth,
  marginTop,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <RecommendListButtonWrapper
      subtractScreenWidth={subtractScreenWidth}
      marginTop={marginTop}
      onPress={() => navigation.navigate(Screens.INVITE)}>
      <RecommendListItemWrapper
        source={require('@assets/images/brand-list.png')}>
        <Flex>
          <Box subtractScreenWidth={100}>
            <Typography
              lineHeight={20}
              size={14}
              fontWeight={400}
              color="#F2F2F2">
              Порекомендуйте любимый бренд{'\n'}и получите скидку на их услуги
            </Typography>
          </Box>
          <Box fixedWidth={'24px'}>
            <HelpIcon />
          </Box>
        </Flex>
      </RecommendListItemWrapper>
    </RecommendListButtonWrapper>
  );
};
