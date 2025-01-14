import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}

export const HomeIcon = ({color}: PropsWithChildren<Props>) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      opacity="0.4"
      d="M20.0402 6.82018L14.2802 2.79018C12.7102 1.69018 10.3002 1.75018 8.79023 2.92018L3.78023 6.83018C2.78023 7.61018 1.99023 9.21018 1.99023 10.4702V17.3702C1.99023 19.9202 4.06023 22.0002 6.61023 22.0002H17.3902C19.9402 22.0002 22.0102 19.9302 22.0102 17.3802V10.6002C22.0102 9.25018 21.1402 7.59018 20.0402 6.82018Z"
      fill="#7F7F7F"
    />
    <Path
      d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
      fill={color ? color : '#7F7F7F'}
    />
  </Svg>
);
