import {FlatList} from 'react-native-gesture-handler';
import {TabButton, TabsWrapper} from './style';
import {Typography} from '@components';
import {lifehacksTags} from '@shared/data/lifehacksTags';
import {PropsWithChildren, useRef, useState} from 'react';

interface Props {
  handleSelectTag: (value: string) => void;
}

export const Tabs = ({handleSelectTag}: PropsWithChildren<Props>) => {
  const scrollRef = useRef<any>(null);
  const [selected, setSelected] = useState('Все');

  const handle = (value: string, index: number) => {
    setSelected(value);
    scrollRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.2,
    });
    handleSelectTag(value);
  };

  return (
    <TabsWrapper>
      <FlatList
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        data={lifehacksTags}
        contentContainerStyle={{alignItems: 'center'}}
        keyExtractor={(i: any) => String(i)}
        renderItem={({item, index}) => {
          return (
            <TabButton
              active={item == selected}
              onPress={() => handle(item, index)}
              index={index}>
              <Typography
                fontWeight={500}
                lineHeight={16}
                size={13}
                color={item == selected ? '#1D1D1D' : '#F2F2F2'}>
                {item}
              </Typography>
            </TabButton>
          );
        }}
      />
    </TabsWrapper>
  );
};
