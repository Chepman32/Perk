import {
  CatalogIcon,
  GarageIcon,
  HomeIcon,
  ProfileIcon,
  SupportIcon,
} from '@assets/svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '@shared/enums';
import {TabsOptions} from './options';
import {List} from '@screens/garage';
import {Catalog} from '@screens/catalog';
import {Home} from '@screens/home/home-screen.view';
import {Profile} from '@screens/profile/profile-screen.view';
import {Support} from '@screens/support';
import {useDispatch} from '@store/store';

import {setCategoryTypeSlice} from '@slices';

const Tab = createBottomTabNavigator();

export function Tabs() {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator screenOptions={TabsOptions}>
      <Tab.Screen
        name={Screens.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <HomeIcon color="#F2F2F2" /> : <HomeIcon />,
          tabBarLabel: 'главная',
        }}
      />
      <Tab.Screen
        name={Screens.CATALOG}
        component={Catalog}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <CatalogIcon color="#F2F2F2" /> : <CatalogIcon />,
          tabBarLabel: 'каталог',
        }}
        listeners={{
          tabPress: e => {
            dispatch(setCategoryTypeSlice(null));
          },
        }}
      />
      <Tab.Screen
        name={Screens.GARAGE_LIST}
        component={List}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <GarageIcon color="#F2F2F2" /> : <GarageIcon />,
          tabBarLabel: 'гараж',
        }}
      />
      <Tab.Screen
        name={Screens.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <ProfileIcon color="#F2F2F2" /> : <ProfileIcon />,
          tabBarLabel: 'профиль',
        }}
      />
      <Tab.Screen
        name={Screens.SUPPORT}
        component={Support}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <SupportIcon color="#F2F2F2" /> : <SupportIcon />,
          tabBarLabel: 'помощь',
        }}
      />
    </Tab.Navigator>
  );
}
