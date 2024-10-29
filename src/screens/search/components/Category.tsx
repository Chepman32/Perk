import {Typography} from '@components';
import {
  Wrapper,
  CategoryListItem,
  CategoryListBox,
  CategoryImage,
  CategoryText,
} from './style';
import {PropsWithChildren} from 'react';
import {filterCatalogImages} from '@shared/utils/list';
import {catalogImages} from '@shared/data/catalogImages';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {useDispatch} from '@store/store';
import {setCategorySlice} from '@slices';

interface Props {
  categories: any;
}

export const SearchCategory = ({categories}: PropsWithChildren<Props>) => {
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

  if (categories.length == 0) {
    return null;
  }

  return (
    <Wrapper>
      <Typography
        marginLeft={16}
        marginRight={16}
        lineHeight={20}
        marginBottom={3}
        size={15}
        fontWeight={600}
        marginTop={20}
        color="#F2F2F2">
        Категории
      </Typography>
      <CategoryListBox>
        {categories &&
          categories.map((item: any, index: number) => {
            return (
              <CategoryListItem
                onPress={() => handleSelectCategory(item)}
                key={index}>
                <CategoryImage
                  source={filterCatalogImages(catalogImages, item?._id)}
                />
                <CategoryText>
                  <Typography
                    lineHeight={16}
                    size={13}
                    fontWeight={400}
                    marginLeft={10}
                    color="#F2F2F2">
                    {item?.title}
                  </Typography>
                </CategoryText>
              </CategoryListItem>
            );
          })}
      </CategoryListBox>
    </Wrapper>
  );
};
