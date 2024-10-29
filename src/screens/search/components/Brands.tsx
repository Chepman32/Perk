import {Typography} from '@components';
import {Wrapper, BrandsListItem, BrandsImage, BrandsText} from './style';
import {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

interface Props {
  brands: any;
}

export const SearchBrands = ({brands}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  if (brands.length == 0) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <Typography
          marginLeft={16}
          marginRight={16}
          lineHeight={20}
          marginBottom={8}
          size={15}
          fontWeight={600}
          marginTop={15}
          color="#F2F2F2">
          Бренды
        </Typography>
      </Wrapper>
      {brands &&
        brands.map((item: any, index: number) => {
          return (
            <BrandsListItem
              onPress={() =>
                navigation.navigate(Screens.BRAND_CARD, {brandId: item?._id})
              }
              key={index}>
              <BrandsImage
                source={{
                  uri: item?.photos?.[0]?.url,
                }}
              />
              <BrandsText>
                <Typography
                  lineHeight={20}
                  marginLeft={12}
                  marginRight={12}
                  size={15}
                  fontWeight={500}
                  color="#F2F2F2">
                  {item?.title}
                </Typography>
                <Typography
                  lineHeight={16}
                  marginLeft={12}
                  marginRight={12}
                  marginTop={4}
                  size={13}
                  fontWeight={400}
                  color="#7F7F7F">
                  {item?.address}{' '}
                  <Typography
                    lineHeight={16}
                    size={13}
                    fontWeight={400}
                    color="#F2F2F2">
                    2 км
                  </Typography>
                </Typography>
              </BrandsText>
            </BrandsListItem>
          );
        })}
    </>
  );
};
