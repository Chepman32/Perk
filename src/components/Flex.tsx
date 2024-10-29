import {PropsWithChildren, ReactNode} from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const Wrapper = styled.View<PropsWithChildren<Props>>`
  width: ${({widthAuto, theme, subtractScreenWidth}) =>
    subtractScreenWidth
      ? `${theme.screenWidth - subtractScreenWidth}px`
      : widthAuto
      ? 'auto'
      : '100%'};
  flex-direction: ${({direction}) => direction || 'row'};
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  /* flex-wrap: wrap; */
  align-items: ${({alignItems}) => alignItems || 'center'};
  justify-content: ${({justifyContent}) => justifyContent || 'space-between'};
`;

interface Props {
  widthAuto?: boolean;
  subtractScreenWidth?: number;
  direction?: string;
  alignItems?: string;
  children?: ReactNode;
  justifyContent?: string;
  marginTop?: number;
  marginBottom?: number;
}

export const Flex = ({
  direction,
  alignItems,
  justifyContent,
  children,
  marginTop,
  widthAuto,
  marginBottom,
  subtractScreenWidth,
}: PropsWithChildren<Props>) => {
  return (
    <Wrapper
      direction={direction}
      subtractScreenWidth={subtractScreenWidth}
      marginBottom={marginBottom}
      widthAuto={widthAuto}
      justifyContent={justifyContent}
      marginTop={marginTop}
      alignItems={alignItems}>
      {children}
    </Wrapper>
  );
};
