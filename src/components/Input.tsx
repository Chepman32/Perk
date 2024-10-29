import {PropsWithChildren, ReactNode, useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {MaskedTextInput} from 'react-native-mask-text';
import {Typography} from './Typography';
import {Animated, StyleSheet} from 'react-native';

interface Props {
  multiline?: boolean;
  subtractScreenWidth?: number;
  height?: number;
  background?: string;
  marginTop?: number;
  active?: boolean;
  marginBottom?: number;
  onChangeText?: ((text: string) => void) | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  errors?: any;
  autoFocus?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  autoCorrect?: boolean;
  autoCapitalize?: string;
  autoCompleteType?: string;
  paddingRight?: number;
  value?: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  showErrorIcon?: boolean;
  placeholder?: string;
  borderNone?: boolean;
  paddingLeft?: number;
  paddingTop?: number;
  rightContent?: ReactNode;
  type?: string;
  handle?: () => void;
  borderRadius?: number;
  label?: string;
  xValue?: number;
  yValue?: number;
  disableLabel?: boolean;
  hasDefaultValue?: boolean;
}

const Wrapper = styled.View<PropsWithChildren<Props>>`
  width: ${({subtractScreenWidth, theme}) =>
    subtractScreenWidth
      ? `${theme.screenWidth - scale(subtractScreenWidth)}px`
      : `100%`};
  height: ${({height}) => (height ? scale(height) : scale(56))}px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

const InputBox = styled.TextInput<PropsWithChildren<Props>>`
  width: 100%;
  height: 100%;
  background: ${({background}) => background || 'rgba(255, 255, 255, 0.08)'};
  color: #f2f2f2;
  padding-left: ${({paddingLeft}) => (paddingLeft ? paddingLeft : 14)}px;
  border-radius: ${({borderRadius}) =>
    borderRadius ? scale(borderRadius) : scale(16)}px;
  padding-right: ${({paddingRight, rightContent}) =>
    rightContent ? 47 : paddingRight || 0}px;
  padding-top: ${({paddingTop}) => (paddingTop ? `${paddingTop}px` : 'auto')};
  font-size: ${scale(15)}px;
  ${({active, errors, borderNone}) =>
    errors
      ? css`
          border-width: 1px;
          border-color: rgba(197, 56, 48, 1);
        `
      : active
      ? css`
          border-width: 1px;
          border-color: #fff;
        `
      : css`
          border-width: ${borderNone ? 0 : 1}px;
          border-color: rgba(255, 255, 255, 0.08);
        `}
`;

const PhoneBox = styled(MaskedTextInput)<PropsWithChildren<Props>>`
  width: 100%;
  height: 100%;
  background: ${({background}) => background || 'rgba(255, 255, 255, 0.08)'};
  border-radius: ${scale(16)}px;
  color: #f2f2f2;
  padding-left: ${({paddingLeft}) => paddingLeft || 14}px;
  padding-right: ${({paddingRight, rightContent}) =>
    rightContent ? 47 : paddingRight || 0}px;
  padding-top: ${({paddingTop}) => (paddingTop ? `${paddingTop}px` : 'auto')};
  font-size: ${scale(16)}px;
  ${({active, errors, borderNone}) =>
    errors
      ? css`
          border-width: 1px;
          border-color: rgba(197, 56, 48, 1);
        `
      : active
      ? css`
          border-width: 1px;
          border-color: #fff;
        `
      : css`
          border-width: ${borderNone ? 0 : 1}px;
          border-color: rgba(255, 255, 255, 0.08);
        `}
`;

const ButtonInput = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<Props>`
  width: 100%;
  height: 100%;
  border-radius: ${scale(16)}px;
  background: ${({background}) => background || 'rgba(255, 255, 255, 0.08)'};
  justify-content: center;
  padding-left: ${({paddingLeft}) => paddingLeft || scale(12)}px;
`;

const Icon = styled.View`
  width: 30px;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  right: 15px;
`;

const InputFloatingLabel = styled.Text`
  font-size: ${scale(16)}px;
  color: #7f7f7f;
  font-weight: 400;
`;

export const Input = ({
  subtractScreenWidth,
  height,
  background,
  marginTop,
  marginBottom,
  active,
  onChangeText: onChange,
  onBlur,
  onFocus,
  errors,
  autoFocus,
  keyboardType,
  autoCorrect,
  autoCapitalize,
  autoCompleteType,
  paddingRight,
  value: val,
  maxLength,
  secureTextEntry,
  placeholder,
  borderNone,
  paddingLeft,
  multiline,
  paddingTop,
  rightContent,
  handle,
  borderRadius,
  type = 'input',
  yValue = 22,
  xValue = 12,
  disableLabel,
  hasDefaultValue,
}: PropsWithChildren<Props>) => {
  const [value, setValue] = useState<any>(val || '');

  useEffect(() => {
    if (hasDefaultValue && val) {
      setValue(val);
    }
  }, [val]);

  const onChangeText = (text: string) => {
    setValue(text);
    onChange?.(text);
  };

  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  }, [value]);

  const onFocusHandler = () => {
    if (value !== '') {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -yValue],
  });

  const xVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -xValue],
  });

  const sVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.62],
  });

  const animStyle = {
    transform: [
      {
        scale: sVal,
      },
      {
        translateY: yVal,
      },
      {
        translateX: xVal,
      },
    ],
  };

  return (
    <Wrapper
      subtractScreenWidth={subtractScreenWidth}
      height={height}
      marginBottom={marginBottom}
      marginTop={marginTop}>
      {type == 'phone' && (
        <>
          {placeholder && !disableLabel && (
            <Animated.View style={[styles.animatedStyle, animStyle]}>
              <InputFloatingLabel>{placeholder}</InputFloatingLabel>
            </Animated.View>
          )}
          <PhoneBox
            mask="+7 (999) 999-9999"
            onChangeText={onChangeText}
            cursorColor={'#F2F2F2'}
            selectionColor="#F2F2F2"
            value={val}
            errors={errors}
            keyboardType={keyboardType}
            paddingTop={18}
          />
        </>
      )}
      {type == 'button' && (
        <ButtonInput
          paddingLeft={paddingLeft}
          background={background}
          onPress={handle}>
          <Typography
            lineHeight={20}
            fontWeight={400}
            size={15}
            color="#7F7F7F">
            {placeholder}
          </Typography>
        </ButtonInput>
      )}
      {type == 'input' && (
        <>
          {placeholder && !disableLabel && (
            <Animated.View style={[styles.animatedStyle, animStyle]}>
              <InputFloatingLabel>{placeholder}</InputFloatingLabel>
            </Animated.View>
          )}
          <InputBox
            onFocus={() => {
              onFocus?.();
              onFocusHandler();
            }}
            blurOnSubmit
            rightContent={rightContent}
            cursorColor={'#F2F2F2'}
            paddingTop={multiline ? 20 : !disableLabel ? 16 : paddingTop}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            maxLength={maxLength}
            onBlur={() => {
              onBlur?.();
              onBlurHandler();
            }}
            background={background}
            selectionColor="#F2F2F2"
            active={active}
            onChangeText={onChangeText}
            errors={errors}
            autoFocus={autoFocus}
            underlineColorAndroid="transparent"
            keyboardType={keyboardType}
            placeholderTextColor={'#7F7F7F'}
            placeholder={disableLabel ? placeholder : undefined}
            autoCorrect={autoCorrect}
            borderRadius={borderRadius}
            autoCapitalize={autoCapitalize}
            autoCompleteType={autoCompleteType}
            paddingRight={paddingRight}
            paddingLeft={paddingLeft}
            value={value}
            secureTextEntry={secureTextEntry}
            borderNone={borderNone}
          />
        </>
      )}

      {rightContent && <Icon>{rightContent}</Icon>}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  animatedStyle: {
    top: 16,
    left: 14,
    position: 'absolute',
    borderRadius: 90,
    zIndex: -1,
  },
});
