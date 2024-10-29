import {PropsWithChildren, ReactNode} from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

interface Props {
  handle?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}

export const ButtonWrapper = ({
  handle,
  children,
  disabled,
}: PropsWithChildren<Props>) => {
  return (
    <Button disabled={disabled} onPress={handle}>
      {children}
    </Button>
  );
};
