import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

export const DarkListIcon = ({width, height}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '24'}
    height={height ? height : '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M5.646 18.372L18.372 5.646M3 12.918V14.61C3 15.222 3.36 16.086 3.792 16.518L7.482 20.208C7.914 20.64 8.77801 21 9.39001 21H14.61C15.222 21 16.086 20.64 16.518 20.208L18.363 18.363M3 9.39001C3 8.77801 3.36 7.91401 3.792 7.48201L5.637 5.63701M5.637 5.63701L7.482 3.792C7.914 3.36 8.77801 3 9.39001 3H14.61C15.222 3 16.086 3.36 16.518 3.792L20.208 7.48201C20.64 7.91401 21 8.77801 21 9.39001V14.61C21 15.222 20.64 16.086 20.208 16.518L18.363 18.363M5.637 5.63701L18.363 18.363"
      stroke="#C53830"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
