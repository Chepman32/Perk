import {DotsVerticalIcon} from '@assets/svg';
import {PropsWithChildren, useCallback, useState} from 'react';
import {theme} from '@shared/theme/style';
import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {Loading, StubImage} from '@components';
import {Name} from '@screens/serviceHistory/components';

const GallaryWrapper = styled.View`
  width: 100%;
  height: 35%;
  overflow: hidden;
`;

const ImageLoaderWrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  background: #040404;
`;

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})``;

const GalleryList = styled(FlatList).attrs(() => ({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  pagingEnabled: true,
}))`
  background: #1d1d1d;
`;

const GalleryImage = styled.Image`
  width: ${({theme}) => theme.screenWidth}px;
  height: 100%;
`;

const BrandBox = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  position: absolute;
  bottom: 45px;
  left: 12px;
  z-index: 20;
  border-width: 1px;
  border-color: rgba(52, 52, 52, 1);
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 20px;
  position: absolute;
  bottom: 20px;
  padding-horizontal: 12px;
  width: 100%;
`;

interface ProgressBoxProps {
  element: number;
  active?: boolean;
}

const ProgressBox = styled.View<PropsWithChildren<ProgressBoxProps>>`
  width: ${({theme, element}) => theme.screenWidth / element - 10}px;
  height: 2px;
  background: ${({active}) =>
    active ? '#F2F2F2' : 'rgba(255, 255, 255, 0.5)'};
`;

const OptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const OptionBox = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  position: absolute;
  top: 20px;
  right: 12px;
  background: #f2f2f2;
  z-index: 20;
`;

const NameBox = styled.View`
  border-radius: 40px;
  position: absolute;
  bottom: 45px;
  left: 12px;
  z-index: 20;
`;

interface Props {
  images?: [];
  showBrand?: boolean;
  handleOption?: () => void;
  avatar?: string;
  owner?: any;
}

export const Gallery = ({
  images,
  showBrand,
  handleOption,
  avatar,
  owner,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loadingImage, setLoadingImage] = useState(false);

  const updateCurrentIndex = useCallback(
    (e: any) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / theme.screenWidth);
      setCurrentSlide(currentIndex);
    },
    [currentSlide],
  );

  return (
    <GallaryWrapper>
      <OptionBox>
        <OptionButton onPress={handleOption}>
          <DotsVerticalIcon color="#121212" />
        </OptionButton>
      </OptionBox>

      {images?.length === 0 ? (
        <StubImage />
      ) : (
        <>
          <GalleryList
            data={images}
            onMomentumScrollEnd={updateCurrentIndex}
            keyExtractor={(i: any) => String(i._id)}
            renderItem={({item}: any) => {
              return (
                <Button
                  onPress={() =>
                    navigation.navigate(Screens.GALLERY, {images})
                  }>
                  {loadingImage && (
                    <ImageLoaderWrapper>
                      <Loading loadingWidth={30} loadingHeight={30} />
                    </ImageLoaderWrapper>
                  )}
                  <GalleryImage
                    onLoadStart={() => setLoadingImage(true)}
                    onLoadEnd={() => setLoadingImage(false)}
                    source={{
                      uri: item?.url,
                    }}
                  />
                </Button>
              );
            }}
          />
          {owner?.isUserOwner == false && (
            <NameBox>
              <Name
                name={owner?.firstName}
                background="rgba(29, 29, 29, 0.75)"
              />
            </NameBox>
          )}

          {images && images.length > 1 && (
            <ProgressContainer>
              {images.map((_, key) => (
                <ProgressBox
                  key={key}
                  active={currentSlide == key}
                  element={images.length}
                />
              ))}
            </ProgressContainer>
          )}
        </>
      )}

      {showBrand && (
        <BrandBox
          source={{
            uri: avatar,
          }}
        />
      )}
    </GallaryWrapper>
  );
};
