import {Flex, Typography} from '@components';
import {
  ScrollViewHorizontal,
  UploadImageBox,
  UploadBox,
  UploadImagePreview,
  UploadImageRemove,
} from './style';
import {CloseIcon, UploadImageIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';

interface Props {
  handle: () => void;
  images: any[];
  uploadedImages?: any[];
  handleRemove: (localIdentifier: string) => void;
  handleRemoveUploadedImage?: (_id: string) => void;
  title?: string;
}

export const UploadImage = ({
  handle,
  images,
  handleRemove,
  uploadedImages,
  handleRemoveUploadedImage,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <>
      {!images.length ? (
        <UploadImagePreview onPress={handle}>
          <Flex justifyContent="center">
            <UploadImageIcon />
            <Typography
              fontWeight={500}
              lineHeight={16}
              marginLeft={8}
              size={13}
              color="#F2F2F2">
              {title ? title : 'Добавить фото'}
            </Typography>
          </Flex>
        </UploadImagePreview>
      ) : (
        <ScrollViewHorizontal>
          <UploadBox onPress={handle}>
            <UploadImageIcon />
          </UploadBox>
          {images.map((item: any, index) => {
            return (
              <UploadImageBox key={index} source={{uri: item.path}}>
                <UploadImageRemove
                  onPress={() => handleRemove(item.localIdentifier)}>
                  <CloseIcon color="#F2F2F2" width={12} height={12} />
                </UploadImageRemove>
              </UploadImageBox>
            );
          })}
          {uploadedImages &&
            uploadedImages.map((item: any, index) => {
              return (
                <UploadImageBox key={index} source={{uri: item.url}}>
                  <UploadImageRemove
                    onPress={() => {
                      if (handleRemoveUploadedImage) {
                        handleRemoveUploadedImage(item?._id);
                      }
                    }}>
                    <CloseIcon color="#F2F2F2" width={12} height={12} />
                  </UploadImageRemove>
                </UploadImageBox>
              );
            })}
        </ScrollViewHorizontal>
      )}
    </>
  );
};
