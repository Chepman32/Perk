import {Typography} from '@components';
import {WorkTimeBox, WorkTimeFlexBox, Wrapper} from './style';
import {PropsWithChildren} from 'react';

interface Props {
  handle?: () => void;
}

export const WorkTime = ({handle}: PropsWithChildren<Props>) => {
  return (
    <Wrapper>
      <Typography lineHeight={20} size={15} fontWeight={600} color="#F2F2F2">
        Время работы
      </Typography>

      <WorkTimeFlexBox>
        <WorkTimeBox background="rgba(255, 255, 255, 0.08)">
          <Typography
            lineHeight={16}
            size={13}
            fontWeight={500}
            color="#F2F2F2">
            Открыто
          </Typography>
        </WorkTimeBox>
        <WorkTimeBox background="rgba(255, 255, 255, 0.08)">
          <Typography
            lineHeight={16}
            size={13}
            fontWeight={500}
            color="#F2F2F2">
            Круглосуточно
          </Typography>
        </WorkTimeBox>
        <WorkTimeBox onPress={handle} background="rgba(242, 242, 242, 1)">
          <Typography
            lineHeight={16}
            size={13}
            fontWeight={500}
            color="#1D1D1D">
            12:00 – 13:00, сегодня
          </Typography>
        </WorkTimeBox>
      </WorkTimeFlexBox>
    </Wrapper>
  );
};
