import {createNavigationContainerRef} from '@react-navigation/native';
import {RootParamList} from '@shared/types/navigation';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<RootParamList>();

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params}],
      }),
    );
  }
}

export function navigateNotification(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
