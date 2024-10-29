import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';

export const NotificationListContainer = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
  },
})``;

export const SupportItemAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;

export const SupportItemCounter = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background: #ffd439;
  justify-content: space-between;
  align-items: center;
`;

export const Type = styled.View`
  padding: 6px 8px;
  border-radius: 500px;
  background: rgba(255, 255, 255, 0.08);
  justify-content: center;
  align-items: center;
`;

export const IconModel = styled.Image`
  width: 24px;
  height: 24px;
`;

export const IconBrand = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;
