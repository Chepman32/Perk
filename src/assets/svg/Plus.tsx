import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

export const PlusIcon = ({color, width, height}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '24'}
    height={height ? height : '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M12 3V21M3 11.9446H21"
      stroke={color ? color : 'black'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
