import {Header, InputSelect, Layout} from '@components';
import {CalendarBorderIcon, DownIcon} from '@assets/svg';
import {Content, ScrollVertical, Wrapper} from '@assets/styles/globals';
import {Pie, PieList} from './components';
import {Screens} from '@shared/enums';
import {useAuth} from '@shared/hooks';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Analitics, Cars} from '@services';
import {getRandomColor} from '@shared/utils/list';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {ModalChildrenCar, ModalHeader} from '@screens/filter/components';
import {analyticsPeriodList} from '@shared/data/analyticsPeriod';
import {dateFormatPeriodDate, periodDate} from '@shared/utils/date';
import {useSelector} from '@store/store';
import {getAnalyticsSlice} from '@slices';
import {FlatList} from 'react-native-gesture-handler';

const bottomSheetStyle = {
  bottomSheet: {backgroundColor: '#1D1D1D'},
  indicatorStyle: {backgroundColor: '#fff'},
};

export const Analytics: React.FC = ({navigation}: any) => {
  const {jwt} = useAuth();
  const {periodState} = useSelector(getAnalyticsSlice);
  const carRef = useRef<BottomSheet>(null);
  const periodRef = useRef<BottomSheet>(null);
  const {getAnalitics} = Analitics;
  const {cars} = Cars;
  const [list, setList] = useState<any>([]);
  const [totalList, setTotalList] = useState<any>([]);
  const [colorsList, setColorsList] = useState<any>([]);
  const [marksList, setMarksList] = useState<any>([]);
  const [period, setPeriod] = useState<any>({
    startDate: '',
    endDate: '',
  });
  const [selectedMark, setSelectedMark] = useState<any>({});

  const getAnaliticsList = async () => {
    const response = await getAnalitics(
      jwt,
      period?.startDate,
      period?.endDate,
      selectedMark?._id,
    );

    if (response) {
      setList(response);
      setTotalList([]);
      setColorsList([]);
      setTotalList(tasksTotal(response?.tasks)?.resultTotal);
      setColorsList(tasksTotal(response?.tasks)?.colorsTotal);
    }
  };

  const tasksTotal = (tasks: any) => {
    const resultTotal = tasks?.reduce((r: any, s: any) => {
      r.push(s.total);
      return r;
    }, []);
    const colorsTotal = tasks?.reduce((r: any, s: any) => {
      r.push(getRandomColor());
      return r;
    }, []);

    return {
      resultTotal,
      colorsTotal,
    };
  };

  const getMarks = async () => {
    try {
      const response = await cars(jwt);

      if (response) {
        setMarksList([
          {
            name: 'Все',
          },
          ...response,
        ]);
      }
    } catch (error) {}
  };

  const handleSelectPeriod = (item: any) => {
    periodRef.current?.close();
    if (item.hasOwnProperty('period')) {
      setPeriod({
        startDate: item?.period ? periodDate(item?.period) : '',
        endDate: item?.period ? periodDate() : '',
        _id: item?._id,
      });
    } else {
      navigation.navigate(Screens.ANALYTICS_PERIOD);
    }
  };

  const handleSelectCar = (car: any) => {
    setSelectedMark(car);
    carRef.current?.close();
  };

  useEffect(() => {
    getMarks();
  }, []);

  useEffect(() => {
    getAnaliticsList();
  }, [period, selectedMark]);

  useEffect(() => {
    if (periodState) {
      setPeriod({
        startDate: periodState?.startDate,
        endDate: periodState?.endDate,
        _id: '',
      });
    }
  }, [periodState]);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  );

  return (
    <Layout>
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Аналитика"
      />
      <ScrollVertical>
        <Wrapper>
          <Content>
            <InputSelect
              rightContent={<CalendarBorderIcon />}
              marginTop={8}
              handle={() => periodRef.current?.snapToIndex(1)}
              label="Период"
              value={
                period?.startDate
                  ? `${dateFormatPeriodDate(
                      period?.startDate,
                    )} - ${dateFormatPeriodDate(period?.endDate)}`
                  : 'Весь период'
              }
            />
            <InputSelect
              rightContent={<DownIcon />}
              label="Автомобиль"
              handle={() => carRef.current?.snapToIndex(1)}
              marginTop={12}
              value={selectedMark?.mark?.name || 'Все'}
            />
          </Content>
          <Pie
            colorsList={colorsList}
            totalList={totalList}
            total={list?.total}
          />
          {list.length !== 0 &&
            list.tasks.map((item: any, index: number) => {
              return (
                <PieList
                  key={index}
                  background={colorsList?.[index]}
                  title={item?.title}
                  price={item?.total}
                />
              );
            })}
        </Wrapper>
      </ScrollVertical>

      <BottomSheet
        snapPoints={[0.1, 432]}
        index={-1}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={bottomSheetStyle.indicatorStyle}
        backgroundStyle={bottomSheetStyle.bottomSheet}
        ref={carRef}>
        <FlatList
          data={marksList}
          keyExtractor={(i: any) => String(i?._id)}
          ListHeaderComponent={
            <ModalHeader
              handleClose={() => carRef.current?.close()}
              title="Выберите авто"
            />
          }
          renderItem={({item}) => {
            return (
              <ModalChildrenCar
                handleSelectRadio={() => handleSelectCar(item)}
                item={item}
                showRadio
                selectedMarkId={selectedMark?._id}
              />
            );
          }}
        />
      </BottomSheet>

      <BottomSheet
        snapPoints={[0.1, 310]}
        index={-1}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={bottomSheetStyle.indicatorStyle}
        backgroundStyle={bottomSheetStyle.bottomSheet}
        ref={periodRef}>
        <FlatList
          data={analyticsPeriodList}
          keyExtractor={(i: any) => String(i._id)}
          ListHeaderComponent={
            <ModalHeader
              handleClose={() => periodRef.current?.close()}
              title="Период"
            />
          }
          renderItem={({item}) => {
            return (
              <ModalChildrenCar
                handleSelectItem={() => handleSelectPeriod(item)}
                showRadio
                item={item}
                selectedMarkId={period?._id}
              />
            );
          }}
        />
      </BottomSheet>
    </Layout>
  );
};
