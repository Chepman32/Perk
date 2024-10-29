import {Box, Flex, Typography} from '@components';
import {PieColor, PieListWrapper} from './style';
import {PropsWithChildren} from 'react';
import {priceEnter} from '@shared/utils/list';

interface Props {
  title?: string;
  price: string;
  background: string;
}

export const PieList = ({
  title,
  price,
  background,
}: PropsWithChildren<Props>) => {
  return (
    <PieListWrapper>
      <Flex>
        <PieColor background={background ? background : '#ccc'} />
        <Box subtractScreenWidth={160}>
          <Typography
            fontWeight={400}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            {title}
          </Typography>
        </Box>
        <Box fixedWidth="100px">
          <Flex justifyContent="flex-end">
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {priceEnter(price)} ₽
            </Typography>
          </Flex>
        </Box>
      </Flex>
    </PieListWrapper>
  );
};
