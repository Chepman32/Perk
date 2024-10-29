import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}

export const TrashIcon = ({color}: PropsWithChildren<Props>) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97M15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M9 22.0001H15.42C18.21 22.0001 18.3 20.7801 18.41 19.2101L19.06 9.14014"
      stroke={color ? color : '#C53830'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 12L12 15L9 18M15 18L9 12"
      stroke={color ? color : '#C53830'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
