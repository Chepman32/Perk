import {PropsWithChildren, ReactNode} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Wrapper = styled.View<PropsWithChildren<Props>>`
  flex: 2;
  background: ${({chidlrenBackground}) => chidlrenBackground || '#121212'};
`;

interface Props {
  children?: ReactNode;
  statusBarColor?: string;
  chidlrenBackground?: string;
  edges?: any[];
}

export const Layout = ({
  children,
  statusBarColor,
  chidlrenBackground,
  edges,
}: PropsWithChildren<Props>) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: statusBarColor ? statusBarColor : '#121212',
      }}
      edges={edges ? edges : ['right', 'bottom', 'left', 'top']}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={statusBarColor ? statusBarColor : '#121212'}
      />
      <Wrapper chidlrenBackground={chidlrenBackground}>{children}</Wrapper>
    </SafeAreaView>
  );
};
