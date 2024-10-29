import {PropsWithChildren} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const InputWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.08);
`;

export const InputBox = styled.View`
  width: ${({theme}) => theme.screenWidth - 126}px;
  justify-content: center;
  height: ${scale(56)}px;
`;

export const InputIconBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  align-items: center;
  margin-right: ${scale(8)}px;
  justify-content: center;
`;

export const CategoryList = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 10px;
`;

interface CategoryListItemProps {
  type?: boolean;
}

export const CategoryListItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<CategoryListItemProps>>`
  width: ${({theme, type}) =>
    type ? `100%` : `${theme.screenWidth / 2 - 20}px`};
  background: #1d1d1d;
  margin-top: ${scale(4)}px;
  border-radius: 12px;
  flex-direction: row;
  padding: ${scale(4)}px;
  align-items: center;
  justify-content: flex-start;
`;

export const CategoryItemImage = styled.Image<CategoryListItemProps>`
  width: ${({type}) => (type ? `${scale(48)}px` : `${scale(44)}px`)};
  height: ${({type}) => (type ? `${scale(48)}px` : `${scale(44)}px`)};
  background: #2e2e2e;
  border-radius: 12px;
  border-width: 1px;
  border-color: #2e2e2e;
`;

interface SortModalItemProps {
  active?: boolean;
}

export const SortModalItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<SortModalItemProps>>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${({active}) =>
    active ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`;

export const SortModalItemRound = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.08);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.11);
`;
