import {PlusIcon} from '@assets/svg';
import {PropsWithChildren, ReactNode} from 'react';
import styled from 'styled-components/native';

const AddButtonBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<Props>>`
  width: ${({width}) => width || 56}px;
  height: ${({height}) => height || 56}px;
  border-radius: ${({height}) => height || 56}px;
  background: #f2f2f2;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: ${({right}) => right || 8}px;
  bottom: ${({bottom}) => bottom || 24}px;
`;

interface Props {
  handle?: () => void;
  bottom?: number;
  right?: number;
  width?: number;
  height?: number;
  icon?: ReactNode;
}

export const ButtonFixed = ({
  handle,
  icon,
  bottom,
  width,
  height,
  right,
}: PropsWithChildren<Props>) => {
  return (
    <AddButtonBox
      bottom={bottom}
      right={right}
      width={width}
      height={height}
      onPress={handle}>
      {icon ? icon : <PlusIcon />}
    </AddButtonBox>
  );
};
