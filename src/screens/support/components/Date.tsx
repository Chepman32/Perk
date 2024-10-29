import {Typography} from '@components';
import {PropsWithChildren} from 'react';
import {DateBox, DateWrapper} from './style';

interface Props {
  date?: string;
}

export const Date = ({date}: PropsWithChildren<Props>) => {
  return (
    <DateWrapper>
      <DateBox>
        <Typography fontWeight={400} lineHeight={16} size={11} color="#F2F2F2">
          {date}
        </Typography>
      </DateBox>
    </DateWrapper>
  );
};
