import {Box, Button, Flex, Typography} from '@components';
import {
  LifehacksWrapper,
  LifehacksSlider,
  LifehacksItemBox,
  LifehacksItem,
  LifehacksItemImage,
} from './style';
import {RigthArrow} from '@assets/svg';
import {scale} from 'react-native-size-matters';
import {LifehacksService} from '@services';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useAuth} from '@shared/hooks';
import {dateFormatFromISO} from '@shared/utils/date';
import {lifehacksSort} from '@shared/utils/list';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

export const Lifehacks = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {lifehacks} = LifehacksService;
  const {jwt} = useAuth();
  const [lifehacksList, setLifehacksList] = useState<any>([]);

  const getLifehacks = async () => {
    try {
      const response: any = await lifehacks(jwt);

      if (response) {
        if (response?.items) {
          setLifehacksList(lifehacksSort(response?.items));
        }
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getLifehacks();
    }, []),
  );

  if (lifehacksList.length == 0) {
    return null;
  }

  return (
    <LifehacksWrapper>
      <Flex marginTop={16} subtractScreenWidth={48}>
        <Typography lineHeight={20} size={15} color="#F2F2F2">
          Лайфхаки
        </Typography>
        <Button
          fixedWidth={`${scale(28)}px`}
          onPress={() => navigation.navigate(Screens.LIFEHACKS_LIST)}
          height={28}
          background="rgba(255, 255, 255, 0.08)"
          borderRadius={28}>
          <RigthArrow />
        </Button>
      </Flex>

      <LifehacksSlider>
        {lifehacksList.map((item: any, index: number) => {
          return (
            <LifehacksItemBox key={index}>
              {item.data &&
                item.data.map((i: any, k: number) => {
                  return (
                    <LifehacksItem
                      onPress={() =>
                        navigation.navigate(Screens.LIFEHACKS_CARD, {
                          lifehackId: i?._id,
                        })
                      }
                      key={k}>
                      <LifehacksItemImage
                        source={{
                          uri: i?.cover?.url,
                        }}
                      />
                      <Box subtractScreenWidth={140}>
                        <Typography
                          marginLeft={12}
                          lineHeight={16}
                          fontWeight={500}
                          size={13}
                          numberOfLines={3}
                          color="#F2F2F2">
                          {i?.title}
                        </Typography>
                        <Typography
                          marginLeft={12}
                          marginTop={4}
                          lineHeight={16}
                          fontWeight={400}
                          size={11}
                          color="#7F7F7F">
                          {dateFormatFromISO(i?.createdAt)}
                        </Typography>
                      </Box>
                    </LifehacksItem>
                  );
                })}
            </LifehacksItemBox>
          );
        })}
      </LifehacksSlider>
    </LifehacksWrapper>
  );
};
