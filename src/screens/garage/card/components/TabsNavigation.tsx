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
  carIdList?: any;
  lifehacksListLength: number;
}

export const TabsNavigation = ({
  index,
  handle,
  carIdList,
  lifehacksListLength,
}: PropsWithChildren<Props>) => {
  return (
    <TabsNavigationWrapper>
      <TabsNavigationButton onPress={() => handle(0)} width={33}>
        <Typography
          fontWeight={500}
          lineHeight={16}
          size={13}
          color={index == 0 ? '#F2F2F2' : '#7F7F7F'}>
          Автомобиль
        </Typography>
        {index == 0 && <TabsNavigationBorder />}
      </TabsNavigationButton>
      <TabsNavigationButton onPress={() => handle(1)} width={33}>
        <Typography
          fontWeight={500}
          lineHeight={16}
          size={13}
          color={index == 1 ? '#F2F2F2' : '#7F7F7F'}>
          Водители
        </Typography>
        <TabsNavigationCounter>
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            {carIdList?.sharedWith?.length}
          </Typography>
        </TabsNavigationCounter>
        {index == 1 && <TabsNavigationBorder />}
      </TabsNavigationButton>
      <TabsNavigationButton onPress={() => handle(2)} width={33}>
        <Typography
          fontWeight={500}
          lineHeight={16}
          size={13}
          color={index == 2 ? '#F2F2F2' : '#7F7F7F'}>
          Лайфхаки
        </Typography>
        <TabsNavigationCounter>
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            {lifehacksListLength}
          </Typography>
        </TabsNavigationCounter>
        {index == 2 && <TabsNavigationBorder />}
      </TabsNavigationButton>
    </TabsNavigationWrapper>
  );
};
