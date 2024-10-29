import {Button, Typography} from '@components';
import {BoxRow, MenuListRow, MenuWrapper} from './style';
import {
  ExportIcon,
  FavoriteBorderIcon,
  FavoriteIcon,
  FavoriteListIcon,
  MenuIcon,
  RoutingIcon,
  StarBorderIcon,
} from '@assets/svg';
import {PropsWithChildren, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {scale} from 'react-native-size-matters';
import {Brands} from '@services';
import {useAuth} from '@shared/hooks';
import {Alert} from 'react-native';
import {openMaps} from '@shared/utils/list';
interface Props {
  index: number;
  brandIdItem: any;
}

export const Menu = ({index, brandIdItem}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {brandEdit} = Brands;
  const {jwt} = useAuth();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    brandIdItem?.isUserFavorite,
  );

  const handleAddFavorite = async () => {
    try {
      const response = await brandEdit(
        jwt,
        brandIdItem?._id,
        isFavorite ? -1 : 1,
      );

      if (response) {
        setIsFavorite(prev => !prev);
      }
    } catch (error) {}
  };

  const buttonWidth = () => {
    switch (index) {
      case 0:
        return '67%';
        break;
      case 1:
        return '100%';
        break;
      case 2:
        return '49%';
        break;
    }
  };

  return (
    <MenuWrapper>
      <MenuListRow>
        <Button
          onPress={() => navigation.navigate(Screens.PROMO_CODE, {brandIdItem})}
          height={44}
          fixedWidth={buttonWidth()}>
          <Typography
            fontWeight={400}
            lineHeight={16}
            size={11}
            color="#343434">
            Промокод на скидку
          </Typography>
          <Typography
            fontWeight={500}
            lineHeight={20}
            size={15}
            color="#1D1D1D">
            {brandIdItem?.promocode}
          </Typography>
        </Button>
        {index == 0 && (
          <>
            <Button
              fixedWidth={`${scale(44)}px`}
              height={44}
              borderRadius={12}
              onPress={() =>
                openMaps(brandIdItem?.latitude, brandIdItem?.longitude, false)
              }
              background="rgba(255, 255, 255, 0.08)">
              <RoutingIcon />
            </Button>
            <Button
              fixedWidth={`${scale(44)}px`}
              height={44}
              onPress={handleAddFavorite}
              borderRadius={12}
              background="rgba(255, 255, 255, 0.08)">
              {isFavorite ? <FavoriteListIcon /> : <FavoriteBorderIcon />}
            </Button>
          </>
        )}
        {index == 2 && (
          <Button
            height={44}
            onPress={() =>
              navigation.navigate(Screens.REVIEW_BRAND, {
                brandId: brandIdItem?._id,
              })
            }
            background="rgba(255, 255, 255, 0.08)"
            fixedWidth="49%">
            <BoxRow>
              <StarBorderIcon width={16} height={16} />
              <Typography
                marginLeft={8}
                fontWeight={500}
                lineHeight={16}
                size={13}
                color="#F2F2F2">
                Оставить отзыв
              </Typography>
            </BoxRow>
          </Button>
        )}
      </MenuListRow>
    </MenuWrapper>
  );
};
