import Svg, {Path} from 'react-native-svg';

export const ImageIcon = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <Svg
    width={width || '24'}
    height={height || '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 6C7.9 6 7 6.9 7 8C7 9.1 7.9 10 9 10C10.1 10 11 9.1 11 8M2 12.99V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10M13 2H9C4 2 2 4 2 9M15.75 5H21.25M18.5 7.75V2.25M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9"
      stroke="#F2F2F2"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
