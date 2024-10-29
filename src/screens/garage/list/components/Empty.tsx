import {Typography, Button} from '@components';
import {GarageIcon} from '@assets/svg';
import {Wrapper} from '@assets/styles/globals';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens, Variables} from '@shared/enums';
import {scale} from 'react-native-size-matters';

export const Empty = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Wrapper justifyContent="center">
      <GarageIcon width={60} height={60} color="#F2F2F2" />
      <Typography
        marginTop={30}
        lineHeight={24}
        align="center"
        size={18}
        color="#F2F2F2">
        В гараже пусто
      </Typography>
      <Typography
        marginTop={12}
        lineHeight={16}
        align="center"
        size={13}
        color="#7F7F7F">
        Добавьте свой первый автомобиль
      </Typography>
      <Button
        height={44}
        onPress={() =>
          navigation.navigate(Screens.LIST_CAR_ITEMS, {
            listType: Variables.BRAND,
            step: 2,
          })
        }
        marginTop={24}
        subtractScreenWidth={180}
        background="#F2F2F2">
        <Typography lineHeight={16} align="center" size={13} color="#1D1D1D">
          Добавить автомобиль
        </Typography>
      </Button>
    </Wrapper>
  );
};
