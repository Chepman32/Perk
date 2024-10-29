import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';

interface WrapperProps {
  justifyContent?: string;
}

export const Wrapper = styled.View<PropsWithChildren<WrapperProps>>`
  align-items: center;
  flex: 1;
  width: 100%;
  justify-content: ${({justifyContent}) => justifyContent || 'normal'};
`;

export const ScrollVertical = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})``;

export const Center = styled.View`
  width: ${({theme}) => theme.screenWidth}px;
  align-items: center;
`;

export const Content = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
`;
