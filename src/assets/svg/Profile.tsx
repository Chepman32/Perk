import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}

export const ProfileIcon = ({color}: PropsWithChildren<Props>) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      opacity="0.4"
      d="M23 7.391V16.609C23 19.7 21.581 21.823 19.084 22.626C18.358 22.879 17.522 23 16.609 23H7.391C6.478 23 5.642 22.879 4.916 22.626C2.419 21.823 1 19.7 1 16.609V7.391C1 3.387 3.387 1 7.391 1H16.609C20.613 1 23 3.387 23 7.391Z"
      fill="#7F7F7F"
    />
    <Path
      d="M19 22.5944C18.2826 22.8688 17.4565 23 16.5543 23H7.44565C6.54348 23 5.71739 22.8688 5 22.5944C5.38043 19.4453 8.38044 17 12 17C15.6196 17 18.6196 19.4453 19 22.5944Z"
      fill={color ? color : '#7F7F7F'}
    />
    <Path
      d="M16 11.4951C16 13.4282 14.2123 15 12 15C9.78771 15 8 13.4282 8 11.4951C8 9.56208 9.78771 8 12 8C14.2123 8 16 9.56208 16 11.4951Z"
      fill={color ? color : '#7F7F7F'}
    />
  </Svg>
);
