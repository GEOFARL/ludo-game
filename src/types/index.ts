export interface Player {
  isPlaying: boolean;
  isBot: boolean;
  isRolling: boolean;
  isActive: boolean;
}

export type PlayerNumber = '1' | '2' | '3' | '4';
export type PieceNumber = PlayerNumber;
export type Color = 'red' | 'green' | 'yellow' | 'blue';

export type NumberOfPlayers = 2 | 4;

export const playerNumberToColor: Record<PlayerNumber, Color> = {
  '1': 'green',
  '2': 'yellow',
  '3': 'blue',
  '4': 'red',
};

export enum Screen {
  STARTING,
  GAME,
}
