import {TouchableOpacity} from 'react-native';
import {PropsWithChildren, ReactNode, useState} from 'react';
import styled from 'styled-components/native';
import {Flex} from './Flex';
import {Typography} from './Typography';
import {Box} from './Box';
import {FavoriteBorderIcon, FavoriteListIcon} from '@assets/svg';
import {ButtonWrapper} from './ButtonWrapper';
import {scale} from 'react-native-size-matters';

const ListItemWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth - 16}px;
  background: rgba(29, 29, 29, 1);
  border-radius: ${scale(16)}px;
  margin-top: ${scale(8)}px;
  padding: ${scale(8)}px;
`;

const ListItemImage = styled.Image`
  width: ${({width}) => (width ? scale(width) : scale(56))}px;
  height: ${({height}) => (height ? scale(height) : scale(56))}px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 8px;
  border-width: 1px;
  margin-right: ${scale(12)}px;
  border-color: rgba(255, 255, 255, 0.08);
`;

interface Props {
  handle?: () => void;
  handleIcon?: () => void;
  rightIcon?: ReactNode;
  title?: string;
  address?: string;
  image?: string;
  isUserFavorite?: boolean;
  imageSize?: {
    width?: number;
    height?: number;
  };
  addToFavorite?: () => void;
}

export const BrandItemHorizotal = ({
  handle,
  handleIcon,
  rightIcon,
  title,
  address,
  isUserFavorite,
  image,
  imageSize,
  addToFavorite,
}: PropsWithChildren<Props>) => {
  const [favorite, setFavorite] = useState(isUserFavorite);

  return (
    <ListItemWrapper disabled={!handle} onPress={handle}>
      <Flex>
        <ListItemImage
          width={imageSize?.width}
          height={imageSize?.height}
          source={{
            uri: image,
          }}
        />
        <Box subtractScreenWidth={124}>
          <Typography
            lineHeight={20}
            size={15}
            numberOfLines={2}
            fontWeight={500}
            color="#F2F2F2">
            {title}
          </Typography>
          {address && (
            <Typography
              marginTop={4}
              lineHeight={16}
              size={13}
              fontWeight={400}
              numberOfLines={1}
              maxWidth={'92%'}
              color="#7F7F7F">
              {address}{' '}
              {/* <Typography
                lineHeight={16}
                size={13}
                fontWeight={400}
                color="#F2F2F2">
                2 км
              </Typography> */}
            </Typography>
          )}
        </Box>
        <Box fixedWidth={'28px'}>
          {rightIcon && (
            <ButtonWrapper handle={handleIcon}>{rightIcon}</ButtonWrapper>
          )}

          <TouchableOpacity
            onPress={() => {
              setFavorite(!favorite);
              addToFavorite?.();
            }}>
            {favorite ? <FavoriteListIcon /> : <FavoriteBorderIcon />}
          </TouchableOpacity>
        </Box>
      </Flex>
    </ListItemWrapper>
  );
};
