import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 10;
`;

export const InputWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth - 32}px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  padding: 0 10px;
  background: #121212;
`;

export const InputBox = styled.View`
  width: ${({theme}) => theme.screenWidth - 110}px;
  justify-content: center;
  height: ${scale(56)}px;
`;

export const InputIconBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{margin?: string}>`
  width: 25px;
  height: 25px;
  margin: ${({margin}) => margin || 0}px;
`;

export const SortWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

export const YanderCustomMarker = styled.View`
  width: 200px;
  height: 30px;
  background: #ffd439;
  border-radius: 4px;
`;

export const MarkerImage = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 25px;
`;
