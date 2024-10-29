import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}

export const ChatCheckIcon = ({color}: PropsWithChildren<Props>) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M5 8L8 11L14 5M2 8L5 11M8 8L11 5"
      stroke={color ? color : '#121212'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
