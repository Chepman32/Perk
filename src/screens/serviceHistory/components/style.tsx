import {PropsWithChildren} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const TitleWrapper = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
  padding: 8px 16px;
`;

export const BrandLogo = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;

interface NameWrapperProps {
  background?: string;
}

export const NameWrapper = styled.View<PropsWithChildren<NameWrapperProps>>`
  padding: 6px 8px;
  border-radius: 8px;
  background: ${({background}) =>
    background ? background : 'rgba(255, 255, 255, 0.08)'};
`;

export const NameImage = styled.Image`
  width: 16px;
  height: 16px;
  border-radius: 16px;
`;

export const CarIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const BrandsList = styled(FlatList).attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
  },
}))``;

export const BrandsListFooter = styled.View`
  width: 100%;
  align-items: center;
  height: 70px;
`;

export const ModalDeleteWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
`;

export const ModalDeleteRecord = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  padding: 20px;
  border-radius: 16px;
  background: #1d1d1d;
`;
