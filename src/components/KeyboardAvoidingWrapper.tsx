import {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
})``;

export const Bottom = styled.View`
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
`;

interface Props {
  children?: any;
  bottom?: any;
}

export const KeyboardAvoidingWrapper = ({
  children,
  bottom,
}: PropsWithChildren<Props>) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? StatusBarManager.HEIGHT + 5 : 0
      }>
      <ScrollView bounces={false}>{children}</ScrollView>
      {bottom && <Bottom>{bottom}</Bottom>}
    </KeyboardAvoidingView>
  );
};
