import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {scale, moderateScale} from 'react-native-size-matters';

export const SearchCategoryWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth}px;
  align-items: center;
  background: #1d1d1d;
  padding-bottom: 8px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const NotificationCounterBox = styled.View`
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: rgba(255, 212, 57, 1);
  position: absolute;
  z-index: 1;
  top: 7.5px;
  right: 7.5px;
`;

export const CategoryBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${({theme}) => theme.screenWidth / 4 - 10}px;
  height: ${scale(72)}px;
  border-radius: ${scale(10)}px;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
`;

export const CategoryText = styled.View`
  width: 100%;
  position: absolute;
  bottom: 8px;
`;

export const CategoryImage = styled.Image`
  width: ${scale(65)}px;
  height: ${scale(55)}px;
`;

export const RatesWrapper = styled.View<any>`
  background: ${({hasManager, level}) => {
    if (hasManager) {
      if (level === 1) {
        return '#1d1d1d';
      }
      if (level === 2) {
        return '#343434';
      }
      if (level === 3) {
        return '#2c2717';
      }
    }
    return '#1d1d1d';
  }};
  width: ${({theme}) => theme.screenWidth - 16}px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 16px;
  border-width: ${({hasManager}) => (hasManager ? '1px' : '0px')};
  border-color: #444444;
`;

export const ContactsWrapper = styled.ImageBackground.attrs({
  imageStyle: {
    width: '38%',
    height: '100%',
  },
})``;

export const ContactsLevelBox = styled.View`
  background: rgba(255, 255, 255, 0.11);
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
`;

export const GarageWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  width: ${({theme}) => theme.screenWidth - 16}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  background: #1d1d1d;
  padding: 16px;
  height: ${scale(56)}px;
  border-radius: 16px;
`;

export const ServiceWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 16}px;
  margin-top: 12px;
  background: #1d1d1d;
  padding: ${moderateScale(12)}px;
  border-radius: 16px;
`;

export const ServiceItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.08);
  padding: 12px;
  border-radius: 16px;
`;

export const ServiceItemImage = styled.Image`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.15);
`;

export const LifehacksWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 16}px;
  margin-top: 12px;
  background: #1d1d1d;
  border-radius: 16px;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
`;

export const LifehacksSlider = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
`;

export const LifehacksItemBox = styled.View`
  width: ${({theme}) => theme.screenWidth - 60}px;
  margin-left: 12px;
`;

export const LifehacksItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  margin-top: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  height: ${scale(72)}px;
`;

export const LifehacksItemImage = styled.Image`
  width: ${scale(56)}px;
  height: ${scale(56)}px;
  border-radius: 8px;
  background: #ccc;
`;
