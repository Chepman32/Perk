import styled, {css} from 'styled-components/native';
import {Typography} from './Typography';
import {PropsWithChildren, ReactNode} from 'react';
import {scale} from 'react-native-size-matters';

const InputSelectWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<Props>>`
  width: ${({subtractScreenWidth, theme}) =>
    subtractScreenWidth
      ? `${theme.screenWidth - scale(subtractScreenWidth)}px`
      : `100%`};
  height: ${({height}) => (height ? scale(height) : scale(56))}px;
  background: rgba(255, 255, 255, 0.08);
  padding-horizontal: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  border-width: 1px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  ${({errors}) =>
    errors
      ? css`
          border-color: rgba(197, 56, 48, 1);
        `
      : css`
          border-color: rgba(255, 255, 255, 0.08);
        `}
`;

const TextWrapper = styled.View<PropsWithChildren<Props>>`
  width: ${({subtractScreenWidth, theme}) =>
    subtractScreenWidth
      ? `${theme.screenWidth - subtractScreenWidth - 70}px`
      : `90%`};
`;

const RightIconWrapper = styled.View<PropsWithChildren<Props>>`
  width: 30px;
  align-items: flex-end;
`;

interface Props {
  label?: string;
  subtractScreenWidth?: number;
  height?: number;
  rightContent?: ReactNode;
  handle?: () => void;
  marginTop?: number;
  value?: string;
  errors?: any;
  disabled?: boolean;
}

export const InputSelect = ({
  label,
  value,
  subtractScreenWidth,
  height,
  rightContent,
  handle,
  marginTop,
  disabled,
  errors,
}: PropsWithChildren<Props>) => {
  return (
    <InputSelectWrapper
      marginTop={marginTop}
      errors={errors}
      disabled={disabled || !handle}
      onPress={handle}
      subtractScreenWidth={subtractScreenWidth}
      height={height}>
      <TextWrapper subtractScreenWidth={subtractScreenWidth}>
        {value?.trim() ? (
          <>
            <Typography
              style={{position: 'absolute', top: -8, left: -1}}
              lineHeight={16}
              size={11}
              color="#7F7F7F">
              {label}
            </Typography>
            <Typography
              lineHeight={20}
              size={16}
              color="#F2F2F2"
              style={{paddingTop: 16}}>
              {value}
            </Typography>
          </>
        ) : (
          <Typography lineHeight={20} size={16} color="#7F7F7F">
            {label}
          </Typography>
        )}
      </TextWrapper>
      {rightContent && <RightIconWrapper>{rightContent}</RightIconWrapper>}
    </InputSelectWrapper>
  );
};
