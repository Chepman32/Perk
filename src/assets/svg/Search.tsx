import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

export const SearchIcon = ({
  color,
  height,
  width,
}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '24'}
    height={height ? height : '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M10.5 3C14.6447 3 18 6.35526 18 10.5C18 14.6447 14.6447 18 10.5 18C6.35526 18 3 14.6447 3 10.5C3 7.57895 4.66579 5.05263 7.10526 3.81316"
      stroke={color ? color : '#F2F2F2'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L18 18"
      stroke={color ? color : '#F2F2F2'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
