import {Typography} from '@components';
import {FilterButtonWrapper, FilterCounter} from './style';
import {FilterIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';
import {useSelector} from '@store/store';
import {getBradnsListFilter} from '@slices';

interface Props {
  handle: () => void;
}

export const FilterButton = ({handle}: PropsWithChildren<Props>) => {
  const {filterFields} = useSelector(getBradnsListFilter);

  return (
    <FilterButtonWrapper onPress={handle}>
      <FilterIcon />
      {Object.values(filterFields).filter(Boolean).length !== 0 && (
        <FilterCounter>
          <Typography
            lineHeight={16}
            size={11}
            fontWeight={400}
            color="#F2F2F2">
            {Object.values(filterFields).filter(Boolean).length}
          </Typography>
        </FilterCounter>
      )}
    </FilterButtonWrapper>
  );
};
