import {PropsWithChildren, useState} from 'react';
import {InputWrapper, ClearInputBox, Input} from './style';
import {CloseIcon} from '@assets/svg';

interface Props {
  onChangeText: (value: string) => void;
  clearInput: () => void;
}

export const SearchInput = ({
  onChangeText,
  clearInput,
}: PropsWithChildren<Props>) => {
  const [value, setValue] = useState('');

  const changeInput = (value: string) => {
    onChangeText(value);
    setValue(value);
  };

  const handleClearInput = () => {
    clearInput();
    setValue('');
  };

  return (
    <InputWrapper>
      <Input
        placeholder="Поиск в Москве"
        placeholderTextColor={'#7F7F7F'}
        onChangeText={changeInput}
        value={value}
      />
      <ClearInputBox onPress={handleClearInput}>
        {value.length !== 0 && <CloseIcon color="#F2F2F2" />}
      </ClearInputBox>
    </InputWrapper>
  );
};
