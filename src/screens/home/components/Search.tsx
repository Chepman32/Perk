import {Button, Flex, Input, Typography} from '@components';
import {NotificationCounterBox} from './style';
import {NotificationIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {PropsWithChildren} from 'react';
import {scale} from 'react-native-size-matters';

interface Props {
  countNotifications: number;
}

export const Search = ({countNotifications}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  return (
    <Flex marginTop={10} subtractScreenWidth={16}>
      <Input
        type="button"
        handle={() => navigation.navigate(Screens.SEARCH_CATALOG)}
        placeholder="Поиск в Москве"
        subtractScreenWidth={74}
        background="rgba(255, 255, 255, 0.08)"
      />

      <Button
        background="rgba(255, 255, 255, 0.08)"
        fixedWidth={`${scale(56)}px`}
        height={56}
        onPress={() => navigation.navigate(Screens.NOTIFICATION_LIST)}
        borderRadius={16}>
        {countNotifications !== 0 && (
          <NotificationCounterBox>
            <Typography lineHeight={16} size={11} color="rgba(52, 52, 52, 1)">
              {countNotifications}
            </Typography>
          </NotificationCounterBox>
        )}
        <NotificationIcon />
      </Button>
    </Flex>
  );
};
