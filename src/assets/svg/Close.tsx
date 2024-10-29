import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

export const CloseIcon = ({color, width, height}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '14'}
    height={height ? height : '14'}
    viewBox={'0 0 14 14'}
    fill="none">
    <Path
      d="M9 5L13 1M1 13L7 7M13 13L1 1"
      stroke={color ? color : '#C53830'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
