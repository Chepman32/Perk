import {Button, Typography} from '@components';
import {BlackListIcon} from '@assets/svg';
import {Wrapper} from '@assets/styles/globals';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {scale} from 'react-native-size-matters';

export const EmptyBlackList: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Wrapper justifyContent="center">
      <BlackListIcon />
      <Typography
        marginLeft={16}
        marginRight={16}
        marginTop={24}
        align="center"
        lineHeight={24}
        fontWeight={600}
        size={18}
        color="#F2F2F2">
        Чёрный список пуст
      </Typography>

      <Typography
        marginLeft={16}
        marginRight={16}
        marginTop={12}
        align="center"
        lineHeight={16}
        fontWeight={400}
        size={13}
        color="#7F7F7F">
        Мы увидим, какие бренды вы добавили в черный список. Они больше не будут
        отображаться в вашем каталоге, а мы начнем проверку сервиса. В PERK
        должны быть лучшие компании и довольные клиенты.
      </Typography>
      <Button
        marginTop={24}
        height={40}
        onPress={() => navigation.navigate(Screens.CATALOG)}
        fixedWidth={`${scale(94)}px`}
        borderRadius={12}
        background="#F2F2F2">
        <Typography
          align="center"
          lineHeight={16}
          fontWeight={500}
          size={13}
          color="#1D1D1D">
          В каталог
        </Typography>
      </Button>
    </Wrapper>
  );
};
