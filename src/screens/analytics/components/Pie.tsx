import {Typography} from '@components';
import {PieChartBox, PieChartAbsolute} from './style';
import PieChart from 'react-native-pie-chart';
import {PropsWithChildren} from 'react';
import {priceEnter} from '@shared/utils/list';

interface Props {
  total: any;
  totalList: any[];
  colorsList: any[];
}

export const Pie = ({
  total,
  totalList,
  colorsList,
}: PropsWithChildren<Props>) => {
  if (totalList?.length == 0 || colorsList?.length == 0) {
    return null;
  }
  return (
    <PieChartBox>
      <PieChart
        widthAndHeight={240}
        series={totalList}
        sliceColor={colorsList}
        coverRadius={0.95}
        coverFill={'#121212'}
      />
      <PieChartAbsolute>
        <Typography
          align="center"
          fontWeight={400}
          lineHeight={16}
          size={13}
          color="#7F7F7F">
          Затраты
        </Typography>
        <Typography
          align="center"
          fontWeight={600}
          marginTop={4}
          lineHeight={24}
          size={18}
          color="#F2F2F2">
          {priceEnter(total)} ₽
        </Typography>
      </PieChartAbsolute>
    </PieChartBox>
  );
};
