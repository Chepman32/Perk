import {Center} from '@assets/styles/globals';
import {LifehacksCard} from './components';
import {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

interface Props {
  lifeHacks: [];
}

export const TabLifehacks = ({lifeHacks}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Center>
      {lifeHacks.map((item: any, index: number) => {
        return (
          <LifehacksCard
            handle={() => {
              navigation.navigate(Screens.LIFEHACKS_CARD, {
                lifehackId: item?._id,
              });
            }}
            item={item}
            key={index}
          />
        );
      })}
    </Center>
  );
};
