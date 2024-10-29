import {Center} from '@assets/styles/globals';
import {DotsVerticalIcon, LeftArrowIcon, RigthArrow} from '@assets/svg';
import {
  Box,
  ButtonWrapper,
  Flex,
  Frame,
  Header,
  Layout,
  Typography,
  CarItem,
} from '@components';
import {BrandLogo} from '@screens/serviceHistory/components/style';
import {Tasks} from '@services';
import {caledarData} from '@shared/data/calendar';
import {Screens} from '@shared/enums';
import {useAuth} from '@shared/hooks';
import {dateFormatFromISO, dateMouthYearLetters} from '@shared/utils/date';
import { getCurrentDate } from '@shared/utils/getCurrentDate';
import {getNoun, sectionListFormat} from '@shared/utils/list';
import {useEffect, useState} from 'react';
import {SectionList} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import styled from 'styled-components/native';

export const ArrowBox = styled.View`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

LocaleConfig.locales['fr'] = {
  monthNames: caledarData.monthNames,
  monthNamesShort: caledarData.monthNamesShort,
  dayNames: caledarData.dayNames,
  dayNamesShort: caledarData.dayNamesShort,
};

LocaleConfig.defaultLocale = 'fr';

export const CalendarList: React.FC = ({navigation}: any) => {
  const {jwt} = useAuth();
  const {getTasks} = Tasks;
  const [selected, setSelected] = useState('');
  const [list, setList] = useState<any>([]);
  let markedDay: any = {};
  const [eventList, setEventList] = useState<any>([]);

  useEffect(() => {
    getTasksId({dateString: getCurrentDate()})
  }, [])

  const getTasksId = async (day: any) => {
    try {
      setSelected(day.dateString);
      const response = await getTasks(jwt, day.dateString);

      if (response) {
        setList(sectionListFormat(response?.items, 'group', 'tasks'));
      }
    } catch (error) {}
  };

  const getTasksList = async () => {
    try {
      const response = await getTasks(jwt);

      if (response) {
        if (response?.items.length !== 0) {
          const result = response?.items?.reduce((r: any, s: any) => {
            r.push(s.tasks);
            return r;
          }, []);
          setEventList(result.flat());
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTasksList();
  }, []);

  eventList?.map((item: any) => {
    markedDay[dateFormatFromISO(item.startDate, 'y-MM-dd')] = {
      dotColor: '#FFD439',
      marked: true,
    };
  });

  return (
    <Layout statusBarColor="#121212" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Календарь"
        background="#121212"
        rightContent={
          <ButtonWrapper>
            <DotsVerticalIcon />
          </ButtonWrapper>
        }
      />
      <Calendar
        renderArrow={(direction: string) => {
          return (
            <ArrowBox>
              {direction === 'left' ? <LeftArrowIcon /> : <RigthArrow />}
            </ArrowBox>
          );
        }}
        theme={{
          selectedDayBackgroundColor: '#F2F2F2',
          calendarBackground: '#121212',
          textSectionTitleColor: '#F2F2F2',
          dayTextColor: '#F2F2F2',
          selectedDayTextColor: '#121212',
          arrowColor: '#F2F2F2',
          textDisabledColor: '#7F7F7F',
          todayBackgroundColor: 'rgba(255, 255, 255, 0.08)',
          todayTextColor: '#F2F2F2',
          monthTextColor: '#F2F2F2',
        }}
        onDayPress={getTasksId}
        headerStyle={{
          backgroundColor: '#121212',
        }}
        style={{
          backgroundColor: '#121212',
        }}
        markedDates={{
          ...markedDay,
          [selected]: {
            selected: true,
            disableTouchEvent: true,
          },
        }}
      />
      <SectionList
        sections={list}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return (
            <ButtonWrapper
              handle={() => {
                navigation.navigate(Screens.SERVICE_ENTRY, {taskId: item?._id});
              }}>
              <Frame subtractScreenWidth={8}>
                <Flex subtractScreenWidth={32}>
                  <Typography
                    lineHeight={16}
                    size={13}
                    fontWeight={400}
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
                  <Typography
                    lineHeight={16}
                    size={13}
                    fontWeight={400}
                    color="#7F7F7F">
                    {item?.createdBy?.firstName}
                  </Typography>
                </Flex>

                <Flex marginTop={12}>
                  <BrandLogo
                    source={{
                      uri: item?.brand?.avatar?.url,
                    }}
                  />
                  <Box subtractScreenWidth={64}>
                    <Typography
                      marginLeft={12}
                      fontWeight={500}
                      lineHeight={20}
                      size={15}
                      color="#F2F2F2">
                      {item?.brand?.title}
                    </Typography>
                    <Typography
                      marginLeft={12}
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
                  marginTop={4}
                  fontWeight={400}
                  lineHeight={16}
                  size={13}
                  color="#7F7F7F">
                  {item?.description}
                </Typography>

                <CarItem
                  marginTop={12}
                  title={`${item?.car?.mark?.name} ${item?.car?.model?.name} ${item?.car?.year}`}
                />
              </Frame>
            </ButtonWrapper>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <Center>
            <Flex marginTop={16} subtractScreenWidth={32}>
              <Typography
                lineHeight={16}
                size={13}
                fontWeight={400}
                color="#7F7F7F">
                {dateFormatFromISO(title)}
              </Typography>
              <Typography
                lineHeight={16}
                size={13}
                fontWeight={400}
                color="#7F7F7F">
                {list?.at(0)?.data?.length}{' '}
                {getNoun(
                  list?.at(0)?.data?.length,
                  'событие',
                  'события',
                  'событий',
                )}
              </Typography>
            </Flex>
          </Center>
        )}
      />
    </Layout>
  );
};
