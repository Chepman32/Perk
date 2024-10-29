import React, {useEffect} from 'react';
import {AppNavigationContainer} from '@navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '@shared/theme/style';
import {store, persistor} from '@store/store';
import {AuthProvider} from './AuthProvider';

export const AppProvider = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <AppNavigationContainer />
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
