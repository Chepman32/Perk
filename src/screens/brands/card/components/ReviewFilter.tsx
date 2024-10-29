import {
  ReviewFilterWrapper,
  FilterSortBox,
  PhotoAvaiableBox,
  PhotoAvaiableCheckBox,
} from './style';
import {SortIcon} from '@assets/svg';
import {Typography} from '@components';

export const ReviewFilter = () => {
  return (
    <ReviewFilterWrapper>
      <FilterSortBox>
        <SortIcon />
        <Typography marginLeft={7} lineHeight={20} size={15} color="#F2F2F2">
          Сначала новые
        </Typography>
      </FilterSortBox>
      <PhotoAvaiableBox>
        <PhotoAvaiableCheckBox />
        <Typography marginLeft={6} lineHeight={16} size={13} color="#F2F2F2">
          Есть фото
        </Typography>
      </PhotoAvaiableBox>
    </ReviewFilterWrapper>
  );
};
