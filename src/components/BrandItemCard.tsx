import {Box, ButtonWrapper, Typography} from '@components';
import {StarWhiteIcon, FavoriteListIcon, FavoriteBorderIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';

const CardItemWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth / 2.1}px;
  border-radius: 16px;
  overflow: hidden;
  background: #1d1d1d;
  margin-top: 8px;
`;

const CardItemImage = styled.ImageBackground`
  width: 100%;
  height: ${scale(96)}px;
  flex-direction: column;
  justify-content: space-between;
`;

const CardItemHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
`;

const CardItemBrandLogo = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const CardItemFooter = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const CardItemRating = styled.View`
  padding: 4px;
  flex-direction: row;
  background: rgba(29, 29, 29, 0.75);
  border-top-left-radius: 10px;
  align-items: center;
`;

const CardItemText = styled.View`
  width: 100%;
  padding: 8px;
`;

interface Props {
  handle?: () => void;
  title?: string;
  address?: string;
  isUserFavorite?: boolean;
  avatar?: string;
  image?: string;
  rating?: number;
  reviewsCount?: number;
}

export const BrandItemCard = ({
  handle,
  title,
  address,
  isUserFavorite,
  avatar,
  image,
  rating,
  reviewsCount,
}: PropsWithChildren<Props>) => {
  return (
    <CardItemWrapper onPress={handle}>
      <CardItemImage
        source={{
          uri: image,
        }}>
        <CardItemHeader>
          <CardItemBrandLogo
            source={{
              uri: avatar,
            }}
          />
          <Box fixedWidth="23px">
            {isUserFavorite ? <FavoriteListIcon /> : <FavoriteBorderIcon />}
          </Box>
        </CardItemHeader>
        <CardItemFooter>
          <CardItemRating>
            <StarWhiteIcon />
            <Typography
              marginLeft={2}
              lineHeight={16}
              size={11}
              fontWeight={400}
              color="#F2F2F2">
              {rating?.toFixed(1)} ({reviewsCount})
            </Typography>
          </CardItemRating>
        </CardItemFooter>
      </CardItemImage>
      <CardItemText>
        <Typography
          lineHeight={20}
          size={15}
          fontWeight={500}
          color="#F2F2F2"
          numberOfLines={1}>
          {title}
        </Typography>
        <Typography
          lineHeight={16}
          marginTop={4}
          size={13}
          fontWeight={400}
          color="#7F7F7F"
          numberOfLines={1}>
          {address}
        </Typography>
        <Typography
          lineHeight={16}
          marginTop={4}
          size={13}
          fontWeight={400}
          color="#F2F2F2">
          2 км
        </Typography>
      </CardItemText>
    </CardItemWrapper>
  );
};
