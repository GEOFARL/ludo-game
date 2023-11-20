import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './slices/playersSlice';
import screensReducer from './slices/screensSlice';
import gameSettingsReducer from './slices/gameSettingsSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    screens: screensReducer,
    gameSettings: gameSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
