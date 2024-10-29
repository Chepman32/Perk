import {Platform} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ListWrapper = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 2;
  background: #040404;
`;

export const MessageItemRigthWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
  padding-right: 20px;
`;

export const MessageItemRigthBox = styled.View`
  width: ${({theme}) => theme.screenWidth - scale(115)}px;
  background: #f2f2f2;
  border-radius: ${scale(16)}px;
`;

export const MessageItemAttachments = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 8px 0;
`;

export const MessageItemAttachment = styled.View`
  width: 72px;
  height: 72px;
  background: #343434;
  border-radius: 8px;
  margin-right: 6px;
  margin-bottom: 6px;
`;

export const MessageItemAttachmentTouchable = styled.TouchableOpacity``;

export const MessageItemAttachmentImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const MessageItemAttachmentFile = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  align-items: center;
  padding: 21px 2px 3px;
  justify-content: space-between;
`;

export const MessageItemTextBox = styled.View`
  width: 100%;
  padding: 8px 12px 0px 12px;
`;

export const MessageItemAttachmentLoader = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #343434;
  border-radius: 8px;
`;

export const MessageItemRigthStatus = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
`;

export const MessageItemLeftVector = styled.Image`
  width: 17px;
  height: 21px;
  margin-right: -5px;
`;

export const MessageItemLeftWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 20px;
  padding-left: 20px;
`;

export const MessageItemLeftAvatar = styled.Image`
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  border-radius: ${scale(30)}px;
  border-width: 1px;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.11);
  margin-right: 5px;
`;

export const MessageItemLeftBox = styled.View`
  width: ${({theme}) => theme.screenWidth - scale(115)}px;
  background: #1d1d1d;
  border-radius: ${scale(16)}px;
`;

export const MessageItemLeftStatus = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const MessageItemRightVector = styled.Image`
  width: 17px;
  height: 21px;
  margin-left: -5px;
`;

export const DateWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const DateBox = styled.View`
  background: rgba(52, 52, 52, 1);
  padding: 3px 10px;
  border-radius: 10px;
`;

export const InputWrapper = styled.View`
  width: 100%;
  align-items: center;
  background: #121212;
  padding-vertical: 12px;
`;

export const InputBox = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #252525;
  padding: 0 14px;
  border-radius: 12px;
  overflow: hidden;
`;

export const InputForm = styled.TextInput.attrs({
  multiline: true,
  underlineColorAndroid: 'transparent',
  textAlignVertical: 'top',
  cursorColor: '#f2f2f2',
  selectionColor: '#f2f2f2',
  placeholderTextColor: 'rgba(127, 127, 127, 1)',
})`
  width: ${({theme}) => theme.screenWidth - 105}px;
  max-height: 70px;
  min-height: 35px;
  font-size: 17px;
  color: #f2f2f2;
  font-weight: 400;
  margin-bottom: -2px;
  margin-top: 2px;
  padding-left: 10px;
`;

export const InputIconBox = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const InputIconButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{disabled?: boolean}>`
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

export const KeyboardAvoidingViewChat = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
`;
