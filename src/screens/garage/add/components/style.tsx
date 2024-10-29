import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const UploadImagePreview = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth - 32}px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  align-items: center;
  justify-content: center;
`;

export const CheckBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.08);
  border-color: #343434;
  border-radius: 4px;
  border-width: 1px;
`;

export const UploadBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 72px;
  height: 72px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

export const ScrollViewHorizontal = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
`;

export const UploadImageBox = styled.ImageBackground.attrs({
  imageStyle: {
    borderRadius: 16,
  },
})`
  width: 96px;
  height: 72px;
  margin-left: 6px;
`;

export const UploadImageRemove = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(29, 29, 29, 0.75);
  right: 6px;
  top: 6px;
  position: absolute;
`;
