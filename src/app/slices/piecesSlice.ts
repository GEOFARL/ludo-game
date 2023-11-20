import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Piece, PieceNumber, PlayerNumber } from '../../types';

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
      });
      state.pieces.push({
        pieceNumber: '2',
        playerNumber: action.payload,
        position: null,
      });
      state.pieces.push({
        pieceNumber: '3',
        playerNumber: action.payload,
        position: null,
      });
      state.pieces.push({
        pieceNumber: '4',
        playerNumber: action.payload,
        position: null,
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
  },
});

export const { addPiecesForPlayer, setSelectedPiece, removeSelectedPiece } =
  boardSlice.actions;

export const selectPieces = (state: RootState) => state.pieces.pieces;
export const selectPiecesForPlayer = createSelector(
  [selectPieces, (_: RootState, playerNumber: PlayerNumber) => playerNumber],
  (pieces, playerNumber) =>
    pieces.filter((piece) => piece.playerNumber === playerNumber)
);

export const selectSelectedPiece = (state: RootState) =>
  state.pieces.selectedPieceIndex
    ? state.pieces.pieces[state.pieces.selectedPieceIndex]
    : null;
export default boardSlice.reducer;
