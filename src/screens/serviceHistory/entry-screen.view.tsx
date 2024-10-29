import {
  Attachment,
  Box,
  ButtonWrapper,
  Flex,
  Frame,
  Header,
  Layout,
  Loading,
  Typography,
} from '@components';
import {Name} from './components';
import {AlarmIcon, EditIcon} from '@assets/svg';
import {Wrapper, ScrollVertical} from '@assets/styles/globals';
import {BrandLogo} from './components/style';
import {Screens} from '@shared/enums';
import {dateMouthYearLetters} from '@shared/utils/date';
import {DateTime} from 'luxon';
import {Tasks} from '@services';
import {useCallback, useEffect, useState} from 'react';
import {useAuth} from '@shared/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {reminders} from '@shared/data/reminders';
import {filterRemindersTitle} from '@shared/utils/list';
import {useAttachment} from '@shared/hooks/useAttachment';
import {View} from 'react-native';

export const Entry: React.FC = ({navigation, route}: any) => {
  const {taskId} = Tasks;
  const {jwt} = useAuth();
  const [taskItem, setTaskItem] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const {attachments, handleDeleteAttach, setAttachments, handleImageAttach} =
    useAttachment();

  useEffect(() => {
    if (taskItem?.attachments?.length) {
      setAttachments(
        taskItem?.attachments?.map(
          (el: {url: string; mimetype: string; _id: string}) => ({
            id: el._id,
            file: {
              mime: el.mimetype,
              path: el.url,
            },
          }),
        ),
      );
    }
  }, [taskItem]);

  const getTaskId = async () => {
    try {
      setLoading(true);
      const response = await taskId(jwt, route.params?.taskId);
      if (response) {
        setTaskItem(response);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTaskId();
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title={
          taskItem?.startDate < DateTime.now().toISO()
            ? 'Прошедшая запись'
            : 'Предстоящая запись'
        }
        rightContent={
          <ButtonWrapper
            handle={() =>
              navigation.navigate(Screens.SERVICE_EDIT_RECORD, {item: taskItem})
            }>
            <EditIcon />
          </ButtonWrapper>
        }
      />
      <ScrollVertical>
        <Wrapper>
          <Frame subtractScreenWidth={8}>
            <Flex>
              <Box fixedWidth="60%">
                <Typography
                  fontWeight={400}
                  lineHeight={16}
                  size={13}
                  color="#F2F2F2">
                  {dateMouthYearLetters(taskItem?.startDate, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    minute: '2-digit',
                    hour: '2-digit',
                  })}{' '}
                  - {dateMouthYearLetters(taskItem?.endDate)}
                </Typography>
              </Box>
              <Name name={taskItem?.createdBy?.firstName} />
            </Flex>
            <Typography
              fontWeight={600}
              marginTop={4}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {taskItem?.title}
            </Typography>
          </Frame>

          <Frame marginTop={8} subtractScreenWidth={8}>
            <Flex>
              <BrandLogo
                source={{
                  uri: taskItem?.brand?.avatar?.url,
                }}
              />
              <Box subtractScreenWidth={70}>
                <Typography
                  fontWeight={500}
                  lineHeight={20}
                  size={15}
                  color="#F2F2F2">
                  {taskItem?.brand?.title}
                </Typography>
                <Typography
                  fontWeight={400}
                  lineHeight={16}
                  size={13}
                  color="#7F7F7F">
                  {taskItem?.brand?.address}
                </Typography>
              </Box>
            </Flex>
          </Frame>

          <Frame marginTop={8} subtractScreenWidth={8}>
            <Flex marginTop={4} marginBottom={4}>
              {/* <Box fixedWidth={'24px'}>
                <CarIcon
                  source={require('@assets/images/temp/Volkswagen.png')}
                />
              </Box> */}
              <Box subtractScreenWidth={60}>
                <Typography
                  fontWeight={400}
                  lineHeight={16}
                  size={13}
                  color="#F2F2F2">
                  {taskItem?.car?.mark?.name} {taskItem?.car?.model?.name}{' '}
                  {taskItem?.car?.year}
                </Typography>
              </Box>
            </Flex>
          </Frame>

          {taskItem?.description?.trim() && (
            <Frame marginTop={8} subtractScreenWidth={8}>
              <Typography
                fontWeight={400}
                lineHeight={16}
                size={11}
                color="#7F7F7F">
                Комментарий
              </Typography>
              <Typography
                fontWeight={400}
                marginTop={2}
                lineHeight={20}
                size={15}
                color="#F2F2F2">
                {taskItem?.description}
              </Typography>
            </Frame>
          )}

          <Frame marginTop={8} subtractScreenWidth={8}>
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={11}
              color="#7F7F7F">
              Стоимость
            </Typography>
            <Typography
              fontWeight={400}
              marginTop={2}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {taskItem?.price} ₽
            </Typography>
          </Frame>

          {attachments.length !== 0 && (
            <Frame marginTop={8} subtractScreenWidth={8}>
              <View style={{marginLeft: -8}}>
                <Attachment
                  scale
                  editable={false}
                  type={'image'}
                  setAttachments={setAttachments}
                  attachments={attachments}
                  handleDeleteAttach={handleDeleteAttach}
                  handleImageAttach={handleImageAttach}
                />
              </View>
            </Frame>
          )}
          {Object.values(taskItem).length !== 0 &&
            taskItem?.reminders.length !== 0 &&
            taskItem.reminders
              ?.filter((el: any) => !!el.fireDiffInMinutes)
              .map((item: any, index: number) => {
                return (
                  <Frame key={index} marginTop={8} subtractScreenWidth={8}>
                    <Flex marginTop={4} marginBottom={4}>
                      <Box fixedWidth={'24px'}>
                        <AlarmIcon />
                      </Box>
                      <Box subtractScreenWidth={64}>
                        <Typography
                          fontWeight={400}
                          lineHeight={16}
                          size={13}
                          color="#F2F2F2">
                          {filterRemindersTitle(
                            reminders,
                            item.fireDiffInMinutes,
                          )}
                        </Typography>
                      </Box>
                    </Flex>
                  </Frame>
                );
              })}
        </Wrapper>
      </ScrollVertical>
    </Layout>
  );
};
