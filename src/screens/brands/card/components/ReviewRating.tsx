import {Typography} from '@components';
import {ReviewRatingRow, ReviewRatingWrapper} from './style';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {PropsWithChildren} from 'react';

interface Props {
  reviewsCount?: number;
  rating?: number;
}

export const ReviewRating = ({
  reviewsCount,
  rating,
}: PropsWithChildren<Props>) => {
  return (
    <ReviewRatingWrapper>
      <ReviewRatingRow>
        <StarRatingDisplay
          rating={rating ? rating : 0}
          starSize={24}
          starStyle={{marginHorizontal: 1}}
          color="#FFD439"
        />
        <Typography
          fontWeight={600}
          marginLeft={8}
          lineHeight={24}
          align="center"
          size={18}
          color="#F2F2F2">
          {rating?.toFixed(1)} / 5
        </Typography>
      </ReviewRatingRow>
      <Typography
        fontWeight={400}
        lineHeight={16}
        marginTop={4}
        size={13}
        color="#7F7F7F">
        на основании {reviewsCount} оценок
      </Typography>
    </ReviewRatingWrapper>
  );
};
