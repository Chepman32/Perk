import {Flex, Typography} from '@components';
import {CategoryBox, CategoryImage, CategoryText} from './style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {useDispatch} from '@store/store';
import {setCategoryTypeSlice} from '@slices';

const category = [
  {
    title: 'Сервис',
    icon: require('@assets/images/support.png'),
    block: 'service',
  },
  {
    title: 'Поломка',
    icon: require('@assets/images/sos.png'),
    block: 'breakdown',
  },
  {
    title: 'ДТП',
    icon: require('@assets/images/dtp.png'),
    block: 'accident',
  },
  {
    title: 'Тюнинг',
    icon: require('@assets/images/magicpen.png'),
    block: 'tuning',
  },
];

export const Category = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const dispatch = useDispatch();

  const handleFilterCategory = (block: string) => {
    dispatch(setCategoryTypeSlice(block));
    navigation.navigate(Screens.CATALOG);
  };

  return (
    <Flex marginTop={8} subtractScreenWidth={16}>
      {category.map((item, index) => {
        return (
          <CategoryBox
            onPress={() => handleFilterCategory(item.block)}
            key={index}>
            <CategoryImage source={item.icon} />
            <CategoryText>
              <Typography
                align="center"
                lineHeight={16}
                size={13}
                color="#F2F2F2">
                {item.title}
              </Typography>
            </CategoryText>
          </CategoryBox>
        );
      })}
    </Flex>
  );
};
