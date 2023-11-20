import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface BoardState {
  width: number | null;
}

const initialState: BoardState = {
  width: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});

export const { setWidth } = boardSlice.actions;

export const selectWidth = (state: RootState) => state.board.width;

export default boardSlice.reducer;
