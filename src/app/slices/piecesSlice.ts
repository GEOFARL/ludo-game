import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Piece, PieceNumber, PlayerNumber, Position } from '../../types';

interface boardState {
  pieces: Piece[];
  selectedPieceIndex: number | null;
}
const initialState: boardState = {
  pieces: [],
  selectedPieceIndex: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addPiecesForPlayer: (state, action: PayloadAction<PlayerNumber>) => {
      state.pieces.push({
        pieceNumber: '1',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
      });
      state.pieces.push({
        pieceNumber: '2',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
      });
      state.pieces.push({
        pieceNumber: '3',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
      });
      state.pieces.push({
        pieceNumber: '4',
        playerNumber: action.payload,
        position: null,
        possiblePosition: null,
        previousPosition: null,
        outOfPlay: false,
      });
    },
    setSelectedPiece: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber]>
    ) => {
      const index = state.pieces.findIndex((piece) => {
        return (
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
        );
      });
      state.selectedPieceIndex = index;
    },
    removeSelectedPiece: (state) => {
      state.selectedPieceIndex = null;
    },
    setPossiblePosition: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber, Position | null]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) piece.possiblePosition = action.payload[2];
    },
    resetPossiblePositions: (state) => {
      state.pieces.forEach((piece) => {
        piece.possiblePosition = null;
      });
    },
    setPosition: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber, Position | null]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) {
        piece.previousPosition = piece.position;
        piece.position = action.payload[2];
      }
    },
    setPreviousPosition: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber, Position | null]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) {
        piece.previousPosition = action.payload[2];
      }
    },
    setOutOfPlay: (
      state,
      action: PayloadAction<[PlayerNumber, PieceNumber]>
    ) => {
      const piece = state.pieces.find(
        (piece) =>
          piece.pieceNumber === action.payload[1] &&
          piece.playerNumber === action.payload[0]
      );
      if (piece) {
        piece.outOfPlay = true;
      }
    },
  },
});

export const {
  addPiecesForPlayer,
  setSelectedPiece,
  removeSelectedPiece,
  setPossiblePosition,
  resetPossiblePositions,
  setPosition,
  setPreviousPosition,
  setOutOfPlay,
} = boardSlice.actions;

export const selectPieces = (state: RootState) => state.pieces.pieces;
export const selectPiecesForPlayer = createSelector(
  [selectPieces, (_: RootState, playerNumber: PlayerNumber) => playerNumber],
  (pieces, playerNumber) =>
    pieces.filter((piece) => piece.playerNumber === playerNumber)
);

export const selectSelectedPiece = (state: RootState) => {
  return state.pieces.selectedPieceIndex !== null
    ? state.pieces.pieces[state.pieces.selectedPieceIndex]
    : null;
};

export const selectPossibleMoves = createSelector(
  [selectPieces, (_: RootState, playerNumber: PlayerNumber) => playerNumber],
  (pieces, playerNumber) =>
    pieces
      .filter((piece) => piece.playerNumber === playerNumber)
      .map((piece) => piece.possiblePosition)
);
export default boardSlice.reducer;
