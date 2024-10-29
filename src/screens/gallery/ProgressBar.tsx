import {Typography} from '@components';
import {Close, ProgressBarWrapper} from './style';
import {CloseIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';

interface Props {
  length: number;
  currect: number;
  handle?: () => void;
}

export const ProgressBar = ({
  length,
  currect,
  handle,
}: PropsWithChildren<Props>) => {
  return (
    <ProgressBarWrapper>
      <Typography align="center" lineHeight={20} size={15} color="#F2F2F2">
        {currect} из {length}
      </Typography>
      <Close onPress={handle}>
        <CloseIcon width={10} height={10} color="#F2F2F2" />
      </Close>
    </ProgressBarWrapper>
  );
};
