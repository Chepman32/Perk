import {Typography, Flex, Box} from '@components';
import {ItemBox, ItemBoxIcon} from './style';
import {StarIcon} from '@assets/svg';
import {DarkCloseIcon} from '@assets/svg/DarkClose';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {PropsWithChildren} from 'react';

interface Props {
  blacklistedCount?: number;
  reviewsCount?: number;
}

export const Reviews = ({
  blacklistedCount,
  reviewsCount,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Flex subtractScreenWidth={10} marginTop={12} direction="column">
      <ItemBox
        onPress={() => navigation.navigate(Screens.MY_REVIEWS)}
        round={1}>
        <ItemBoxIcon>
          <StarIcon />
        </ItemBoxIcon>
        <Box subtractScreenWidth={80}>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Мои отзывы
          </Typography>
          <Typography lineHeight={16} size={11} color="#7F7F7F">
            {reviewsCount} отзывов
          </Typography>
        </Box>
      </ItemBox>

      <ItemBox
        onPress={() => navigation.navigate(Screens.BLACK_LIST)}
        marginTop={12}
        round={1}>
        <ItemBoxIcon>
          <DarkCloseIcon />
        </ItemBoxIcon>
        <Box subtractScreenWidth={80}>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Чёрный список
          </Typography>
          <Typography lineHeight={16} size={11} color="#7F7F7F">
            {blacklistedCount} брендов
          </Typography>
        </Box>
      </ItemBox>
    </Flex>
  );
};
