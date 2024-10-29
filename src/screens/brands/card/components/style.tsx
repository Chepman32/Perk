import styled from 'styled-components/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {PropsWithChildren} from 'react';
import {scale} from 'react-native-size-matters';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

export const Wrapper = styled.View`
  flex: 1;
`;

export const TitleWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  padding-bottom: 16px;
`;

export const TitleBox = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  overflow: hidden;
`;

export const FlexRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 6px;
`;

export const CloseModalBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 0;
  background: rgba(255, 255, 255, 0.08);
  top: 0;
`;

export const AddressWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.08);
  overflow: hidden;
  margin-top: 16px;
`;

interface AddressFlexRowProps {
  paddingTop?: number;
  alignItems?: string;
}

export const AddressFlexRow = styled.View<
  PropsWithChildren<AddressFlexRowProps>
>`
  width: 100%;
  flex-direction: row;
  align-items: ${({alignItems}) => alignItems || 'center'}px;
  justify-content: flex-start;
  padding-top: ${({paddingTop}) => paddingTop || 15}px;
`;

export const AddressIcon = styled.View`
  width: 24px;
`;

export const AddressText = styled.View`
  width: ${({theme}) => theme.screenWidth - 132}px;
`;

export const Schedule = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const GallaryWrapper = styled.View`
  width: 100%;
  height: 260px;
  position: relative;
  overflow: hidden;
`;

export const GalleryList = styled(FlatList).attrs(() => ({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  pagingEnabled: true,
}))`
  background: #1d1d1d;
`;

export const GalleryImage = styled.Image`
  width: ${({theme}) => theme.screenWidth}px;
  height: 100%;
`;

export const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 20px;
  position: absolute;
  bottom: 35px;
  padding-horizontal: 12px;
  width: 100%;
`;

interface ProgressBoxProps {
  element: number;
  active?: boolean;
}

export const ProgressBox = styled.View<PropsWithChildren<ProgressBoxProps>>`
  width: ${({theme, element}) => theme.screenWidth / element - 10}px;
  height: 2px;
  background: ${({active}) =>
    active ? '#F2F2F2' : 'rgba(255, 255, 255, 0.5)'};
`;

export const OptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const OptionBox = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  position: absolute;
  top: 15px;
  right: 12px;
  background: rgba(255, 255, 255, 0.5);
  z-index: 20;
`;

export const BrandBox = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  position: absolute;
  bottom: 55px;
  left: 12px;
  z-index: 20;
  border-width: 1px;
  border-color: rgba(52, 52, 52, 1);
`;

export const MenuWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth}px;
  background: #1d1d1d;
  align-items: center;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.08);
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 10;
  position: absolute;
  bottom: 0;
`;

export const MenuListRow = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ServicesWrapper = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  margin-top: 8px;
`;

interface BoxProps {
  marginLeft?: number;
}

export const ServiceBox = styled.View<PropsWithChildren<BoxProps>>`
  width: 124px;
  background: lime;
  border-radius: 16px;
  background: #1d1d1d;
  padding-vertical: 12px;
  padding-left: 12px;
  padding-right: 8px;
  margin-right: 4px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
`;

export const BoxRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ServiceBoxImage = styled.Image`
  width: 48px;
  height: 48px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.08);
  background: #ccc;
  border-radius: 8px;
`;

export const ServiceBoxCounter = styled.View`
  width: 42px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const PromoCodeWrapper = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  width: ${({theme}) => theme.screenWidth - 32}px;
  height: 140px;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 16px;
`;

export const PromoCodeClose = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  align-items: center;
  justify-content: center;
  top: 9px;
`;

export const NewsWrapper = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  height: 100px;
  margin-top: 16px;
`;

export const NewsBox = styled.ImageBackground<PropsWithChildren<BoxProps>>`
  width: 327px;
  height: 100px;
  background: #1d1d1d;
  border-radius: 16px;
  padding: 12px;
  background: #1d1d1d;
  margin-right: 4px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
`;

export const NewsHeaderBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const NewsHeaderText = styled.View`
  width: 220px;
`;

export const NewsHeaderDate = styled.View`
  width: 59px;
  justify-content: center;
  border-radius: 4px;
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
`;

export const SocialMediaBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${scale(44)}px;
  height: ${scale(44)}px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const TabsNavigationWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  border-bottom-color: rgba(255, 255, 255, 0.08);
  border-bottom-width: 1px;
`;

interface TabsNavigationButtonProps {
  width: number;
}

export const TabsNavigationButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<PropsWithChildren<TabsNavigationButtonProps>>`
  width: ${({width}) => width}%;
  flex-direction: row;
  align-items: center;
  height: 40px;
  justify-content: center;
`;

export const TabsNavigationBorder = styled.View`
  background: #f2f2f2;
  left: 10px;
  right: 10px;
  position: absolute;
  bottom: -1.5px;
  height: 2px;
  border-radius: 2px;
`;

export const TabsNavigationCounter = styled.View`
  padding: 4px;
  margin-left: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
`;

export const DescriptionWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  margin-top: 16px;
`;

export const DescriptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})``;

export const GoodsList = styled.View`
  width: 100%;
  margin-top: 16px;
  background: #1d1d1d;
  border-radius: 16px;
  overflow: hidden;
`;

export const GoodsListTitle = styled.View`
  width: ${({theme}) => theme.screenWidth - 110}px;
`;

export const GoodsListService = styled.View`
  width: 70px;
  align-items: flex-end;
`;

export const GoodsListItem = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.08);
`;

export const ModalHeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const ModalHeaderIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const ModalHeaderTitle = styled.View`
  width: ${({theme}) => theme.screenWidth - 100}px;
`;

export const ReviewRatingWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  background: #1d1d1d;
  padding: 12px;
  border-radius: 16px;
  margin-top: 16px;
`;

export const ReviewRatingRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const ReviewFilterWrapper = styled.View`
  width: ${({theme}) => theme.screenWidth - 32}px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const FilterSortBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PhotoAvaiableBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PhotoAvaiableCheckBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #343434;
  background: rgba(255, 255, 255, 0.08);
`;

export const HandleWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 30px;
  background: #121212;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const DragHandle = styled.View`
  width: 32px;
  height: 4px;
  border-radius: 4px;
  background: rgba(127, 127, 127, 1);
`;

export const ReviewList = styled(BottomSheetFlatList).attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 80,
  },
}))``;
