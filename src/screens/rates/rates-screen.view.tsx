import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {options} from '@shared/theme/navigation';
import {Header, Layout} from '@components';
import {TabScreen} from './tab-screen.view';

const Tab = createMaterialTopTabNavigator();

export const Rates: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Layout
      statusBarColor="#040404"
      chidlrenBackground="#040404"
      edges={['right', 'left', 'top']}>
      <Header
        title="Подберите тариф для себя"
        background="#040404"
        handleNavigateBack={() => navigation.goBack()}
      />
      <Tab.Navigator>
        <Tab.Screen options={options} name="3 месяца" component={TabScreen} />
        <Tab.Screen options={options} name="6 месяцев" component={TabScreen} />
        <Tab.Screen options={options} name="1 год" component={TabScreen} />
      </Tab.Navigator>
    </Layout>
  );
};
