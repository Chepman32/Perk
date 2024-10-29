import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';

interface Logo {
  marginTop?: number;
}

export const Logo = styled.Image<PropsWithChildren<Logo>>`
  width: 137px;
  height: 52px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
`;

export const PrivacyPolicyWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 30}px;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
