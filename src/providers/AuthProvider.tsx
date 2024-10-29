import {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setClearGarageSlice } from '@slices';
import {Screens, Variables} from '@shared/enums';
import {navigate} from 'src/navigation/navigation.action';
import {Authorization, User} from '@services';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case Variables.INITIALIZE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        jwt: action.payload.jwt,
      };
    case Variables.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        jwt: action.payload.jwt,
      };
    case Variables.UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        jwt: action.payload.jwt,
      };
    case Variables.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        jwt: null,
      };
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  jwt: '',
};

const AuthContext = createContext({
  ...initialState,
  handleSignin: (
    email: string,
    code: string,
  ): Promise<{status: 'ok' | 'error'}> => Promise.resolve({status: 'ok'}),
  handleLogout: () => Promise.resolve(),
  getUserInfo: () => Promise.resolve(),
});

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {signIn} = Authorization;
  const {user} = User;

  const initial = async () => {
    try {
      const accessToken = await AsyncStorage.getItem(Variables.JWT);

      if (accessToken) {
        const userInfo = await user(accessToken);

        dispatch({
          type: Variables.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: userInfo,
            jwt: accessToken,
          },
        });
        navigate(Screens.TABS);
      } else {
        navigate(Screens.PHONE);
      }
    } catch (err) {
      dispatch({
        type: Variables.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
          jwt: null,
        },
      });
      navigate(Screens.PHONE);
    }
  };

  const getUserInfo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem(Variables.JWT);

      if (accessToken) {
        const userInfo = await user(accessToken);

        dispatch({
          type: Variables.UPDATE_USER,
          payload: {
            isAuthenticated: true,
            user: userInfo,
            jwt: accessToken,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: Variables.UPDATE_USER,
        payload: {
          isAuthenticated: false,
          user: null,
          jwt: null,
        },
      });
    }
  };

  const handleSignin = async (email: string, code: string) => {
    try {
      const response = await signIn(email, code);

      if (response) {
        await AsyncStorage.setItem(Variables.JWT, response?.accessToken);

        dispatch({
          type: Variables.SIGN_IN,
          payload: {
            isAuthenticated: true,
            jwt: response.accessToken,
          },
        });
        return {status: 'ok'};
      }
      return {status: 'error'};
    } catch (err) {
      return {status: 'error'};
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(Variables.JWT);
    navigate(Screens.PHONE);
    dispatch({
      type: Variables.LOGOUT,
      payload: {
        isAuthenticated: false,
        user: null,
        jwt: null,
      },
    });
    dispatch(setClearGarageSlice());
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleLogout,
        handleSignin,
        getUserInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
