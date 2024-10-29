import {Flex, Typography, Box, Button} from '@components';
import {ServiceWrapper, ServiceItem, ServiceItemImage} from './style';
import {scale} from 'react-native-size-matters';
import {Tasks} from '@services';
import {useAuth} from '@shared/hooks';
import {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {dateMouthYearLetters} from '@shared/utils/date';
import {Screens} from '@shared/enums';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';

export const Service = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {getTasks} = Tasks;
  const {jwt} = useAuth();
  const [item, setItem] = useState<any>({});

  const tasks = async () => {
    try {
      const response: any = await getTasks(jwt);

      if (response) {
        if (response?.items.length !== 0) {
          setItem(
            response?.items
              ?.find((el: {group: string}) => el.group === 'Предстоящие')
              ?.tasks?.at(-1),
          );
        }
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      tasks();
    }, []),
  );

  return (
    <ServiceWrapper>
      <Flex widthAuto>
        <Box fixedWidth={'70%'}>
          <Typography
            fontWeight={600}
            lineHeight={20}
            size={15}
            marginLeft={4}
            color="#F2F2F2">
            Предстоящее обслуживание
          </Typography>
        </Box>

        <Button
          fixedWidth={`${scale(87)}px`}
          onPress={() =>
            navigation.navigate(Screens.SERVICE_ADD_RECORD, {
              carId: item?.car?._id,
            })
          }
          height={32}
          background="rgba(255, 255, 255, 0.08)"
          borderRadius={8}>
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            Добавить
          </Typography>
        </Button>
      </Flex>
      {item && !!Object.keys(item)?.length && (
        <ServiceItem
          onPress={() =>
            navigation.navigate(Screens.SERVICE_ENTRY, {taskId: item?._id})
          }>
          <Flex widthAuto>
            <Box fixedWidth="60%">
              <Typography lineHeight={16} size={13} color="#F2F2F2">
                {dateMouthYearLetters(item?.startDate, {
                  day: 'numeric',
                  month: 'long',
                })}{' '}
                -{' '}
                {dateMouthYearLetters(item?.endDate, {
                  day: 'numeric',
                  month: 'long',
                })}
              </Typography>
            </Box>

            <Box fixedWidth="30%">
              <Typography
                lineHeight={20}
                size={15}
                align="right"
                color="rgba(127, 127, 127, 1)">
                {item?.createdBy?.firstName}
              </Typography>
            </Box>
          </Flex>
          <Flex marginTop={12}>
            <ServiceItemImage
              source={{
                uri: item?.brand?.avatar?.url,
              }}
            />
            <Box subtractScreenWidth={100}>
              <Typography
                fontWeight={500}
                lineHeight={20}
                size={15}
                color="#F2F2F2">
                {item?.brand?.title}
              </Typography>
              <Typography
                fontWeight={400}
                lineHeight={16}
                size={13}
                color="#7F7F7F">
                {item?.brand?.address}
              </Typography>
            </Box>
          </Flex>
          <Typography
            fontWeight={500}
            marginTop={12}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            {item?.title}
          </Typography>
          <Typography
            numberOfLines={1}
            marginTop={4}
            fontWeight={400}
            lineHeight={16}
            size={13}
            color="#7F7F7F">
            {item?.description}
          </Typography>
        </ServiceItem>
      )}
    </ServiceWrapper>
  );
};
