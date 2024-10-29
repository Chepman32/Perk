import {Typography} from '@components';
import {PropsWithChildren} from 'react';
import {SortModalItem, SortModalItemRound} from './style';
import {RadioIcon} from '@assets/svg';

interface Props {}

export const SortModalChildren = ({}: PropsWithChildren<Props>) => {
  return (
    <>
      <Typography
        lineHeight={24}
        marginLeft={16}
        marginBottom={20}
        size={18}
        fontWeight={600}
        color="#F2F2F2">
        Сортировать
      </Typography>
      <SortModalItem active>
        <Typography lineHeight={20} size={15} fontWeight={400} color="#F2F2F2">
          По популярности
        </Typography>
        <RadioIcon />
      </SortModalItem>
      <SortModalItem>
        <Typography lineHeight={20} size={15} fontWeight={400} color="#F2F2F2">
          По алфавиту
        </Typography>
        <SortModalItemRound />
      </SortModalItem>
    </>
  );
};
