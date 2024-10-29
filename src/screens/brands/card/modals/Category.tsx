import {useCallback, forwardRef} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {CategoryItem, ModalHeader} from './components';

export const CategoryModal = forwardRef(({}, ref: any) => {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={1} />,
    [],
  );

  return (
    <BottomSheet
      snapPoints={[0.1, '90%']}
      backdropComponent={renderBackdrop}
      index={-1}
      handleIndicatorStyle={{backgroundColor: '#fff'}}
      backgroundStyle={{backgroundColor: '#1D1D1D'}}
      ref={ref}>
      <ModalHeader title="Категории" />
      <BottomSheetScrollView>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((_, index) => {
          return <CategoryItem key={index} />;
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
