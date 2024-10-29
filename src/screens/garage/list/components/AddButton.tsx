import {CurrencyIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens, Variables} from '@shared/enums';
import {ButtonFixed} from '@components';
import {setClearGarageSlice} from '@slices';
import {useDispatch} from 'react-redux';

export const AddButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const dispatch = useDispatch();

  return (
    <>
      <ButtonFixed
        icon={<CurrencyIcon />}
        bottom={90}
        handle={() => navigation.navigate(Screens.ANALYTICS)}
        width={44}
        height={44}
        right={14}
      />
      <ButtonFixed
        handle={() => {
          dispatch(setClearGarageSlice());

          navigation.navigate(Screens.LIST_CAR_ITEMS, {
            listType: Variables.BRAND,
            step: 2,
          });
        }}
      />
    </>
  );
};
