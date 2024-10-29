import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

export const LocationIcon = ({
  color,
  width,
  height,
}: PropsWithChildren<Props>) => (
  <Svg
    width={width || '16'}
    height={height || '16'}
    viewBox="0 0 16 16"
    fill="none">
    <Path
      d="M3.81297 2.60722C6.8532 -0.269618 12.7458 0.717326 13.8311 5.55405C14.6312 9.10984 12.4328 12.1197 10.5057 13.9816C9.10729 15.3395 6.89495 15.3395 5.48962 13.9816C3.56947 12.1127 1.36408 9.10284 2.1711 5.54705M10.25 7.22222C10.25 8.51089 9.24264 9.55556 8 9.55556C6.75736 9.55556 5.75 8.51089 5.75 7.22222C5.75 5.93356 6.75736 4.88889 8 4.88889C9.24264 4.88889 10.25 5.93356 10.25 7.22222Z"
      stroke={color ? color : '#1D1D1D'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
