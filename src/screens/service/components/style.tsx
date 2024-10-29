import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const FilterButtonWrapper = styled.TouchableOpacity`
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const FilterCounter = styled.View`
  width: 16px;
  height: 16px;
  margin-left: 3px;
  align-items: center;
  border-radius: 16px;
  justify-content: center;
  background: rgba(255, 255, 255, 0.11);
`;

export const CategoryWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth - 32}px;
  align-items: flex-start;
`;

export const CategoryBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
  border-radius: ${scale(12)}px;
  padding: ${scale(4)}px;
  background: rgba(255, 255, 255, 0.08);
`;

export const CategoryImage = styled.Image`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: ${scale(8)}px;
  background: rgba(255, 255, 255, 0.08);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;

export const ServiceItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  padding: ${scale(16)}px;
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;
