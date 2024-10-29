import {PropsWithChildren, ReactNode} from 'react';
import {ActivityIndicator} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

interface Props {
  subtractScreenWidth?: number;
  children?: ReactNode;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  disabled?: boolean;
  marginBottom?: number;
  loader?: boolean;
  onPress?: () => void;
  background?: string;
  borderColor?: string;
  borderRadius?: number;
  fixedWidth?: string;
  marginRight?: number;
  opacity?: number;
  profileDisabled?: boolean;
}

const ButtonBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})<PropsWithChildren<Props>>`
  width: ${({subtractScreenWidth, theme, fixedWidth}) => {
    if (subtractScreenWidth) {
      return `${theme.screenWidth - scale(subtractScreenWidth)}px`;
    } else {
      if (fixedWidth) {
        return fixedWidth;
      } else {
        return `100%`;
      }
    }
  }};
  height: ${({height}) => (height ? scale(height) : scale(56))}px;
  border-radius: ${({borderRadius}) =>
    borderRadius ? scale(borderRadius) : scale(16)}px;
  overflow: hidden;
  margin-top: ${({marginTop}) => (marginTop ? scale(marginTop) : 0)}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  border: 1px solid ${({borderColor}) => borderColor || 'transparent'};
  justify-content: center;
  align-items: center;
  background: ${({background, profileDisabled}) =>
    profileDisabled ? '#7f7f7f' : background || '#F2F2F2'};
  opacity: ${({disabled}) => (disabled ? 0.3 : 1)};
`;

const Loader = styled.View`
  position: absolute;
  top: 33%;
  right: 18px;
`;

export const Button = ({
  children,
  height,
  marginTop,
  disabled,
  marginBottom,
  loader,
  onPress,
  borderColor,
  background,
  subtractScreenWidth,
  borderRadius,
  fixedWidth,
  marginLeft,
  marginRight,
  opacity = 1,
  profileDisabled,
}: PropsWithChildren<Props>) => {
  return (
    <ButtonBox
      profileDisabled={profileDisabled}
      style={{opacity}}
      subtractScreenWidth={subtractScreenWidth}
      height={height}
      marginTop={marginTop}
      borderColor={borderColor}
      marginBottom={marginBottom}
      borderRadius={borderRadius}
      marginLeft={marginLeft}
      fixedWidth={fixedWidth}
      marginRight={marginRight}
      onPress={onPress}
      disabled={disabled}
      background={background}>
      {children}
      {loader && (
        <Loader>
          <ActivityIndicator size="small" color={'#121212'} />
        </Loader>
      )}
    </ButtonBox>
  );
};
