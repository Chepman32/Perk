import {Center} from '@assets/styles/globals';
import {Box, ButtonWrapper, Flex, Frame, Typography} from '@components';
import {BrandLogo} from './style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {PropsWithChildren} from 'react';
import {dateMouthYearLetters} from '@shared/utils/date';

interface Props {
  item: any;
}

export const HistoryItem = ({item}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Center>
      <Frame marginTop={8} subtractScreenWidth={8}>
        <ButtonWrapper
          handle={() =>
            navigation.navigate(Screens.SERVICE_ENTRY, {taskId: item?._id})
          }>
          <Flex>
            <Box fixedWidth="55%">
              <Typography
                fontWeight={400}
                lineHeight={16}
                size={13}
                color="#F2F2F2">
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
            <Box fixedWidth="40%">
              <Flex justifyContent="flex-end">
                <Typography
                  fontWeight={400}
                  lineHeight={16}
                  size={13}
                  color="#7F7F7F">
                  {item?.createdBy?.firstName}
                </Typography>
              </Flex>
            </Box>
          </Flex>

          <Flex marginTop={12}>
            <BrandLogo
              source={{
                uri: item?.brand?.avatar?.url,
              }}
            />
            <Box subtractScreenWidth={70}>
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
            marginTop={12}
            fontWeight={500}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            {item?.title}
          </Typography>
          <Typography
            fontWeight={400}
            lineHeight={16}
            marginTop={4}
            numberOfLines={1}
            size={13}
            color="#7F7F7F">
            {item?.description}
          </Typography>
        </ButtonWrapper>
      </Frame>
    </Center>
  );
};
