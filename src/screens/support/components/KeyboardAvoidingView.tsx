import {PropsWithChildren, ReactNode, useEffect} from 'react';
import {KeyboardAvoidingViewChat} from './style';
import {NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;

interface Props {
  children?: ReactNode;
}

export const KeyboardAvoidingView = ({children}: PropsWithChildren<Props>) => {
  return (
    <KeyboardAvoidingViewChat
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? StatusBarManager.HEIGHT + 5 : 0
      }>
      {children}
    </KeyboardAvoidingViewChat>
  );
};
