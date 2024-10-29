import {Typography} from '@components';
import {CloseModalBox} from './style';
import {CloseIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';
import {Content} from '@assets/styles/globals';

interface Props {
  handle?: () => void;
  name?: string;
  year?: string;
}

export const Title = ({handle, name, year}: PropsWithChildren<Props>) => {
  return (
    <Content>
      <Typography fontWeight={600} lineHeight={24} size={18} color="#F2F2F2">
        {name}
      </Typography>
      <Typography fontWeight={400} lineHeight={20} size={15} color="#7F7F7F">
        {year}
      </Typography>
      <CloseModalBox onPress={handle}>
        <CloseIcon width={10} height={10} color="#F2F2F2" />
      </CloseModalBox>
    </Content>
  );
};
