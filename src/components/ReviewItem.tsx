import {Typography} from './Typography';
import {ReviewHeader} from './ReviewHeader';
import {Frame} from './Frame';
import {PropsWithChildren, useState} from 'react';
import {Flex} from './Flex';
import styled from 'styled-components/native';
import {
  CheckIcon,
  ClockIcon,
  DarkListIcon,
  HorizontalDotsIcon,
} from '@assets/svg';
import {Box} from './Box';
import {ButtonWrapper} from './ButtonWrapper';
import {dateFormatFromISO} from '@shared/utils/date';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native';
import {Screens} from '@shared/enums';
import {scale} from 'react-native-size-matters';

const Status = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px 9px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 500px;
`;

interface Props {
  marginTop?: number;
  isBrandReview?: boolean;
  item?: any;
  handle?: () => void;
}

export const ReviewItem = ({
  marginTop,
  isBrandReview,
  item,
  handle,
}: PropsWithChildren<Props>) => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();
  const [loadingImage, setLoadingImage] = useState(false);

  return (
    <Frame subtractScreenWidth={16} marginTop={marginTop}>
      {isBrandReview && (
        <Flex marginBottom={12}>
          {item?.status == 0 && (
            <Status>
              <DarkListIcon width={16} height={16} />
              <Typography
                marginLeft={6}
                fontWeight={500}
                lineHeight={16}
                size={13}
                color="#C53830">
                Не прошел проверку
              </Typography>
            </Status>
          )}
          {item?.status == 1 && (
            <Status>
              <ClockIcon color="#FFD439" />
              <Typography
                marginLeft={6}
                fontWeight={500}
                lineHeight={16}
                size={13}
                color="#FFD439">
                На проверке
              </Typography>
            </Status>
          )}
          {item?.status == 2 && (
            <Status>
              <CheckIcon />
              <Typography
                marginLeft={6}
                fontWeight={500}
                lineHeight={16}
                size={13}
                color="#F2F2F2">
                Опубликован
              </Typography>
            </Status>
          )}

          <Box fixedWidth="140px">
            <Flex justifyContent="flex-end">
              <Typography
                fontWeight={400}
                lineHeight={16}
                marginRight={10}
                size={13}
                color="#7F7F7F">
                {dateFormatFromISO(item?.createdAt)}
              </Typography>
              <ButtonWrapper handle={handle}>
                <HorizontalDotsIcon />
              </ButtonWrapper>
            </Flex>
          </Box>
        </Flex>
      )}

      <ReviewHeader
        createdAt={item?.createdAt}
        title={item?.brand?.title}
        rating={item?.rating}
        image={item?.brand?.avatar?.url}
        address={item?.brand?.address}
      />
      <Typography
        marginTop={12}
        fontWeight={400}
        lineHeight={16}
        size={13}
        color="#7F7F7F">
        Плюсы
      </Typography>
      <Typography
        marginTop={4}
        fontWeight={400}
        lineHeight={16}
        size={13}
        color="#F2F2F2">
        {item?.plus}
      </Typography>
      <Typography
        marginTop={12}
        fontWeight={400}
        lineHeight={16}
        size={13}
        color="#7F7F7F">
        Минусы
      </Typography>
      <Typography
        marginTop={4}
        fontWeight={400}
        lineHeight={16}
        size={13}
        color="#F2F2F2">
        {item?.minus}
      </Typography>
      <Typography
        marginTop={16}
        fontWeight={400}
        lineHeight={16}
        size={13}
        color="#7F7F7F">
        Комментарий
      </Typography>
      <Typography
        marginTop={4}
        fontWeight={400}
        lineHeight={16}
        size={13}
        color="#F2F2F2">
        {item?.comment}
      </Typography>
      {!!item?.attachments?.length && (
        <ReviewItemAttachments>
          {item?.attachments?.map((el: any) => (
            <ReviewItemAttachment
              key={el._id}
              onStartShouldSetResponder={() => true}>
              <ReviewItemAttachmentTouchable
                onPress={() => {
                  if (!loadingImage) {
                    navigate(Screens.GALLERY, {images: [{url: el?.url}]});
                  }
                }}>
                {/* {loadingImage && (
                <ReviewItemAttachmentLoader>
                  <ActivityIndicator size="small" color={'#121212'} />
                </ReviewItemAttachmentLoader>
              )} */}
                <ReviewItemAttachmentImage
                  src={el?.url}
                  onLoadStart={() => setLoadingImage(true)}
                  onLoadEnd={() => setLoadingImage(false)}
                />
              </ReviewItemAttachmentTouchable>
            </ReviewItemAttachment>
          ))}
        </ReviewItemAttachments>
      )}
      {/* <Button
        borderRadius={8}
        marginTop={12}
        fixedWidth={scale(180) + 'px'}
        background="rgba(255, 255, 255, 0.08)"
        height={32}>
        <Typography fontWeight={500} lineHeight={16} size={13} color="#F2F2F2">
          Посмотреть ответ бренда
        </Typography>
      </Button> */}
    </Frame>
  );
};

export const ReviewItemAttachmentsWrapper = styled.View`
  flex: 1;
`;

export const ReviewItemAttachments = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {flexGrow: 1, flex: 1},
})`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 12px 0 0;
  width: 100%;
  flex: 1;
`;

export const ReviewItemAttachment = styled.Pressable`
  width: 72px;
  height: 72px;
  background: #343434;
  border-radius: 8px;
  margin-right: 6px;
  margin-bottom: 6px;
`;

export const ReviewItemAttachmentTouchable = styled.TouchableOpacity``;

export const ReviewItemAttachmentImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const ReviewItemAttachmentLoader = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #343434;
  border-radius: 8px;
`;
