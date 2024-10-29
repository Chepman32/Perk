import styled from 'styled-components/native';
import {Typography} from './Typography';
import {Flex} from './Flex';
import {PropsWithChildren, ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Box} from './Box';
import {scale} from 'react-native-size-matters';

const Image = styled.Image`
  width: ${scale(52)}px;
  height: ${scale(52)}px;
  border-radius: 12px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;

const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<Props>>`
  width: ${({theme}) => theme.screenWidth - 32}px;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  justify-content: space-between;
  padding: ${({addPadding}) => (addPadding ? 8 : 0)}px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  background: ${({background}) => background || 'transparent'};
`;

const Wrapper = styled.View<PropsWithChildren<Props>>`
  width: ${({theme, addPadding}) =>
    addPadding ? theme.screenWidth - 150 : theme.screenWidth - 142}px;
`;

const Level = styled.View`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.11);
  padding: 2px 8px;
  border-radius: 50px;
  margin-left: 8px;
`;

interface Props {
  rightContent?: ReactNode;
  marginTop?: number;
  addPadding?: boolean;
  background?: string;
  image?: string;
  handle?: () => void;
  firstName?: string;
  phone?: string;
  disabled?: boolean;
}

export const ContactItem = ({
  rightContent,
  background,
  marginTop,
  addPadding,
  image,
  handle,
  firstName,
  phone,
  disabled,
}: PropsWithChildren<Props>) => {
  return (
    <Item
      onPress={handle}
      disabled={!handle || disabled}
      addPadding={addPadding}
      background={background}
      marginTop={marginTop}>
      {image ? (
        <Image source={{uri: image}} />
      ) : (
        <LinearGradient
          colors={['#343434', '#1E1E1E']}
          style={{
            width: scale(52),
            height: scale(52),
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.08)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography
            fontWeight={400}
            lineHeight={24}
            size={17}
            color="#7F7F7F">
            {firstName?.[0]}
          </Typography>
        </LinearGradient>
      )}
      <Wrapper addPadding={addPadding}>
        <Flex justifyContent="flex-start" widthAuto>
          <Typography
            fontWeight={500}
            lineHeight={20}
            size={15}
            marginLeft={5}
            color="#F2F2F2">
            {firstName}
          </Typography>
          {/* <Level>
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={11}
              color="#F2F2F2">
              1 уровень
            </Typography>
          </Level> */}
        </Flex>

        <Typography
          marginTop={6}
          marginLeft={5}
          fontWeight={400}
          lineHeight={16}
          size={13}
          color="#7F7F7F">
          {phone}
        </Typography>
      </Wrapper>
      <Box fixedWidth={`${scale(30)}px`}>{rightContent}</Box>
    </Item>
  );
};
