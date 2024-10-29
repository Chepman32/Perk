import {Button, Typography} from '@components';
import {FavoriteIcon} from '@assets/svg';
import {Wrapper} from '@assets/styles/globals';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {scale} from 'react-native-size-matters';

export const EmptyFavorite: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Wrapper justifyContent="center">
      <FavoriteIcon width={60} height={60} />
      <Typography
        marginLeft={16}
        marginRight={16}
        marginTop={24}
        align="center"
        lineHeight={24}
        fontWeight={600}
        size={18}
        color="#F2F2F2">
        В избранном пусто
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
        Перейдите в каталог, чтобы добавить{'\n'}любимые бренды
      </Typography>
      <Button
        marginTop={24}
        height={40}
        onPress={() => navigation.navigate(Screens.CATALOG)}
        fixedWidth={`${scale(94)}`}
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
