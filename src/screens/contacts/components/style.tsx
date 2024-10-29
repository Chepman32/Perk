import styled from 'styled-components/native';

export const ContactWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 16}px;
  padding: 12px;
  background: rgba(29, 29, 29, 1);
  border-radius: 12px;
  margin-top: 12px;
`;

export const ContactCarImage = styled.Image`
  width: 24px;
  height: 24px;
`;

export const Info = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  padding: 12px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  margin-top: 12px;
`;

export const PhoneContactItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth}px;
  padding: 20px 16px;
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
`;
