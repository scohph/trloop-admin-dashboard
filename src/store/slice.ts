import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSliceState } from '../types';

const initialState: TSliceState = {
  mode: 'development',
};

export const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<TSliceState>>) => {
      Object.assign(state, action.payload);
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
