import {Box, Button, Flex, Typography} from '@components';
import {CategoryWrapper, CategoryBox} from './style';
import {
  DownIcon,
  LocationIcon,
  SortIcon,
  StrokeIcon,
  TileIcon,
} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {PropsWithChildren} from 'react';
import {scale} from 'react-native-size-matters';
import {useSelector} from '@store/store';
import {getCategory} from '@slices';
import {getNoun} from '@shared/utils/list';

interface Props {
  switchType?: () => void;
  handle?: () => void;
  type?: boolean;
  brandsLenght: number;
}

export const Category = ({
  switchType,
  type,
  handle,
  brandsLenght,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {service} = useSelector(getCategory);

  return (
    <CategoryWrapper subtractScreenWidth={16}>
      <CategoryBox onPress={handle}>
        <Box subtractScreenWidth={50}>
          <Typography
            marginLeft={12}
            marginTop={8}
            lineHeight={20}
            size={15}
            fontWeight={400}
            color="#F2F2F2">
            {service?.title}
          </Typography>
          <Typography
            marginTop={4}
            marginBottom={8}
            marginLeft={12}
            lineHeight={16}
            size={13}
            fontWeight={400}
            color="#7F7F7F">
            {brandsLenght} {getNoun(brandsLenght, 'бренд', 'бренда', 'брендов')}
          </Typography>
        </Box>
        <Box fixedWidth="20px">
          <DownIcon />
        </Box>
      </CategoryBox>
      <Flex marginTop={12} marginBottom={4}>
        <Button
          opacity={0}
          disabled
          borderRadius={8}
          background="rgba(255, 255, 255, 0.11)"
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
        </Button>
        <Flex widthAuto>
          <Button
            marginRight={8}
            onPress={switchType}
            borderRadius={8}
            background="rgba(255, 255, 255, 0.11)"
            fixedWidth={`${scale(40)}px`}
            height={32}>
            {type ? <TileIcon /> : <StrokeIcon />}
          </Button>

          <Button
            marginRight={8}
            onPress={() => navigation.navigate(Screens.BRANDS_LIST_MAP)}
            borderRadius={8}
            background="rgba(242, 242, 242, 1)"
            fixedWidth={`${scale(96)}px`}
            height={32}>
            <Flex justifyContent="center">
              <LocationIcon />
              <Typography
                marginLeft={+`${scale(6)}`}
                lineHeight={20}
                size={15}
                color="rgba(29, 29, 29, 1)">
                На карте
              </Typography>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </CategoryWrapper>
  );
};
