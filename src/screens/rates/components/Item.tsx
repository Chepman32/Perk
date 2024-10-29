import {PropsWithChildren, ReactNode} from 'react';
import {Typography} from '@components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {RigthArrow} from '@assets/svg';
import {Screens} from '@shared/enums';
import {
  ItemArrowBox,
  ItemHeader,
  ItemWrapper,
  ItemWrapperList,
  ItemWrapperListIcon,
  ItemWrapperListText,
} from './style';

interface Props {
  item?: {
    id: number;
    rating?: number;
    title: string;
    price: string;
    list: Array<{
      icon: ReactNode;
      text: string;
    }>;
    background: string;
    border?: string;
  };
}

export const Item = ({item}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <ItemWrapper
      background={item?.background}
      border={item?.border}
      source={require('@assets/images/item-frame.png')}>
      <ItemHeader>
        <Typography lineHeight={24} size={18} color="#F2F2F2" fontWeight={600}>
          {item?.title}
        </Typography>
        <ItemArrowBox
          onPress={() =>
            navigation.navigate(Screens.RATE_CONDITIONS, {rate: item})
          }>
          <RigthArrow />
        </ItemArrowBox>
      </ItemHeader>
      <Typography
        marginTop={15}
        marginBottom={5}
        lineHeight={16}
        fontWeight={600}
        size={13}
        color="#F2F2F2">
        Ваш консьерж менеджер может:
      </Typography>
      {item?.list?.map((el: any) => (
        <ItemWrapperList key={el.text}>
          <ItemWrapperListIcon>{el?.icon}</ItemWrapperListIcon>
          <ItemWrapperListText>
            <Typography
              marginLeft={8}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {el?.text}
            </Typography>
          </ItemWrapperListText>
        </ItemWrapperList>
      ))}
      <Typography marginTop={12} lineHeight={24} size={18} color="#F2F2F2">
        {item?.price}
      </Typography>
    </ItemWrapper>
  );
};
