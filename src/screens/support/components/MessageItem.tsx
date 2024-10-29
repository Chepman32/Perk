import {Typography} from '@components';
import {
  MessageItemLeftAvatar,
  MessageItemLeftBox,
  MessageItemLeftStatus,
  MessageItemLeftWrapper,
  MessageItemRigthBox,
  MessageItemRigthStatus,
  MessageItemRigthWrapper,
  MessageItemTextBox,
  MessageItemLeftVector,
  MessageItemRightVector,
  MessageItemAttachments,
  MessageItemAttachment,
  MessageItemAttachmentImage,
  MessageItemAttachmentFile,
  MessageItemAttachmentTouchable,
  MessageItemAttachmentLoader,
} from './style';
import {ChatCheckIcon} from '@assets/svg';
import {PropsWithChildren, useState} from 'react';
import {dateMouthYearLetters} from '@shared/utils/date';
import {AttachmentFileIcon} from '@assets/svg/AttachmentFile';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Screens} from '@shared/enums';
import {ActivityIndicator} from 'react-native';

interface Props {
  item: any;
}

export const MessageItem = ({item}: PropsWithChildren<Props>) => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();
  const [loadingImage, setLoadingImage] = useState(false);

  if (item?.hasOwnProperty('manager')) {
    return (
      <MessageItemLeftWrapper>
        <MessageItemLeftAvatar
          source={require('@assets/images/chat/supportAvatar.png')}
        />
        <MessageItemLeftBox>
          <MessageItemTextBox>
            <Typography
              fontWeight={400}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {item?.text}
            </Typography>
          </MessageItemTextBox>
          <MessageItemLeftStatus>
            <MessageItemRightVector
              source={require('@assets/images/chat/chatRight.png')}
            />
            <Typography
              fontWeight={400}
              marginRight={10}
              lineHeight={16}
              size={11}
              color="#7F7F7F">
              {dateMouthYearLetters(item?.createdAt, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </MessageItemLeftStatus>
        </MessageItemLeftBox>
      </MessageItemLeftWrapper>
    );
  }
  return (
    <MessageItemRigthWrapper>
      <MessageItemRigthBox>
        <MessageItemTextBox>
          <Typography
            fontWeight={400}
            lineHeight={20}
            size={15}
            color="#121212">
            {item?.text}
          </Typography>
        </MessageItemTextBox>

        {!!item?.attachments?.length && (
          <MessageItemAttachments>
            {item?.attachments?.map((el: any) => (
              <MessageItemAttachment key={el._id}>
                {!!el?.mimetype?.includes('image') ? (
                  <MessageItemAttachmentTouchable
                    onPress={() => {
                      if (!loadingImage) {
                        navigate(Screens.GALLERY, {images: [{url: el?.url}]});
                      }
                    }}>
                    {loadingImage && (
                      <MessageItemAttachmentLoader>
                        <ActivityIndicator size="small" color={'#121212'} />
                      </MessageItemAttachmentLoader>
                    )}
                    <MessageItemAttachmentImage
                      src={el?.url}
                      onLoadStart={() => setLoadingImage(true)}
                      onLoadEnd={() => setLoadingImage(false)}
                    />
                  </MessageItemAttachmentTouchable>
                ) : (
                  <MessageItemAttachmentFile>
                    <AttachmentFileIcon />
                    <Typography
                      size={11}
                      lineHeight={16}
                      numberOfLines={1}
                      color="#808080">
                      {el?.filename}
                    </Typography>
                  </MessageItemAttachmentFile>
                )}
              </MessageItemAttachment>
            ))}
          </MessageItemAttachments>
        )}

        <MessageItemRigthStatus>
          <Typography
            fontWeight={400}
            marginRight={10}
            lineHeight={16}
            size={11}
            color="#7F7F7F">
            {dateMouthYearLetters(item?.createdAt, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
          <ChatCheckIcon />
          <MessageItemLeftVector
            source={require('@assets/images/chat/chatLeft.png')}
          />
        </MessageItemRigthStatus>
      </MessageItemRigthBox>
    </MessageItemRigthWrapper>
  );
};
