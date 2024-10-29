import {Typography} from '@components';
import {DescriptionWrapper, DescriptionButton} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {PropsWithChildren} from 'react';

interface Props {
  description: string;
}

export const Description = ({description}: PropsWithChildren<Props>) => {
  return (
    <DescriptionWrapper>
      <DescriptionButton>
        <Typography
          fontWeight={400}
          lineHeight={16}
          size={13}
          color="#F2F2F2"
          marginBottom={8}>
          {description}
        </Typography>
      </DescriptionButton>
      <LinearGradient
        colors={['rgba(18, 18, 18, 0)', '#1D1D1D']}
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          height: 1,
        }}
      />
    </DescriptionWrapper>
  );
};
