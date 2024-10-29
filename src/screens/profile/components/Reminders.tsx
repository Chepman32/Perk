import {Box, Flex, Typography} from '@components';
import {ItemBox, ItemBoxIcon} from './style';
import {CalendarIcon, FavoriteIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {PropsWithChildren} from 'react';
import {getNoun} from '@shared/utils/list';

interface Props {
  favoritesCount: number;
  tasksCount: number;
}

export const Reminders = ({
  favoritesCount,
  tasksCount,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Flex subtractScreenWidth={10} marginTop={12}>
      <ItemBox onPress={() => navigation.navigate(Screens.PROFILE_FAVORITE)}>
        <ItemBoxIcon>
          <FavoriteIcon />
        </ItemBoxIcon>
        <Box subtractScreenWidth={250}>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Избранное
          </Typography>
          <Typography lineHeight={16} size={11} color="#7F7F7F">
            {favoritesCount}{' '}
            {getNoun(favoritesCount, 'бренд', 'бренда', 'брендов')}
          </Typography>
        </Box>
      </ItemBox>
      <ItemBox onPress={() => navigation.navigate(Screens.CALENDAR)}>
        <ItemBoxIcon>
          <CalendarIcon />
        </ItemBoxIcon>
        <Box subtractScreenWidth={250}>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Календарь
          </Typography>
          <Typography lineHeight={16} size={11} color="#7F7F7F">
            {tasksCount}{' '}
            {getNoun(tasksCount, 'напоминание', 'напоминания', 'напоминаний')}
          </Typography>
        </Box>
      </ItemBox>
    </Flex>
  );
};
