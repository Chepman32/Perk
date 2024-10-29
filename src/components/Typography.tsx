import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'react-native-size-matters';

interface Props {
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  children?: any;
  numberOfLines?: number;
  textTransform?: 'uppercase' | 'lowercase';
  lineHeight?: number;
  textDecorationLine?: string;
  onLayout?: ({}) => void;
  fontWeight?: number;
  fontFamily?: 'ComfortaaBold' | 'ComfortaaMedium' | 'InterMedium';
  maxWidth?: number | string;
}

export const Typography = styled.Text.attrs(({onLayout}) => ({
  onLayout: onLayout,
}))<PropsWithChildren<Props>>`
  font-size: ${({size}) => (size ? moderateScale(size) : moderateScale(14))}px;
  color: ${({color}) => color || '#121212'};
  text-align: ${({align}) => align || 'left'};
  margin-top: ${({marginTop}) => marginTop || 0}px;
  font-family: ${({fontFamily}) => fontFamily || 'InterMedium'};
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  text-transform: ${({textTransform}) => textTransform || `none`};
  line-height: ${({lineHeight}) => (lineHeight ? `${lineHeight}px` : `0`)};
  text-decoration-line: ${({textDecorationLine}) =>
    textDecorationLine || 'none'};
  max-width: ${({maxWidth}) => maxWidth};
`;
