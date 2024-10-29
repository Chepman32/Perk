import Svg, {Path} from 'react-native-svg';

type AttachmentFileProps = {width?: number; height?: number};

export const AttachmentFileIcon: React.FC<AttachmentFileProps> = ({
  width,
  height,
}) => (
  <Svg width={width || 24} height={height || 24} fill="none">
    <Path
      fill="#F2F2F2"
      d="M20.053 10.19h-2.738c-2.246 0-4.074-1.93-4.074-4.3V3c0-.55-.426-1-.947-1H8.277C5.359 2 3 4 3 7.57v8.86C3 20 5.359 22 8.277 22h7.446C18.641 22 21 20 21 16.43v-5.24c0-.55-.426-1-.947-1Z"
      opacity={0.4}
    />
    <Path
      fill="#F2F2F2"
      d="M15.988 2.2c-.362-.421-.988-.133-.988.453v3.59c0 1.502 1.094 2.747 2.425 2.747.838.01 2.002.01 2.999.01.503 0 .767-.69.415-1.1-1.27-1.492-3.546-4.177-4.851-5.7Z"
    />
  </Svg>
);
