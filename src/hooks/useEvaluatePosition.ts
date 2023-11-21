import { useCallback } from 'react';
import { PlayerNumber } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setPossiblePosition } from '../app/slices/piecesSlice';
import useIsActivePlayer from './useIsActivePlayer';
import usePiecesForPlayer from './usePiecesForPlayer';

export default function useEvaluatePosition(playerNumber: PlayerNumber) {
  const pieces = usePiecesForPlayer(playerNumber);
  const isActive = useIsActivePlayer(playerNumber);

  const dispatch = useDispatch<AppDispatch>();

  const evaluatePosition = useCallback(
    (newScore: number) => {
      if (!isActive) return;

      if (pieces.every((piece) => piece.position === null) && newScore < 6) {
        return;
      }

      if (newScore === 6) {
        pieces.forEach((piece) => {
          if (piece.position === null) {
            switch (playerNumber) {
              case '1': {
                dispatch(
                  setPossiblePosition(['1', piece.pieceNumber, { y: 6, x: 1 }])
                );
                break;
              }
              case '2': {
                dispatch(
                  setPossiblePosition(['2', piece.pieceNumber, { y: 1, x: 8 }])
                );
                break;
              }
              case '3': {
                dispatch(
                  setPossiblePosition(['3', piece.pieceNumber, { y: 8, x: 13 }])
                );
                break;
              }
              case '4': {
                dispatch(
                  setPossiblePosition(['4', piece.pieceNumber, { y: 13, x: 6 }])
                );
                break;
              }
            }
          }
        });
      }
    },
    [pieces, playerNumber, dispatch, isActive]
  );

  return evaluatePosition;
}
