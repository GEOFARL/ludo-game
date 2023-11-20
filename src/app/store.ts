import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './slices/playersSlice';
import screensReducer from './slices/screensSlice';
import gameSettingsReducer from './slices/gameSettingsSlice';
import boardReducer from './slices/boardSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    screens: screensReducer,
    gameSettings: gameSettingsReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
