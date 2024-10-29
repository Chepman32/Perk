import {Typography} from '@components';
import {
  InfoWrappper,
  ItemWrapperList,
  ItemWrapperListIcon,
  ItemWrapperListText,
} from './style';
import {CheckIcon} from '@assets/svg';
import {useRoute} from '@react-navigation/native';
import {ReactNode} from 'react';

export const Info = () => {
  const {params} = useRoute<any>();

  return (
    <InfoWrappper>
      <Typography fontWeight={600} lineHeight={20} size={15} color="#F2F2F2">
        Ваш консьерж менеджер может:
      </Typography>

      {params?.rate?.list?.map((el: {text: string; icon: ReactNode}) => (
        <ItemWrapperList marginTop={12} key={el.text}>
          <ItemWrapperListIcon width={24} height={24}>
            {el?.icon}
          </ItemWrapperListIcon>
          <ItemWrapperListText maxWidth={340}>
            <Typography
              fontWeight={400}
              marginLeft={12}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {el?.text}
            </Typography>
          </ItemWrapperListText>
        </ItemWrapperList>
      ))}

      <Typography
        marginBottom={4}
        fontWeight={600}
        lineHeight={20}
        marginTop={16}
        size={15}
        color="#F2F2F2">
        Также в тариф входит:
      </Typography>

      <ItemWrapperList alignItems="flex-start">
        <ItemWrapperListIcon>
          <CheckIcon />
        </ItemWrapperListIcon>
        <ItemWrapperListText>
          <Typography
            fontWeight={400}
            marginLeft={8}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            Бронирование парковочных мест или услуги водителя в нужном месте.
          </Typography>
        </ItemWrapperListText>
      </ItemWrapperList>
      <ItemWrapperList alignItems="flex-start">
        <ItemWrapperListIcon>
          <CheckIcon />
        </ItemWrapperListIcon>
        <ItemWrapperListText>
          <Typography
            fontWeight={400}
            marginLeft={8}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            Организация технического обслуживания и ремонта автомобиля.
          </Typography>
        </ItemWrapperListText>
      </ItemWrapperList>

      <ItemWrapperList alignItems="flex-start">
        <ItemWrapperListIcon>
          <CheckIcon />
        </ItemWrapperListIcon>
        <ItemWrapperListText>
          <Typography
            fontWeight={400}
            marginLeft={8}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            Поиск и доставка запчастей, аксессуаров или автомобильной техники.
          </Typography>
        </ItemWrapperListText>
      </ItemWrapperList>

      <ItemWrapperList alignItems="flex-start">
        <ItemWrapperListIcon>
          <CheckIcon />
        </ItemWrapperListIcon>
        <ItemWrapperListText>
          <Typography
            fontWeight={400}
            marginLeft={8}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            Обеспечение услуги автомойки или детейлинга для автомобиля.
          </Typography>
        </ItemWrapperListText>
      </ItemWrapperList>

      <ItemWrapperList alignItems="flex-start">
        <ItemWrapperListIcon>
          <CheckIcon />
        </ItemWrapperListIcon>
        <ItemWrapperListText>
          <Typography
            fontWeight={400}
            marginLeft={8}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            Бронирование парковочных мест или услуги водителя в нужном месте.
          </Typography>
        </ItemWrapperListText>
      </ItemWrapperList>
    </InfoWrappper>
  );
};
