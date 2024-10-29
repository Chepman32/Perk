import styled from 'styled-components/native';
import {Typography} from './Typography';
import {PropsWithChildren} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from 'react-native-size-matters';

const Image = styled.Image`
  width: ${scale(60)}px;
  height: ${scale(60)}px;
  border-radius: ${scale(60)}px;
`;

interface Props {
  image?: string;
  name?: string;
}

export const Avatar = ({image, name}: PropsWithChildren<Props>) => {
  return image ? (
    <Image source={{uri: image}} />
  ) : (
    <LinearGradient
      colors={['#343434', '#1E1E1E']}
      style={{
        width: scale(62),
        height: scale(62),
        borderRadius: scale(62),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography fontWeight={400} lineHeight={24} size={17} color="#7F7F7F">
        {name?.[0]}
      </Typography>
    </LinearGradient>
  );
};
