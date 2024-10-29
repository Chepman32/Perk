import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './Routes';
import {navigationTheme} from '@shared/theme/navigation';
import {navigationRef} from './navigation.action';

export const AppNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <Routes />
    </NavigationContainer>
  );
};
