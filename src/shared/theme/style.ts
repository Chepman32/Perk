import {DefaultTheme} from '../interface/style';
import {Dimensions} from 'react-native';

export const theme: DefaultTheme = {
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};
