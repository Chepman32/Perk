import {Center} from '@assets/styles/globals';
import {
  Characteristics,
  CarService,
  HorizontalCard,
  TrackAuto,
  Info,
} from './components';
import {CurrencyIcon, NotificationIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {PropsWithChildren} from 'react';
import {getNoun, priceEnter} from '@shared/utils/list';

interface Props {
  item: any;
  carAnaliticsTotal?: number;
  carNotificationTotal: number;
}

export const TabCar = ({
  item,
  carAnaliticsTotal,
  carNotificationTotal,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Center>
      <Characteristics item={item} />
      <CarService item={item} />
      {carAnaliticsTotal !== 0 && (
        <HorizontalCard
          handle={() => navigation.navigate(Screens.ANALYTICS)}
          icon={<CurrencyIcon color="#fff" />}
          title="Аналитика"
          subTitle={`${priceEnter(carAnaliticsTotal)} ₽`}
        />
      )}

      {carNotificationTotal !== 0 && (
        <HorizontalCard
          icon={<NotificationIcon />}
          handle={() =>
            navigation.navigate(Screens.NOTIFICATION_GARAGE, {carItem: item})
          }
          title="Уведомления по автомобилю"
          subTitle={`${carNotificationTotal} ${getNoun(
            carNotificationTotal,
            'новые оповещение',
            'новых оповещений',
            'новых оповещений',
          )}`}
        />
      )}

      {/* <TrackAuto /> */}
      {/* <Info /> */}
    </Center>
  );
};
