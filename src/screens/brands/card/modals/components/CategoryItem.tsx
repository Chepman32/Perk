import {Typography} from '@components';
import {CategoryItemWrapper} from './style';

export const CategoryItem = () => {
  return (
    <CategoryItemWrapper>
      <Typography fontWeight={400} lineHeight={20} size={15} color="#F2F2F2">
        Диагностика автомобиля
      </Typography>
      <Typography fontWeight={400} lineHeight={20} size={15} color="#7F7F7F">
        12
      </Typography>
    </CategoryItemWrapper>
  );
};
