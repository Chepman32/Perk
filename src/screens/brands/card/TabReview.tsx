import {Center} from '@assets/styles/globals';
import {ReviewFilter, ReviewRating} from './components';
import {ReviewItem} from '@components';
import {PropsWithChildren} from 'react';
import {ReviewList} from './components/style';

interface Props {
  reviewsId: any;
  brandIdItem?: any;
}

export const TabReview = ({
  reviewsId,
  brandIdItem,
}: PropsWithChildren<Props>) => {
  return (
    <ReviewList
      data={reviewsId?.items}
      ListHeaderComponent={
        <Center>
          <ReviewRating
            rating={brandIdItem?.rating}
            reviewsCount={brandIdItem?.reviewsCount}
          />
          {/* <ReviewFilter /> */}
        </Center>
      }
      renderItem={({item}: any) => {
        return <ReviewItem item={item} />;
      }}
    />
  );
};
