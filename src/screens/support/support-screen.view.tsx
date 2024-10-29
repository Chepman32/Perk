import {Layout, Attachment} from '@components';
import {Header, Input, List} from './components';
import {KeyboardAvoidingView} from './components';
import {io} from 'socket.io-client';
import {useAuth} from '@shared/hooks';
import {Base64} from '@shared/utils/Base64';
import {SupportService} from '@services';
import React, {useCallback, useEffect, useState} from 'react';
import {API_SOCKET_URL} from '@env';
import {dateFormatFromISO} from '@shared/utils/date';
import {useFocusEffect} from '@react-navigation/native';
import {useAttachment} from '@shared/hooks/useAttachment';

export const Support: React.FC = ({navigation}: any) => {
  const {jwt} = useAuth();
  const {supportMessage} = SupportService;
  const [messagesList, setMessagesList] = useState([]);
  const [value, setValue] = useState('');
  const {attachments, setAttachments, handleUploadAttach, handleDeleteAttach} =
    useAttachment();

  const socket = io(API_SOCKET_URL, {
    query: {userId: JSON.parse(Base64.atob(jwt.split('.')[1]))?.sub},
  });

  const getSupportMessage = async () => {
    try {
      const response = await supportMessage(jwt);

      if (response) {
        if (response?.items.length !== 0) {
          let temp: any = [];
          response?.items?.map((item: any, index: number) => {
            const prev = dateFormatFromISO(
              response?.items.at(index - 1)?.createdAt,
            );
            const current = dateFormatFromISO(item?.createdAt);

            if (prev !== current) {
              temp.push({...item, messageDate: item?.createdAt});
              return false;
            }
            temp.push(item);
          });

          setMessagesList(temp);
        }
      }
    } catch (error) {}
  };

  const handleSendMessage = () => {
    if (value.trim().length !== 0) {
      setValue('');
      socket.emit('send_support_message', {
        text: value,
        attachments: attachments?.map(el => el.id),
      });
      setAttachments([]);
    }
  };

  const messageListener = () => {
    socket.on('receive_support_message', function (data) {
      setMessagesList((prev): any => [...prev, data]);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getSupportMessage();
    }, []),
  );

  useEffect(() => {
    messageListener();
  }, []);

  return (
    <Layout
      edges={['right', 'left', 'top']}
      statusBarColor="#040404"
      chidlrenBackground="#040404">
      <Header
        title="Поддержка PERK"
        background="#040404"
        avatar={require('@assets/images/chat/supportAvatar.png')}
        handleNavigateBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView>
        <List messagesList={messagesList} />
        <Input
          onChange={value => setValue(value)}
          value={value}
          handleUploadAttach={handleUploadAttach}
          attachmentDisable={
            attachments?.length >= 5 || attachments?.some(el => el.id === null)
          }
          sendMessage={handleSendMessage}
        />
        {!!attachments.length && (
          <Attachment
            attachments={attachments}
            handleDeleteAttach={handleDeleteAttach}
          />
        )}
      </KeyboardAvoidingView>
    </Layout>
  );
};
