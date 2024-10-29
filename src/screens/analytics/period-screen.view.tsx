import {
  Button,
  DataPicker,
  Header,
  InputSelect,
  KeyboardAvoidingWrapper,
  Layout,
  Typography,
} from '@components';
import {CalendarBorderIcon} from '@assets/svg';
import {Content} from '@assets/styles/globals';
import {useRef, useState} from 'react';
import {useDispatch} from '@store/store';
import {setPeriodSlice} from '@slices';
import {dateFormatFromISO} from '@shared/utils/date';

const TYPE_DATE = {
  start: 'START',
  end: 'END',
};

export const Period: React.FC = ({navigation}: any) => {
  const dispath = useDispatch();
  const dataPickerRef = useRef<any>();
  const typeDate = useRef<any>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const selectDate = (date: any) => {
    if (typeDate.current === TYPE_DATE.start) {
      setStartDate(date);
      return false;
    }
    if (typeDate.current === TYPE_DATE.end) {
      setEndDate(date);
      return false;
    }
  };

  const handleSavePeriod = () => {
    dispath(
      setPeriodSlice({
        startDate: startDate,
        endDate: endDate,
      }),
    );
    navigation.goBack();
  };

  return (
    <Layout>
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Выберете период"
      />
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            onPress={handleSavePeriod}
            disabled={startDate.length == 0 || endDate.length == 0}
            subtractScreenWidth={32}>
            <Typography
              fontWeight={500}
              marginLeft={8}
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Применить
            </Typography>
          </Button>
        }>
        <Content>
          <InputSelect
            rightContent={<CalendarBorderIcon />}
            marginTop={8}
            label="Начало"
            value={dateFormatFromISO(startDate)}
            handle={() => {
              dataPickerRef.current.openDataPicker();
              typeDate.current = TYPE_DATE.start;
            }}
          />
          <InputSelect
            rightContent={<CalendarBorderIcon />}
            marginTop={12}
            label="Конец"
            value={dateFormatFromISO(endDate)}
            handle={() => {
              dataPickerRef.current.openDataPicker();
              typeDate.current = TYPE_DATE.end;
            }}
          />
        </Content>
      </KeyboardAvoidingWrapper>

      <DataPicker setDate={value => selectDate(value)} ref={dataPickerRef} />
    </Layout>
  );
};
