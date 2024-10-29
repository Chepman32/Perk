import styled from 'styled-components/native';
import {PropsWithChildren} from 'react';

export const CloseModalBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 0;
  background: rgba(255, 255, 255, 0.08);
  top: 0;
`;

export const TabsNavigationWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  border-bottom-color: rgba(255, 255, 255, 0.08);
  border-bottom-width: 1px;
`;

interface TabsNavigationButtonProps {
  width: number;
}

export const TabsNavigationButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<TabsNavigationButtonProps>>`
  width: ${({width}) => width}%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

export const TabsNavigationBorder = styled.View`
  background: #f2f2f2;
  left: 10px;
  right: 10px;
  position: absolute;
  bottom: -1.5px;
  height: 2px;
  border-radius: 2px;
`;

export const TabsNavigationCounter = styled.View`
  padding: 4px;
  margin-left: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
`;

export const CharacteristicsColumn = styled.View`
  width: 49%;
`;

export const HorizontalCardIcon = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  align-items: center;
  justify-content: center;
`;

export const HorizontalCardText = styled.View`
  width: ${({theme}) => theme.screenWidth - 112}px;
`;

interface InfoBoxProps {
  percentWidth: string;
}

export const InfoBox = styled.View<PropsWithChildren<InfoBoxProps>>`
  width: ${({percentWidth}) => percentWidth};
  border-radius: 16px;
  padding: 8px 12px;
  background: #1d1d1d;
`;

export const LifehacksCardWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth - 8}px;
  border-radius: 16px;
  padding: 8px;
  margin-top: 16px;
  background: rgba(29, 29, 29, 1);
`;

export const LifehacksCardImage = styled.ImageBackground.attrs({
  imageStyle: {
    borderRadius: 12,
  },
})`
  width: 100%;
  height: 180px;
`;

export const LifehacksCardButton = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  right: 4px;
  bottom: 4px;
`;
