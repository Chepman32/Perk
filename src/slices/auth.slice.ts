import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  phone?: string | null;
};

const initialState: State = {
  phone: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneSlice: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
  },
});

export const {setPhoneSlice} = authSlice.actions;

export const getAuth = (state: any) => state.auth;

export const auth = authSlice.reducer;
