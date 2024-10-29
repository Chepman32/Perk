import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  heigth?: number;
}

export const DownIcon = ({width, heigth}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '24'}
    height={heigth ? heigth : '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M4.08008 7.9523L10.6001 14.4723C11.3701 15.2423 12.6301 15.2423 13.4001 14.4723L18.8801 8.9923L19.9201 7.9523"
      stroke="#7F7F7F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
