import {Typography} from '@components';
import {GarageWrapper} from './style';
import {PropsWithChildren} from 'react';
import {getNoun} from '@shared/utils/list';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

interface Props {
  garageCount: number;
}

export const Garage = ({garageCount}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <GarageWrapper onPress={() => navigation.navigate(Screens.GARAGE_LIST)}>
      <Typography lineHeight={20} size={15} fontWeight={600} color="#F2F2F2">
        Гараж
      </Typography>
      <Typography lineHeight={16} size={13} color="#F2F2F2">
        {garageCount}{' '}
        {getNoun(garageCount, 'автомобиль', 'автомобиля', 'автомобилей')}
      </Typography>
    </GarageWrapper>
  );
};
