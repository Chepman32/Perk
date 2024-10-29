import {Button, Flex, Typography, Frame} from '@components';
import {PropsWithChildren, useEffect, useState} from 'react';
import {CharacteristicsColumn} from './style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {View} from 'react-native';

interface Props {
  item: any;
}

export const Characteristics = ({item}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Frame>
      <Typography fontWeight={600} lineHeight={20} size={15} color="#F2F2F2">
        Характеристики
      </Typography>
      <Flex marginTop={12}>
        <View style={{flexDirection: 'row'}}>
          <CharacteristicsColumn>
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              Поколение
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              Модель
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              Цвет
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              Госномер
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              VIN
            </Typography>
          </CharacteristicsColumn>
          <CharacteristicsColumn>
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {item?.generation?.name}
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {item?.model?.name}
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {item?.color || ' '}
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {item?.licensePlate || ' '}
            </Typography>
            <Typography
              marginTop={4}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {item?.vin || ' '}
            </Typography>
          </CharacteristicsColumn>
        </View>
      </Flex>
      <Button
        onPress={() => navigation.navigate(Screens.CAR_CHARACTERISTICS, {item})}
        borderRadius={8}
        marginTop={12}
        height={32}
        background="rgba(255, 255, 255, 0.08)">
        <Typography fontWeight={500} lineHeight={16} size={13} color="#F2F2F2">
          Все характеристики
        </Typography>
      </Button>
    </Frame>
  );
};
