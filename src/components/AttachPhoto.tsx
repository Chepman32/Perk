import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {ImageIcon} from '@assets/svg/Image';

type AttachPhotoProps = {
  marginTop?: number;
  marginBottom?: number;
  handle?: () => void;
  disabled?: boolean;
};

export const AttachPhoto: React.FC<AttachPhotoProps> = ({
  handle,
  disabled,
  marginTop,
  marginBottom,
}) => {
  return (
    <Attach
      marginTop={marginTop}
      marginBottom={marginBottom}
      disabled={disabled}
      onPress={handle}>
      <ImageIcon width={scale(24)} height={scale(24)} />
    </Attach>
  );
};

const Attach = styled.TouchableOpacity<{
  marginTop?: number;
  marginBottom?: number;
}>`
  height: ${scale(72)}px;
  width: ${scale(72)}px;
  border-radius: ${scale(8)}px;
  background: #202020;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  align-items: center;
  justify-content: center;
`;
