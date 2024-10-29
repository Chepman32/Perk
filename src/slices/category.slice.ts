import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  category: {
    _id?: string | null;
    title?: string | null;
  };
  service: {
    _id?: string | null;
    title?: string | null;
  };
  categoryType: string | null;
};

const initialState: State = {
  category: {
    _id: null,
    title: null,
  },
  service: {
    _id: null,
    title: null,
  },
  categoryType: null,
};

interface Action {
  _id: string;
  title: string;
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategorySlice: (state, action: PayloadAction<Action>) => {
      state.category = {
        _id: action.payload._id,
        title: action.payload.title,
      };
    },
    setServiceSlice: (state, action: PayloadAction<Action>) => {
      state.service = {
        _id: action.payload._id,
        title: action.payload.title,
      };
    },
    setCategoryTypeSlice: (state, action: PayloadAction<string | null>) => {
      state.categoryType = action.payload;
    },
  },
});

export const {setCategorySlice, setServiceSlice, setCategoryTypeSlice} =
  categorySlice.actions;

export const getCategory = (state: any) => state.category;

export const category = categorySlice.reducer;
