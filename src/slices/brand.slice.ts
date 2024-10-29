import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  brandListFilter: [];
  filterFields: {};
};

const initialState: State = {
  brandListFilter: [],
  filterFields: {},
};

const brandListFilterSlice = createSlice({
  name: 'brandListFilter',
  initialState,
  reducers: {
    setBradnsListFilterSlice: (state, action: PayloadAction<any>) => {
      state.brandListFilter = action.payload;
    },
    setFilterField: (state, action: PayloadAction<any>) => {
      state.filterFields = {
        markId: action.payload.markId,
        rating: action.payload.rating,
        status: action.payload.status,
      };
    },
    clearBrandListFilter: state => {
      state.brandListFilter = [];
      state.filterFields = {};
    },
  },
});

export const {setBradnsListFilterSlice, setFilterField, clearBrandListFilter} =
  brandListFilterSlice.actions;

export const getBradnsListFilter = (state: any) => state.brandListFilter;

export const brandListFilter = brandListFilterSlice.reducer;
