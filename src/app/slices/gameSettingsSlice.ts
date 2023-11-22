import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Color, NumberOfPlayers } from '../../types';

export interface GameSettingsState {
  numberOfPlayers: NumberOfPlayers | null;
  playerColor: Color | null;
  isOver: boolean;
  winner: 'player' | 'bot' | null;
}

const initialState: GameSettingsState = {
  numberOfPlayers: null,
  playerColor: null,
  isOver: false,
  winner: null,
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
    setWinner: (state, action: PayloadAction<'player' | 'bot' | null>) => {
      state.winner = action.payload;
    },
    resetGameSettings: (state) => {
      state.isOver = false;
      state.numberOfPlayers = null;
      state.playerColor = null;
      state.winner = null;
    },
  },
});

export const {
  setNumberOfPlayers,
  setPlayerColor,
  setIsOver,
  setWinner,
  resetGameSettings,
} = gameSettingsSlice.actions;

export const selectNumberOfPlayers = (state: RootState) =>
  state.gameSettings.numberOfPlayers;

export const selectPlayerColor = (state: RootState) =>
  state.gameSettings.playerColor;

export const selectGameSettings = (state: RootState) => state.gameSettings;

export const selectIsGameOver = (state: RootState) => state.gameSettings.isOver;

export const selectWinner = (state: RootState) => state.gameSettings.winner;

export default gameSettingsSlice.reducer;
