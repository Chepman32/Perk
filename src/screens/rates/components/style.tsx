import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';

interface ItemWrapperProps {
  background?: string;
  border?: string;
}

export const ItemWrapper = styled.ImageBackground.attrs({
  imageStyle: {
    width: '40%',
    height: '50%',
  },
})<PropsWithChildren<ItemWrapperProps>>`
  width: ${({theme}) => theme.screenWidth - 16}px;
  margin-top: 14px;
  border-radius: 16px;
  padding: 12px;
  background: rgba(29, 29, 29, 1);
  background: ${({background}) => (background ? background : '#000')};
  /* background: transparent; */
  border-width: 1px;
  border-color: ${({border}) => border};
`;

export const ItemHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItemArrowBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
`;

export const InfoWrappper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  margin-top: 16px;
`;

export const AgreeTariffWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 20}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const AgreeTariffCheckBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 24px;
  height: 24px;
  background: #343434;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: #393939;
`;

export const AgreeTariffText = styled.View`
  width: ${({theme}) => theme.screenWidth - 44}px;
`;

export const RateWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  border-radius: 16px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.11);
  background: #1d1d1d;
  padding: 12px;
`;

export const RateAgree = styled.View`
  flex-direction: row;
  padding-top: 8px;
`;

export const RateEmpty = styled.View`
  width: 8px;
`;

export const ItemWrapperList = styled.View<{
  marginTop?: number;
  alignItems?: string;
}>`
  width: 100%;
  flex-direction: row;
  margin-top: 8px;
  margin-top: ${({marginTop}) => (marginTop ? marginTop : '8px')};
  align-items: ${({alignItems}) => (alignItems ? alignItems : 'center')};
`;

export const ItemWrapperListIcon = styled.View<{
  width?: number;
  height?: number;
}>`
  width: ${({width}) => (width ? width : '16px')};
  height: ${({height}) => (height ? height : '16px')};
`;

export const ItemWrapperListText = styled.View<{maxWidth?: number}>`
  width: ${({theme}) => theme.screenWidth - 40}px;
  max-width: ${({maxWidth}) => maxWidth};
`;
