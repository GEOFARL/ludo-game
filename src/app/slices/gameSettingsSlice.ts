import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Color, NumberOfPlayers } from '../../types';

export interface GameSettingsState {
  numberOfPlayers: NumberOfPlayers | null;
  playerColor: Color | null;
  isOver: boolean;
}

const initialState: GameSettingsState = {
  numberOfPlayers: null,
  playerColor: null,
  isOver: false,
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    setNumberOfPlayers: (state, action: PayloadAction<NumberOfPlayers>) => {
      state.numberOfPlayers = action.payload;
    },
    setPlayerColor: (state, action: PayloadAction<Color>) => {
      state.playerColor = action.payload;
    },
    setIsOver: (state, action: PayloadAction<boolean>) => {
      state.isOver = action.payload;
    },
  },
});

export const { setNumberOfPlayers, setPlayerColor, setIsOver } =
  gameSettingsSlice.actions;

export const selectNumberOfPlayers = (state: RootState) =>
  state.gameSettings.numberOfPlayers;

export const selectPlayerColor = (state: RootState) =>
  state.gameSettings.playerColor;

export const selectGameSettings = (state: RootState) => state.gameSettings;

export const selectIsGameOver = (state: RootState) => state.gameSettings.isOver;

export default gameSettingsSlice.reducer;
