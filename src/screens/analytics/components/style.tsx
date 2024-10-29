import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';

export const PieChartBox = styled.View`
  width: 240px;
  height: 240px;
  border-radius: 240px;
  margin-top: 20px;
`;

export const PieChartAbsolute = styled.View`
  width: 240px;
  height: 240px;
  border-radius: 240px;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: center;
`;

export const PieListWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  margin-top: 20px;
`;

interface PieColorProps {
  background: string;
}

export const PieColor = styled.View<PropsWithChildren<PieColorProps>>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: ${({background}) => background};
`;
