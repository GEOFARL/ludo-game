import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Color, NumberOfPlayers } from '../../types';

export interface GameSettingsState {
  numberOfPlayers: NumberOfPlayers | null;
  playerColor: Color | null;
}

const initialState: GameSettingsState = {
  numberOfPlayers: null,
  playerColor: null,
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
  },
});

export const { setNumberOfPlayers, setPlayerColor } = gameSettingsSlice.actions;

export const selectNumberOfPlayers = (state: RootState) =>
  state.gameSettings.numberOfPlayers;

export const selectPlayerColor = (state: RootState) =>
  state.gameSettings.playerColor;

export const selectGameSettings = (state: RootState) => state.gameSettings;

export default gameSettingsSlice.reducer;
