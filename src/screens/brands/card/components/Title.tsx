import {Typography} from '@components';
import {CloseModalBox, FlexRow, TitleWrapper, TitleBox} from './style';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {CloseIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';

import Animated from 'react-native-reanimated';
import {getNoun} from '@shared/utils/list';

const AnimatedBox = Animated.createAnimatedComponent(TitleBox);

interface Props {
  handle?: () => void;
  animatedStyle?: any;
  brandId: any;
}

export const Title = ({
  handle,
  animatedStyle,
  brandId,
}: PropsWithChildren<Props>) => {
  return (
    <TitleWrapper>
      <Typography
        fontWeight={600}
        lineHeight={24}
        size={18}
        marginBottom={4}
        color="#F2F2F2">
        {brandId?.title}
      </Typography>
      <AnimatedBox style={animatedStyle}>
        <Typography
          fontWeight={400}
          lineHeight={20}
          size={15}
          color="#7F7F7F">
          {brandId?.type}
        </Typography>
        <FlexRow>
          <StarRatingDisplay
            rating={brandId?.rating}
            starSize={16}
            starStyle={{marginHorizontal: 1}}
            color="#FFD439"
          />
          <Typography
            marginLeft={4}
            fontWeight={400}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            {brandId?.rating?.toFixed(1)}
          </Typography>
          <Typography
            marginLeft={5}
            fontWeight={400}
            lineHeight={20}
            size={15}
            color="#7F7F7F">
            {brandId?.reviewsCount}{' '}
            {getNoun(brandId?.reviewsCount, 'оценка', 'оценки', 'оценок')}
          </Typography>
        </FlexRow>
      </AnimatedBox>
      <CloseModalBox onPress={handle}>
        <CloseIcon width={10} height={10} color="#F2F2F2" />
      </CloseModalBox>
    </TitleWrapper>
  );
};
