import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Box = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
`;

export const InputTitle = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 12px;
`;

export const HideName = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 24px;
`;

export const BrandInfo = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
`;

export const BrandInfoImage = styled.Image`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: 8px;
  border-width: 1px;
  background: #202020;
  border-color: rgba(255, 255, 255, 0.08);
`;

export const BrandInfoText = styled.View`
  width: ${({theme}) => theme.screenWidth - 80}px;
`;

export const BoxRow = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const AddFavorite = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  flex-direction: row;
  padding: 16px;
  align-items: center;
  margin-top: 38px;
`;
