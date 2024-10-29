import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  periodState?: {
    startDate: string;
    endDate: string;
  } | null;
};

const initialState: State = {
  periodState: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setPeriodSlice: (
      state,
      action: PayloadAction<{
        startDate: string;
        endDate: string;
      }>,
    ) => {
      state.periodState = {
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    },
  },
});

export const {setPeriodSlice} = analyticsSlice.actions;

export const getAnalyticsSlice = (state: any) => state.analytics;

export const analytics = analyticsSlice.reducer;
