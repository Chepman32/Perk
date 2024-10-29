import {Key} from 'react';
import {ActivityIndicator} from 'react-native';
import {styled} from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';

import {Typography} from './Typography';
import {AttachmentFileIcon} from '@assets/svg/AttachmentFile';
import {CloseIcon} from '@assets/svg';
import {ImageIcon} from '@assets/svg/Image';
import {Attachments} from '@services';

type AttachmentProps = {
  type?: 'image' | 'file';
  scale?: boolean;
  attachments: {id: string | null; file: any}[];
  setAttachments?: (attachments: any) => void;
  handleDeleteAttach?: (id: string) => void;
  handleImageAttach?: () => void;
  editable?: boolean;
};

export const Attachment: React.FC<AttachmentProps> = ({
  type,
  attachments,
  handleDeleteAttach,
  handleImageAttach,
  editable = true,
}) => {
  return (
    <AttachmentsWrapper>
      {type === 'image' && editable && (
        <AttachImage
          scale={scale}
          disabled={attachments?.length >= 5 || attachments.some(el => !el.id)}
          onPress={handleImageAttach}>
          <ImageIcon
            width={scale ? scale(24) : 24}
            height={scale ? scale(24) : 24}
          />
        </AttachImage>
      )}
      {attachments?.map(
        (attachment: {
          id: Key | null | undefined;
          file: {
            mime: string;
            path: string | undefined;
            type: string | string[];
            uri: string | undefined;
            name: string;
          };
        }) => (
          <AttachmentItem key={attachment.id} scale={scale}>
            {!attachment?.id ? (
              <AttachmentLoader>
                <ActivityIndicator size="small" color={'#121212'} />
              </AttachmentLoader>
            ) : !!attachment?.file?.type?.includes('image') ||
              !!attachment?.file?.mime?.includes('image') ? (
              <AttachmentImage
                src={attachment?.file?.uri || attachment?.file?.path}
              />
            ) : (
              <AttachmentFile>
                <AttachmentFileIcon />
                <Typography
                  size={11}
                  lineHeight={16}
                  numberOfLines={1}
                  color="#808080">
                  {attachment?.file?.name}
                </Typography>
              </AttachmentFile>
            )}
            {!!attachment?.id && handleDeleteAttach && editable && (
              <AttachmentsDelete
                onPress={() => {
                  if (attachment?.id) {
                    handleDeleteAttach?.(attachment?.id as string);
                  }
                }}>
                <CloseIcon color="#ebebeb" width={10} height={10} />
              </AttachmentsDelete>
            )}
          </AttachmentItem>
        ),
      )}
    </AttachmentsWrapper>
  );
};

export const AttachmentsWrapper = styled.View`
  flex-direction: row;
  padding: 8px;
  flex-wrap: wrap;
`;

export const AttachmentItem = styled.View<any>`
  width: ${({scale}: any) => (scale ? scale(72) : 72)}px;
  height: ${({scale}: any) => (scale ? scale(72) : 72)}px;
  background: #343434;
  border-radius: ${({scale}: any) => (scale ? scale(8) : 8)}px;
  margin-right: 6px;
  margin-bottom: 6px;
`;

export const AttachmentImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const AttachmentFile = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  align-items: center;
  padding: 21px 2px 3px;
  justify-content: space-between;
`;

export const AttachmentLoader = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const AttachmentsDelete = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #232323;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4px;
  right: 4px;
`;

export const AttachImage = styled.TouchableOpacity<{
  marginTop?: number;
  marginBottom?: number;
  disabled?: boolean;
  scale?: any;
}>`
  width: ${({scale}: any) => (scale ? scale(72) : 72)}px;
  height: ${({scale}: any) => (scale ? scale(72) : 72)}px;
  border-radius: ${({scale}: any) => (scale ? scale(8) : 8)}px;
  background: #202020;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;
