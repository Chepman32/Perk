import {PropsWithChildren} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 24}px;
  flex-direction: row;
  padding-vertical: 12px;
  align-items: center;
  justify-content: space-between;
  height: ${scale(56)}px;
`;

export const CloseInputBox = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const ButtonBack = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: ${scale(24)}px;
  width: 24px;
  margin-left: 4px;
  justify-content: center;
`;

export const HeaderTitle = styled.View`
  margin-left: 18px;
`;

export const HeaderSearchButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${scale(40)}px;
  height: ${scale(32)}px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: ${scale(8)}px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`;

export const HeaderMarkName = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${scale(120)}px;
  background: rgba(255, 255, 255, 0.11);
  height: ${scale(32)}px;
  border-radius: ${scale(8)}px;
  align-items: center;
  justify-content: center;
`;

interface TabButtonProps {
  index?: number;
  active?: boolean;
}

export const TabsWrapper = styled.View`
  width: 100%;
  height: ${scale(40)}px;
`;

export const TabButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<TabButtonProps>>`
  background: ${({active}) =>
    active ? '#F2F2F2' : 'rgba(255, 255, 255, 0.11)'};
  padding-horizontal: ${scale(12)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(16)}px;
  align-items: center;
  justify-content: center;
  margin-left: ${({index}) => (index == 0 ? 12 : scale(4))}px;
`;

export const LifehacksCardWrapper = styled.View`
  width: 100%;
  background: #1d1d1d;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  flex: 1;
  padding-bottom: 20px;
`;

export const LifehacksCardImage = styled.Image`
  width: ${({theme}) => theme.screenWidth - 32}px;
  height: ${scale(200)}px;
  border-radius: 12px;
  margin-top: 16px;
`;

export const LifehacksCardTag = styled.View<PropsWithChildren<{index: number}>>`
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.11);
  padding: 8px 12px;
  margin-left: ${({index}) => (index == 0 ? 12 : 4)}px;
`;
