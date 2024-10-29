import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  margin-top: 16px;
`;

export const WorkTimeFlexBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

interface WorkTimeBoxProps {
  background?: string;
}

export const WorkTimeBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<WorkTimeBoxProps>>`
  padding: 8px 12px;
  background: ${({background}) => background || 'transparent'};
  border-radius: 8px;
  margin-top: 8px;
  margin-right: 8px;
`;

export const SwitcherItemWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const SwitcherText = styled.View`
  width: ${({theme}) => theme.screenWidth - 110}px;
`;

export const SwitcherBox = styled.View`
  width: 70px;
  align-items: flex-end;
`;

export const ModalHeaderWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const ModalHeaderIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const ModalHeaderTitle = styled.View`
  width: ${({theme}) => theme.screenWidth - 136}px;
`;

export const ModalHeaderClear = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 80px;
  align-items: flex-end;
  height: 24px;
  justify-content: center;
`;

export const ModalChildrenCarItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`;

export const ModalChildrenCarIcon = styled.View`
  width: 24px;
  height: 24px;
`;

export const ModalChildrenCarText = styled.View`
  width: ${({theme}) => theme.screenWidth - 105}px;
`;

export const ModalChildrenLocationItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`;

export const ModalChildrenLocationText = styled.View`
  width: ${({theme}) => theme.screenWidth - 80}px;
`;

export const ModalChildrenRadio = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.11);
`;

export const ModalChildrenRadioEmpty = styled.View`
  width: 22px;
`;

export const ModalChildrenIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 24px;
  height: 24px;
`;
