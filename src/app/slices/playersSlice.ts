import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Player, PlayerNumber } from '../../types';
import { RootState } from '../store';

export interface PlayersState {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
}

const defaultState = {
  player1: {
    isPlaying: false,
    isBot: true,
  },
  player2: {
    isPlaying: false,
    isBot: true,
  },
  player3: {
    isPlaying: false,
    isBot: true,
  },
  player4: {
    isPlaying: false,
    isBot: true,
  },
};

const initialState: PlayersState = defaultState;

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setIsPlayingPlayer: (
      state,
      action: PayloadAction<{ number: PlayerNumber; active: boolean }[]>
    ) => {
      action.payload.forEach((player) => {
        state[`player${player.number}`].isPlaying = player.active;
      });
    },
    resetPlayers: () => defaultState,
    setIsNotBot: (state, action: PayloadAction<PlayerNumber>) => {
      state[`player${action.payload}`].isBot = false;
    },
  },
});

export const { setIsPlayingPlayer, resetPlayers, setIsNotBot } =
  playersSlice.actions;

export const selectPlayers = (state: RootState) => state.players;
export const selectIsPlaying = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].isPlaying;
  }
);
export const selectIsBot = createSelector(
  selectPlayers,
  (_: RootState, playerNumber: PlayerNumber) => playerNumber,
  (players, playerNumber) => {
    return players[`player${playerNumber}`].isBot;
  }
);

export default playersSlice.reducer;
