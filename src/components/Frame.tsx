import {PropsWithChildren, ReactNode} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View<PropsWithChildren<Props>>`
  width: ${({theme, subtractScreenWidth}) =>
    subtractScreenWidth
      ? theme.screenWidth - subtractScreenWidth
      : theme.screenWidth - 32}px;
  border-radius: 16px;
  padding: ${({padding}) => padding || 12}px;
  margin-top: ${({marginTop}) => marginTop || 16}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  background: ${({background}) => background || '#1d1d1d'};
`;

interface Props {
  children?: ReactNode;
  subtractScreenWidth?: number;
  marginTop?: number;
  marginBottom?: number;
  padding?: number;
  background?: string;
  flexDirection?: 'row' | 'column';
}

export const Frame = ({
  children,
  subtractScreenWidth,
  marginTop,
  padding,
  background,
  marginBottom,
  flexDirection,
}: PropsWithChildren<Props>) => {
  return (
    <Wrapper
      padding={padding}
      background={background}
      marginBottom={marginBottom}
      subtractScreenWidth={subtractScreenWidth}
      marginTop={marginTop}
      flexDirection={flexDirection}>
      {children}
    </Wrapper>
  );
};
