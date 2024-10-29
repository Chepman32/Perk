import {InteractionManager, TextInput} from 'react-native';
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {Box, CodeInputCellContainer, CodeInput} from './style';
import {Typography} from '@components';

const CELL_COUNT = 4;

interface Props {
  onChangeCode: (code: string) => void;
  marginTop?: number;
}

export const ConfirmationCodeField = ({
  onChangeCode,
  marginTop,
}: PropsWithChildren<Props>) => {
  const [code, setCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const codeDigitsArray = new Array(CELL_COUNT).fill(0);
  const ref = useRef<TextInput>(null);

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = ' ';
    const digit = code?.[idx] || emptyInputChar;

    const isCurrentDigit = idx === code?.length;
    const isLastDigit = idx === CELL_COUNT - 1;
    const isCodeFull = code?.length === CELL_COUNT;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    return (
      <CodeInputCellContainer
        key={idx}
        active={containerIsFocused && isFocused}>
        <Typography align="center" lineHeight={24} size={17} color="#fff">
          {digit}
        </Typography>
      </CodeInputCellContainer>
    );
  };

  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const changeInput = (code: string) => {
    onChangeCode(code);
    setCode(code);
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setContainerIsFocused(true);
      ref?.current?.focus();
    });
  }, []);

  return (
    <>
      <Box marginTop={marginTop} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Box>
      <CodeInput
        ref={ref}
        value={code}
        onChangeText={changeInput}
        onEndEditing={handleOnBlur}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={CELL_COUNT}
      />
    </>
  );
};
