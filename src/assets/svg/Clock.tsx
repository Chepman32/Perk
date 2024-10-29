import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

export const ClockIcon = ({color, width, height}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '16'}
    height={height ? height : '16'}
    viewBox="0 0 16 16"
    fill="none">
    <Path
      d="M10.597 10.226L8.427 8.931C8.049 8.707 7.741 8.168 7.741 7.727V4.857M2.4 3.8C1.525 4.969 1 6.425 1 8C1 11.864 4.136 15 8 15C11.864 15 15 11.864 15 8C15 4.136 11.864 1 8 1C6.999 1 6.04 1.21 5.179 1.595"
      stroke={color ? color : '#F2F2F2'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
