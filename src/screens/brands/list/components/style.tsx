import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';

export const FilterButtonWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
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

export const CategoryWrapper = styled.View<{subtractScreenWidth?: number}>`
  width: ${({subtractScreenWidth, theme}) => {
    if (subtractScreenWidth) {
      return `${theme.screenWidth - scale(subtractScreenWidth)}px`;
    } else {
      return `${theme.screenWidth - 32}px`;
    }
  }};
`;

export const CategoryBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
  border-radius: 12px;
  padding: 4px;
  background: #181818;
`;

export const ListWrapper = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
})`
  width: ${({theme}) => theme.screenWidth - 10}px;
`;

export const ListColumnWrapper = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
  columnWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})`
  width: ${({theme}) => theme.screenWidth - 10}px;
`;
