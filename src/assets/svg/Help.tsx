import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}

export const HelpIcon = ({color}: PropsWithChildren<Props>) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85M12 13.878V13.6037C12 12.7155 12.5061 12.2452 13.0121 11.8664C13.5061 11.5007 14 11.0305 14 10.1684C14 8.96664 13.1085 8 12 8C10.8915 8 10 8.96664 10 10.1684M11.9948 17H12.0056"
      stroke={color ? color : '#7F7F7F'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
