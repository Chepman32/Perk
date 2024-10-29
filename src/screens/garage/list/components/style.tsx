import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';

export const CarWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth - 10}px;
  margin-top: 10px;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(29, 29, 29, 0.75);
  position: relative;
`;

export const CarLoader = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const CarImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: flex-start;
`;

export const CarName = styled.View`
  background: rgba(29, 29, 29, 0.75);
  padding: 7px 12px;
  border-bottom-right-radius: 16px;
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
`;

export const DidnFindBrand = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  left: 10px;
  right: 10px;
  padding-vertical: 15px;
  background: rgba(52, 52, 52, 1);
  bottom: 20px;
  border-radius: 12px;
`;

export const CarList = styled(FlatList).attrs(() => ({
  showsVerticalScrollIndicator: false,
}))``;

export const BorderCarItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
  align-items: center;
`;
