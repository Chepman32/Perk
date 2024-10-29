import {PropsWithChildren} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

interface CodeInput {
  active?: boolean;
  marginTop?: number;
}

export const Box = styled.Pressable<CodeInput>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({marginTop}) => marginTop || 50}px;
  padding-horizontal: 16px;
`;

export const CodeInput = styled.TextInput`
  position: absolute;
  top: 20px;
  height: 300px;
  left: -100px;
  width: 100%;
  opacity: 0;
  z-index: 100;
`;

export const CodeInputCellContainer = styled.View<PropsWithChildren<CodeInput>>`
  height: ${scale(56)}px;
  width: ${({theme}) => theme.screenWidth / 3.8 - 25}px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  ${({active}) =>
    active
      ? css`
          border-width: 1px;
          border-color: #fff;
        `
      : css`
          border-width: 1px;
          border-color: rgba(255, 255, 255, 0.08);
        `}
`;
