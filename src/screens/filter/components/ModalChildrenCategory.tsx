import {Box, Flex, Typography} from '@components';
import {ModalChildrenCarItem} from './style';
import {PropsWithChildren} from 'react';
import {RadioIcon} from '@assets/svg';

interface Props {
  item: {
    title: string;
    _id: string;
  };
  selectedId?: string;
  handle?: () => void;
}

export const ModalChildrenCategory = ({
  item,
  selectedId,
  handle,
}: PropsWithChildren<Props>) => {
  return (
    <ModalChildrenCarItem onPress={handle}>
      <Flex>
        <Box subtractScreenWidth={82}>
          <Typography
            lineHeight={20}
            size={15}
            fontWeight={400}
            color="#F2F2F2">
            {item?.title}
          </Typography>
        </Box>
        <Box fixedWidth="30px">
          <Flex justifyContent="flex-end">
            {selectedId == item?._id && <RadioIcon />}
          </Flex>
        </Box>
      </Flex>
    </ModalChildrenCarItem>
  );
};
