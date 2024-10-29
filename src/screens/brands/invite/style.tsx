import styled from 'styled-components/native';

export const InvteStarIconWrapper = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 30px;
`;

export const PromoCodeWrapper = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  width: ${({theme}) => theme.screenWidth - 32}px;
  height: 140px;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
`;
