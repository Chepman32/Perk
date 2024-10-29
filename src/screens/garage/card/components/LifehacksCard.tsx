import {Button, Typography} from '@components';
import {
  LifehacksCardButton,
  LifehacksCardImage,
  LifehacksCardWrapper,
} from './style';
import {PropsWithChildren, useState} from 'react';
import {ExportIcon, FavoriteBorderIcon, FavoriteListIcon} from '@assets/svg';
import {dateFormatFromISO} from '@shared/utils/date';
import {LifehacksService} from '@services';
import {useAuth} from '@shared/hooks';
import {Alert} from 'react-native';

interface Props {
  handle?: () => void;
  item?: any;
}
export const LifehacksCard = ({handle, item}: PropsWithChildren<Props>) => {
  const {jwt} = useAuth();
  const {lifehackChangeStatus} = LifehacksService;
  const [isFavorite, setIsFavorite] = useState<boolean>(item?.isUserFavorite);

  const handleChangeStatus = async () => {
    try {
      const response = await lifehackChangeStatus(
        jwt,
        item?._id,
        isFavorite ? -1 : 1,
      );

      if (response) {
        setIsFavorite(prev => !prev);
      }
    } catch (error) {}
  };
  return (
    <LifehacksCardWrapper onPress={handle}>
      <LifehacksCardImage
        source={{
          uri: item?.cover?.url,
        }}>
        <LifehacksCardButton>
          {/* <Button
            borderRadius={12}
            background="rgba(255, 255, 255, 0.08)"
            fixedWidth="44px"
            height={44}>
            <ExportIcon />
          </Button> */}
          <Button
            borderRadius={12}
            marginLeft={6}
            onPress={handleChangeStatus}
            background="rgba(255, 255, 255, 0.08)"
            fixedWidth="44px"
            height={44}>
            {isFavorite ? <FavoriteListIcon /> : <FavoriteBorderIcon />}
          </Button>
        </LifehacksCardButton>
      </LifehacksCardImage>
      <Typography
        marginTop={8}
        fontWeight={500}
        lineHeight={16}
        size={13}
        color="#F2F2F2">
        {item?.title}
      </Typography>
      <Typography
        marginTop={4}
        fontWeight={400}
        lineHeight={16}
        size={11}
        color="#7F7F7F">
        {dateFormatFromISO(item?.createdAt)}
      </Typography>
    </LifehacksCardWrapper>
  );
};
