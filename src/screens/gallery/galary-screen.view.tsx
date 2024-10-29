import {useCallback, useEffect, useState} from 'react';
import {GalleryImage, GalleryList, NameWrapper} from './style';
import {theme} from '@shared/theme/style';
import {ProgressBar} from './ProgressBar';
import {Layout} from '@components';

export const Gallery: React.FC = ({navigation, route}: any) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(route.params?.images);
  }, []);

  const updateCurrentIndex = useCallback(
    (e: any) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / theme.screenWidth);
      setCurrentSlide(currentIndex);
    },
    [currentSlide],
  );

  return (
    <Layout>
      <ProgressBar
        handle={() => navigation.goBack()}
        length={images.length}
        currect={currentSlide + 1}
      />
      <GalleryList
        data={images}
        onMomentumScrollEnd={updateCurrentIndex}
        keyExtractor={(i: any) => String(i._id)}
        renderItem={({item}: any) => {
          return (
            <GalleryImage
              source={{
                uri: item.url,
              }}
            />
          );
        }}
      />
      {route.params?.isReview && <NameWrapper></NameWrapper>}
    </Layout>
  );
};
