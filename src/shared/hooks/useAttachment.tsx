import {useState} from 'react';
import {pick} from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {Attachments} from 'src/services/attachments';
import {useAuth} from './useAuth';
import {imagePickerGetName} from '@shared/utils/list';

export const useAttachment = () => {
  const {jwt} = useAuth();

  const [attachments, setAttachments] = useState<
    {id: string | null; file: any}[]
  >([]);

  const uploadAttach = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('attachment', {
        type: file?.type || file?.mime,
        uri: file?.uri || file?.path,
        name: file.name || imagePickerGetName(file?.path),
      });

      const response = await Attachments.uploadAttachment(jwt, formData);

      if (response) {
        if (attachments?.length < 5) {
          setAttachments((prev: string | any[]) => [
            ...prev.slice(0, prev.length - 1),
            {id: response._id, file},
          ]);
        }
      }
    } catch (error) {}
  };

  const handleImageAttach = async () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'photo',
        maxFiles: 3,
      }).then(image => {
        setAttachments?.((prev: string | any[]) => {
          return [...prev, {id: null, file: {}}];
        });
        uploadAttach(image);
      });
    } catch (error) {}
  };

  const handleUploadAttach = async () => {
    const [pickResult] = await pick();
    setAttachments((prev: string | any[]) => {
      return [...prev, {id: null, file: {}}];
    });

    uploadAttach(pickResult);
  };

  const handleDeleteAttach = async (id: string) => {
    setAttachments((prev: any[]) => prev.filter(el => el.id !== id));
    const response = await Attachments.deleteAttachment(jwt, id);
  };
  return {
    attachments,
    setAttachments,
    uploadAttach,
    handleImageAttach,
    handleUploadAttach,
    handleDeleteAttach,
  };
};
