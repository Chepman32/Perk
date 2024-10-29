import {Typography} from '@components';
import {
  TabsNavigationBorder,
  TabsNavigationButton,
  TabsNavigationCounter,
  TabsNavigationWrapper,
} from './style';
import {PropsWithChildren} from 'react';

interface Props {
  index?: number;
  handle: (index: number) => void;
  servicesIdLength?: string;
  reviewsIdLength?: string;
}

export const TabsNavigation = ({
  index,
  handle,
  reviewsIdLength,
  servicesIdLength,
}: PropsWithChildren<Props>) => {
  return (
    <TabsNavigationWrapper>
      <TabsNavigationButton onPress={() => handle(0)} width={27}>
        <Typography
          fontWeight={500}
          lineHeight={16}
          size={13}
          color={index == 0 ? '#F2F2F2' : '#7F7F7F'}>
          Описание
        </Typography>
        {index == 0 && <TabsNavigationBorder />}
      </TabsNavigationButton>
      <TabsNavigationButton onPress={() => handle(1)} width={46}>
        <Typography
          fontWeight={500}
          lineHeight={16}
          size={13}
          color={index == 0 ? '#F2F2F2' : '#7F7F7F'}>
          Товары и услуги
        </Typography>
        <TabsNavigationCounter>
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            {servicesIdLength}
          </Typography>
        </TabsNavigationCounter>
        {index == 1 && <TabsNavigationBorder />}
      </TabsNavigationButton>
      <TabsNavigationButton onPress={() => handle(2)} width={27}>
        <Typography
          fontWeight={500}
          lineHeight={16}
          size={13}
          color={index == 0 ? '#F2F2F2' : '#7F7F7F'}>
          Отзывы
        </Typography>
        <TabsNavigationCounter>
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            {reviewsIdLength}
          </Typography>
        </TabsNavigationCounter>
        {index == 2 && <TabsNavigationBorder />}
      </TabsNavigationButton>
    </TabsNavigationWrapper>
  );
};
