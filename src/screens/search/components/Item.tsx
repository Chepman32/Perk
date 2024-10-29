import {Typography} from '@components';
import {SearchItemWrapper} from './style';
import {PropsWithChildren} from 'react';

interface Props {
  text?: string;
  handle?: () => void;
}

export const SearchItem = ({text, handle}: PropsWithChildren<Props>) => {
  return (
    <SearchItemWrapper onPress={handle}>
      <Typography
        marginLeft={16}
        marginRight={16}
        lineHeight={20}
        size={15}
        fontWeight={400}
        color="#F2F2F2">
        {text}
      </Typography>
    </SearchItemWrapper>
  );
};
