import styled from 'styled-components/native';

export const ModalHeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const ModalHeaderIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const ModalHeaderTitle = styled.View`
  width: ${({theme}) => theme.screenWidth - 100}px;
`;

export const ScheduleListItem = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`;

export const CategoryItemWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`;
