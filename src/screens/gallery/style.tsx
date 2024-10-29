import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';

export const GalleryList = styled(FlatList).attrs(() => ({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  pagingEnabled: true,
}))`
  background: #121212;
`;

export const GalleryImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${({theme}) => theme.screenWidth}px;
`;

export const ProgressBarWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth}px;
  position: absolute;
  top: 0;
  z-index: 1;
  justify-content: center;
  margin-top: 16px;
`;

export const Close = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  position: absolute;
  right: 16px;
  align-items: center;
  justify-content: center;
`;

export const NameWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth}px;
  position: absolute;
  bottom: 20px;
  padding-horizontal: 16px;
  z-index: 1;
`;
