import {Box, Button, Flex, Typography} from '@components';
import {CategoryWrapper, CategoryBox, CategoryImage} from './style';
import {DownIcon, SortIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';
import {useSelector} from '@store/store';
import {getCategory} from '@slices';
import {filterCatalogImages, getNoun} from '@shared/utils/list';
import {catalogImages} from '@shared/data/catalogImages';
import {scale} from 'react-native-size-matters';

interface Props {
  handle: () => void;
  serviceCount: number;
}

export const Category = ({handle, serviceCount}: PropsWithChildren<Props>) => {
  const {category} = useSelector(getCategory);

  return (
    <CategoryWrapper onPress={handle}>
      <CategoryBox>
        <CategoryImage
          source={filterCatalogImages(catalogImages, category?._id)}
        />
        <Box subtractScreenWidth={110}>
          <Typography
            marginLeft={12}
            lineHeight={20}
            size={15}
            fontWeight={400}
            color="#F2F2F2">
            {category.title}
          </Typography>
          <Typography
            marginLeft={12}
            lineHeight={16}
            size={13}
            marginTop={4}
            fontWeight={400}
            color="#7F7F7F">
            {serviceCount} {getNoun(serviceCount, 'услуга', 'услуги', 'услуг')}
          </Typography>
        </Box>
        <Box fixedWidth="20px">
          <DownIcon />
        </Box>
      </CategoryBox>
      {/* <Button
        borderRadius={8}
        background="rgba(255, 255, 255, 0.11)"
        marginTop={12}
        marginBottom={8}
        fixedWidth={`${scale(116)}px`}
        height={32}>
        <Flex justifyContent="center">
          <SortIcon />
          <Typography
            marginLeft={+`${scale(6)}`}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            По рейтингу
          </Typography>
        </Flex>
      </Button> */}
    </CategoryWrapper>
  );
};
