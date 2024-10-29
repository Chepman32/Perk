import {Button, Flex, Frame, Typography} from '@components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Screens} from '@shared/enums';
import {RootParamList} from '@shared/types/navigation';
import {PropsWithChildren} from 'react';

interface Props {
  item: any;
}

export const CarService = ({item}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Frame>
      <Typography fontWeight={600} lineHeight={20} size={15} color="#F2F2F2">
        Обслуживание авто
      </Typography>
      <Flex marginTop={12}>
        <Button
          borderRadius={12}
          onPress={() =>
            navigation.navigate(Screens.SERVICE_HISTORY, {
              item: item,
            })
          }
          fixedWidth="49%"
          height={44}
          background="rgba(255, 255, 255, 0.08)">
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            История
          </Typography>
        </Button>
        <Button
          borderRadius={12}
          fixedWidth="49%"
          onPress={() =>
            navigation.navigate(Screens.SERVICE_ADD_RECORD, {carId: item?._id})
          }
          height={44}
          background="#F2F2F2">
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#1D1D1D">
            Добавить
          </Typography>
        </Button>
      </Flex>
    </Frame>
  );
};
