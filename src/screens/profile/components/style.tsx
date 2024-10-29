import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';

export const UserWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth}px;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding-vertical: 15px;
  background: #121212;
`;

interface ItemBoxProps {
  round?: number;
  marginTop?: number;
}

export const ItemBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<ItemBoxProps>>`
  width: ${({theme, round}) => theme.screenWidth / (round ? round : 2) - 10}px;
  flex-direction: row;
  align-items: center;
  background: #1d1d1d;
  justify-content: space-between;
  border-radius: 16px;
  padding: 10px;
  margin-top: ${({marginTop}) => (marginTop ? marginTop : 0)}px;
`;

export const ItemBoxIcon = styled.View`
  width: ${scale(44)}px;
  align-items: center;
  height: ${scale(44)}px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  justify-content: center;
`;

interface ItemBoxTextProps {
  round?: number;
}

export const PaymentHistoryWrapper = styled.ImageBackground.attrs({
  imageStyle: {
    width: '60%',
  },
})`
  width: ${({theme}) => theme.screenWidth - 10}px;
  margin-top: 12px;
  background: #1d1d1d;
  border-radius: 16px;
  padding: 10px;
`;

export const FlexRowBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContactsLevelBox = styled.View`
  background: rgba(255, 255, 255, 0.11);
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 10px;
`;

export const ContactsRigthArrowBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
`;

export const ContactsWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 10}px;
  margin-top: 12px;
  background: #1d1d1d;
  border-radius: 16px;
  padding: 10px;
`;

export const ContactsSlider = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const ContactsBox = styled.TouchableOpacity`
  width: 60px;
  margin-right: 10px;
`;

export const ContactsBoxImage = styled.Image`
  width: 60px;
  height: 60px;
  background: rgba(82, 82, 82, 1);
  border-radius: 12px;
`;

export const MenuWrapper = styled.View`
  width: 100%;
`;

export const MenuItem = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const MenuLine = styled.View`
  width: 100%;
  height: 1px;
  background: #1d1d1d;
`;

export const MenuItemText = styled.View`
  width: ${({theme}) => theme.screenWidth - 80}px;
`;

export const MenuItemIcon = styled.View`
  width: 40px;
`;

export const LogoutWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
`;

export const LogoutBorder = styled.View`
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  height: 1px;
`;

export const ReviewsList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
  },
})``;

export const UserAvatar = styled.Image`
  width: 100%;
  height: 100%;
`;
