import {Typography} from '@components';
import {
  GoodsList,
  GoodsListItem,
  GoodsListTitle,
  GoodsListService,
} from './style';
import {PropsWithChildren} from 'react';

interface Props {
  servicesId: [];
}

export const Goods = ({servicesId}: PropsWithChildren<Props>) => {
  return servicesId.map((item: any, index) => {
    return (
      <GoodsList key={index}>
        <GoodsListItem>
          <GoodsListTitle>
            <Typography
              fontWeight={600}
              lineHeight={24}
              size={18}
              color="#F2F2F2">
              {item?.category?.title}
            </Typography>
          </GoodsListTitle>
          <GoodsListService>
            <Typography
              fontWeight={400}
              lineHeight={20}
              size={15}
              color="#7F7F7F">
              {item?.services.length} услуг
            </Typography>
          </GoodsListService>
        </GoodsListItem>
        {item?.services.map((subItem: any, subIndex: number) => {
          return (
            <GoodsListItem key={subIndex}>
              <Typography
                fontWeight={400}
                lineHeight={20}
                size={15}
                color="#F2F2F2">
                {subItem?.title}
              </Typography>
            </GoodsListItem>
          );
        })}
      </GoodsList>
    );
  });
};
