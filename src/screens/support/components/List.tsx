import {PropsWithChildren, useRef} from 'react';
import {Date} from './Date';
import {MessageItem} from './MessageItem';
import {ListWrapper} from './style';
import {dateMouthYearLetters, getCurrectDate} from '@shared/utils/date';
import {RefreshControl} from 'react-native';

interface Props {
  messagesList: any[];
}

export const List = ({messagesList}: PropsWithChildren<Props>) => {
  const messageListRef = useRef<any>(null);

  const scroll = () => {
    messageListRef.current.scrollToEnd();
  };

  return (
    <>
      <ListWrapper
        data={messagesList}
        refreshControl={<RefreshControl refreshing={false} />}
        contentContainerStyle={{
          paddingTop: 20,
        }}
        ref={messageListRef}
        onContentSizeChange={scroll}
        onLayout={scroll}
        keyExtractor={(i: any) => String(i?._id)}
        renderItem={({item}: any) => {
          return (
            <>
              {item?.messageDate && (
                <Date
                  date={
                    dateMouthYearLetters(item?.messageDate, {
                      day: 'numeric',
                      month: 'long',
                    }) ==
                    dateMouthYearLetters(getCurrectDate(), {
                      day: 'numeric',
                      month: 'long',
                    })
                      ? 'Ceгодня'
                      : dateMouthYearLetters(item?.createdAt, {
                          day: 'numeric',
                          month: 'long',
                        })
                  }
                />
              )}

              <MessageItem item={item} />
            </>
          );
        }}
      />
    </>
  );
};
