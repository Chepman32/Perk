import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {Flex, Typography} from '@components';
import {BackArrow} from '@assets/svg';
import {scale} from 'react-native-size-matters';

interface Props {
  handleNavigateBack?: () => void;
  title?: string;
  background?: string;
  avatar?: any;
}

const Container = styled.View<PropsWithChildren<Props>>`
  width: 100%;
  background: ${({background}) => background || 'transparent'};
  /* align-items: center; */
  justify-content: center;
  height: ${scale(56)}px;
`;

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;

  height: ${scale(24)}px;
  width: ${scale(24)}px;
  margin-left: 12px;
  margin-right: 12px;
`;

const Avatar = styled.Image`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: 36px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
  margin-right: 12px;
`;

const Title = styled.View`
  width: ${({theme}) => theme.screenWidth - 100}px;
`;

export const Header = ({
  handleNavigateBack,
  title,
  background,
  avatar,
}: PropsWithChildren<Props>) => {
  return (
    <Container background={background}>
      <Flex subtractScreenWidth={20}>
        <Button onPress={handleNavigateBack}>
          <BackArrow />
        </Button>
        <Avatar source={avatar} />
        <Title>
          <Typography
            fontWeight={600}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            {title}
          </Typography>
        </Title>
      </Flex>
    </Container>
  );
};
