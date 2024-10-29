import {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {Platform} from 'react-native';
import {DateTime} from 'luxon';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Flex} from './Flex';
import {Button} from './Button';
import {Typography} from './Typography';
import {Center, Content} from '@assets/styles/globals';
import {dateFormatFromISO, dateMouthYearLetters} from '@shared/utils/date';

interface Props {
  setDate: (value: string) => void;
  minimumDate?: string;
  selectedDate?: string;
  mode?: string;
}

type Ref = any;

export const TimePicker = forwardRef<Ref, Props>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [datePickerValue, setDatePickerValue] = useState<any>(
    props.selectedDate
      ? DateTime.fromISO(props.selectedDate).toJSDate()
      : new Date(1598051730000),
  );

  useImperativeHandle(
    ref,
    () => ({
      openDataPicker() {
        if (Platform.OS == 'android') {
          DateTimePickerAndroid.open({
            value: datePickerValue,
            onChange(e, selectedDate: any) {
              if (e.type == 'set') {
                setDatePickerValue(selectedDate);

                props.setDate(dateFormatFromISO(selectedDate, 'HH:mm'));
              }
            },
            mode: 'time',
            is24Hour: true,
          });
          return false;
        }
        bottomSheetRef.current?.snapToIndex(1);
      },
    }),
    [datePickerValue, props.mode],
  );

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  );

  const handleSelectDate = () => {
    props.setDate(dateFormatFromISO(datePickerValue, 'hh:mm'));
    bottomSheetRef.current?.close();
  };

  if (Platform.OS == 'android') {
    return null;
  }

  return (
    <BottomSheet
      snapPoints={[0.1, 340]}
      index={-1}
      handleIndicatorStyle={{backgroundColor: '#fff'}}
      backdropComponent={renderBackdrop}
      backgroundStyle={{backgroundColor: '#1D1D1D'}}
      ref={bottomSheetRef}>
      <Typography
        align="center"
        marginTop={8}
        fontWeight={600}
        lineHeight={24}
        size={18}
        color="#F2F2F2">
        {dateMouthYearLetters(DateTime.now().toISO())}
      </Typography>

      <DateTimePicker
        testID="dateTimePicker"
        value={datePickerValue}
        mode={'time'}
        display="spinner"
        style={{marginTop: 5}}
        textColor="#fff"
        is24Hour={true}
        onChange={(e, selectedDate) => setDatePickerValue(selectedDate)}
      />

      <Center>
        <Content>
          <Flex>
            <Button
              height={44}
              background="rgba(255, 255, 255, 0.11)"
              onPress={() => bottomSheetRef.current?.close()}
              fixedWidth={'49%'}>
              <Typography
                fontWeight={500}
                lineHeight={16}
                size={13}
                color="#F2F2F2">
                Отмена
              </Typography>
            </Button>
            <Button
              height={44}
              fixedWidth={'49%'}
              onPress={handleSelectDate}
              background="rgba(242, 242, 242, 1)">
              <Typography
                fontWeight={500}
                lineHeight={16}
                size={13}
                color="#1D1D1D">
                Применить
              </Typography>
            </Button>
          </Flex>
        </Content>
      </Center>
    </BottomSheet>
  );
});
