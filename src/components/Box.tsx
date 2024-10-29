import {PropsWithChildren, ReactNode} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const Wrapper = styled.View<PropsWithChildren<Props>>`
  width: ${({subtractScreenWidth, theme, fixedWidth}) =>
    subtractScreenWidth
      ? `${theme.screenWidth - scale(subtractScreenWidth)}px`
      : fixedWidth
      ? fixedWidth
      : `100%`};
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  overflow: hidden;
`;

interface Props {
  children?: ReactNode;
  subtractScreenWidth?: number;
  marginTop?: number;
  marginBottom?: number;
  fixedWidth?: string;
}

export const Box = ({
  children,
  subtractScreenWidth,
  marginTop,
  fixedWidth,
  marginBottom,
}: PropsWithChildren<Props>) => {
  return (
    <Wrapper
      subtractScreenWidth={subtractScreenWidth}
      marginBottom={marginBottom}
      fixedWidth={fixedWidth}
      marginTop={marginTop}>
      {children}
    </Wrapper>
  );
};
