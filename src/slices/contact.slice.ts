import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  phone?: string | null;
};

const initialState: State = {
  phone: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactPhone: (state, action: PayloadAction<string | null>) => {
      state.phone = action.payload;
    },
    clearPhoneContact: state => {
      state.phone = null;
    },
  },
});

export const {setContactPhone, clearPhoneContact} = contactSlice.actions;

export const getPhoneContact = (state: any) => state.contact;

export const contact = contactSlice.reducer;
