import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  marks?: {
    _id: string | null;
    name: string | null;
  };
  model?: {
    _id: string | null;
    name: string | null;
  };
  generation?: {
    _id: string | null;
    name: string | null;
    yearStart: number | null;
    yearStop: number | null;
  };
  configuration?: {
    _id: string | null;
    name: string | null;
  };
  modification?: {
    _id: string | null;
    name: string | null;
  };
  colors?: {
    _id: string | null;
    name: string | null;
  };
  year?: {
    _id: string | null;
    name: string | null;
  };
};

interface ActionProps {
  _id: string;
  name: string;
}

const initialState: State = {
  marks: {
    _id: null,
    name: null,
  },
  model: {
    _id: null,
    name: null,
  },
  generation: {
    _id: null,
    name: null,
    yearStart: null,
    yearStop: null,
  },
  configuration: {
    _id: null,
    name: null,
  },
  modification: {
    _id: null,
    name: null,
  },
  colors: {
    _id: null,
    name: null,
  },
  year: {
    _id: null,
    name: null,
  },
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setMarksSlice: (state, action: PayloadAction<ActionProps>) => {
      state.marks = {
        _id: action.payload._id,
        name: action.payload.name,
      };
      state.model = {
        _id: null,
        name: null,
      };
      state.generation = {
        _id: null,
        name: null,
        yearStart: null,
        yearStop: null,
      };
      state.configuration = {
        _id: null,
        name: null,
      };
      state.modification = {
        _id: null,
        name: null,
      };
    },
    setModelSlice: (state, action: PayloadAction<ActionProps>) => {
      state.model = {
        _id: action.payload._id,
        name: action.payload.name,
      };
      state.generation = {
        _id: null,
        name: null,
        yearStart: null,
        yearStop: null,
      };
      state.configuration = {
        _id: null,
        name: null,
      };
      state.modification = {
        _id: null,
        name: null,
      };
    },
    setGenerationSlice: (state, action: PayloadAction<ActionProps>) => {
      state.generation = {
        _id: action.payload._id,
        name: action.payload.name,
        yearStart: action.payload.yearStart,
        yearStop: action.payload.yearStop,
      };
      state.configuration = {
        _id: null,
        name: null,
      };
      state.modification = {
        _id: null,
        name: null,
      };
    },
    setConfigurationSlice: (state, action: PayloadAction<ActionProps>) => {
      state.configuration = {
        _id: action.payload._id,
        name: action.payload.name,
      };
      state.modification = {
        _id: null,
        name: null,
      };
    },
    setModificationSlice: (state, action: PayloadAction<ActionProps>) => {
      state.modification = {
        _id: action.payload._id,
        name: action.payload.name,
      };
    },
    setColorsSlice: (state, action: PayloadAction<ActionProps>) => {
      state.colors = {
        _id: action.payload._id,
        name: action.payload.name,
      };
    },
    setYearSlice: (state, action: PayloadAction<ActionProps>) => {
      state.year = {
        _id: action.payload._id,
        name: action.payload.name,
      };
    },
    setClearGarageSlice: state => {
      state.marks = {
        _id: null,
        name: null,
      };
      state.model = {
        _id: null,
        name: null,
      };
      state.generation = {
        _id: null,
        name: null,
        yearStart: null,
        yearStop: null,
      };
      state.configuration = {
        _id: null,
        name: null,
      };
      state.modification = {
        _id: null,
        name: null,
      };
      state.colors = {
        _id: null,
        name: null,
      };
      state.year = {
        _id: null,
        name: null,
      };
    },
  },
});

export const {
  setMarksSlice,
  setModelSlice,
  setGenerationSlice,
  setModificationSlice,
  setColorsSlice,
  setYearSlice,
  setConfigurationSlice,
  setClearGarageSlice,
} = garageSlice.actions;

export const getGarage = (state: any) => state.garage;

export const garage = garageSlice.reducer;
