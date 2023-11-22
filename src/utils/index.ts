import { Color, playerNumberToColor } from '../types';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPlayerNumber = (color: Color) => {
  let number;

  for (const [playerNumber, playerColor] of Object.entries(
    playerNumberToColor
  )) {
    if (playerColor === color) {
      number = playerNumber;
    }
  }

  if (!number) return 1;

  return +number;
};

export const pause = async (timeMs: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeMs);
  });
};
