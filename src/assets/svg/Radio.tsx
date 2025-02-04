import {PropsWithChildren} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

export const RadioIcon = ({width, height}: PropsWithChildren<Props>) => (
  <Svg
    width={width ? width : '24'}
    height={height ? height : '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M12 1C5.939 1 1 5.939 1 12C1 18.061 5.939 23 12 23C18.061 23 23 18.061 23 12C23 5.939 18.061 1 12 1ZM17.258 9.47L11.021 15.707C10.867 15.861 10.658 15.949 10.438 15.949C10.218 15.949 10.009 15.861 9.855 15.707L6.742 12.594C6.423 12.275 6.423 11.747 6.742 11.428C7.061 11.109 7.589 11.109 7.908 11.428L10.438 13.958L16.092 8.304C16.411 7.985 16.939 7.985 17.258 8.304C17.577 8.623 17.577 9.14 17.258 9.47Z"
      fill="#F2F2F2"
    />
  </Svg>
);
