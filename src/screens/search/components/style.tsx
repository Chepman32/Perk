import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const InputWrapper = styled.View.attrs({})`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${scale(5)}px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(255, 255, 255, 0.15);
`;

export const Input = styled.TextInput`
  width: ${({theme}) => theme.screenWidth - 54}px;
  height: ${scale(45)}px;
  font-size: 15px;
  color: #f2f2f2;
`;

export const ClearInputBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const SearchItemWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  padding-vertical: ${scale(15)}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`;

export const Wrapper = styled.View`
  width: 100%;
`;

export const CategoryListBox = styled.View`
  width: 100%;
  padding-horizontal: 16px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const CategoryListItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth / 2 - 18}px;
  border-radius: 12px;
  background: rgba(29, 29, 29, 1);
  margin-top: 5px;
  padding: ${scale(4)}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const CategoryImage = styled.Image`
  width: ${scale(44)}px;
  height: ${scale(44)}px;
  background: #ccc;
  border-radius: 8px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;

export const CategoryText = styled.View`
  width: ${({theme}) => theme.screenWidth / 2 - 72}px;
`;

export const BrandsListItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth - 32}px;
  border-radius: 16px;
  background: rgba(29, 29, 29, 1);
  padding: ${scale(8)}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const BrandsImage = styled.Image`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  background: #ccc;
  border-radius: 8px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;

export const BrandsText = styled.View`
  width: ${({theme}) => theme.screenWidth - 110}px;
`;

export const InfoBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
