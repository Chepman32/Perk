import {Box, Typography} from '@components';
import {CategoryList, CategoryListItem, CategoryItemImage} from './style';
import {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {useDispatch} from '@store/store';
import {setCategorySlice} from '@slices';
import {catalogImages} from '@shared/data/catalogImages';
import {filterCatalogImages} from '@shared/utils/list';
import {scale} from 'react-native-size-matters';

interface Props {
  type?: boolean;
  list: any[];
}

export const List = ({type, list}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const dispatch = useDispatch();

  const handleSelectCategory = (item: any) => {
    dispatch(
      setCategorySlice({
        _id: item._id,
        title: item.title,
      }),
    );
    navigation.navigate(Screens.SERVICE);
  };

  return (
    <CategoryList>
      {list.map((item: any, index) => {
        return (
          <CategoryListItem
            type={type}
            onPress={() => handleSelectCategory(item)}
            key={index}>
            <CategoryItemImage
              source={filterCatalogImages(catalogImages, item?._id)}
              type={type}
            />
            <Box subtractScreenWidth={type ? 70 : 245}>
              <Typography
                marginLeft={type ? +`${scale(16)}` : +`${scale(10)}`}
                lineHeight={type ? 20 : 16}
                fontWeight={400}
                size={type ? 15 : 13}
                color="#F2F2F2">
                {item.title}
              </Typography>
            </Box>
          </CategoryListItem>
        );
      })}
    </CategoryList>
  );
};
