import {useCallback, forwardRef, PropsWithChildren} from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {ModalHeader} from './components';
import {ScheduleListItem} from './components/style';
import {Typography} from '@components';
import {daysItem} from '@shared/utils/list';

interface Props {
  schedule?: any[];
}

export const ScheduleModal = forwardRef(
  ({schedule}: PropsWithChildren<Props>, ref: any) => {
    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={1} />,
      [],
    );

    return (
      <BottomSheet
        snapPoints={[0.1, 455]}
        backdropComponent={renderBackdrop}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={ref}>
        <ModalHeader
          handleClose={() => ref.current?.close()}
          title="Режим работы"
        />
        <BottomSheetView>
          {schedule?.map((item, index) => {
            return (
              <ScheduleListItem key={index}>
                <Typography
                  lineHeight={20}
                  size={15}
                  fontWeight={400}
                  color="#F2F2F2">
                  {daysItem(item?.day)}
                </Typography>
                <Typography
                  lineHeight={20}
                  size={15}
                  fontWeight={400}
                  color="#7F7F7F">
                  {item?.openAt}-{item?.closeAt}
                </Typography>
              </ScheduleListItem>
            );
          })}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
