import {PropsWithChildren, ReactNode} from 'react';
import {CloseIcon} from '@assets/svg';
import styled from 'styled-components/native';
import {Box} from './Box';
import {Typography} from './Typography';
import {scale} from 'react-native-size-matters';

interface Props {
  title?: string;
  onPress?: () => void;
  marginTop?: number;
  marginBottom?: number;
  image?: string;
  removeIcon?: boolean;
}

const Item = styled.View<PropsWithChildren<Props>>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  padding-horizontal: 14px;
  border-radius: 16px;
  justify-content: space-between;
  padding-vertical: ${scale(15)}px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  height: ${scale(56)}px;
`;

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
`;

const TextBox = styled.View`
  width: ${({theme}) => theme.screenWidth - 120}px;
`;

const Close = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 15px;
  align-items: center;
`;

export const CarItem = ({
  title,
  onPress,
  marginTop,
  marginBottom,
  image,
  removeIcon,
}: PropsWithChildren<Props>) => (
  <Item marginTop={marginTop} marginBottom={marginBottom}>
    {image && (
      <Box fixedWidth={'30px'}>
        <Image source={require('@assets/images/temp/Volkswagen.png')} />
      </Box>
    )}
    <TextBox>
      <Typography lineHeight={20} size={15} color="#F2F2F2">
        {title}
      </Typography>
    </TextBox>
    <Close onPress={onPress} disabled={!removeIcon}>
      {removeIcon && <CloseIcon color="rgba(197, 56, 48, 1)" />}
    </Close>
  </Item>
);
