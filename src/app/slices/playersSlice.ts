import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Player, PlayerNumber } from '../../types';
import { RootState } from '../store';

export interface PlayersState {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
}

const initialState: PlayersState = {
  player1: {
    isActive: false,
  },
  player2: {
    isActive: false,
  },
  player3: {
    isActive: false,
  },
  player4: {
    isActive: false,
  },
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setActivePlayer: (
      state,
      action: PayloadAction<{ number: PlayerNumber; active: boolean }[]>
    ) => {
      action.payload.forEach((player) => {
        state[`player${player.number}`].isActive = player.active;
      });
    },
  },
});

export const { setActivePlayer } = playersSlice.actions;

export const selectPlayers = (state: RootState) => state.players;

export default playersSlice.reducer;
