import {PropsWithChildren} from 'react';
import {
  InputBox,
  InputForm,
  InputIconBox,
  InputIconButton,
  InputWrapper,
} from './style';
import {FileIcon, SendIcon} from '@assets/svg';

interface Props {
  sendMessage: () => void;
  value: string;
  onChange: (value: any) => void;
  handleUploadAttach: (value: any) => void;
  attachmentDisable?: boolean;
}

export const Input = ({
  sendMessage,
  onChange,
  value,
  handleUploadAttach,
  attachmentDisable,
}: PropsWithChildren<Props>) => {
  return (
    <InputWrapper>
      <InputBox>
        <InputIconBox>
          <InputIconButton
            onPress={handleUploadAttach}
            disabled={attachmentDisable}>
            <FileIcon />
          </InputIconButton>
        </InputIconBox>
        <InputForm
          value={value}
          onChangeText={onChange}
          placeholder="Сообщение"
        />
        <InputIconBox>
          <InputIconButton
            onPress={sendMessage}
            disabled={!value}>
            <SendIcon />
          </InputIconButton>
        </InputIconBox>
      </InputBox>
    </InputWrapper>
  );
};
