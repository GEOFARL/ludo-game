import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeSelectedPiece,
  resetPossiblePositions,
  selectSelectedPiece,
  setOutOfPlay,
  setPosition,
} from '../app/slices/piecesSlice';
import { AppDispatch } from '../app/store';
import { moveActiveToNextOne } from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import useIsActivePlayer from './useIsActivePlayer';
import useIsPlayer from './useIsPlayer';
import usePossiblePositions from './usePossiblePositions';
import usePiecesForPlayer from './usePiecesForPlayer';

export default function useMove(playerNumber: PlayerNumber) {
  const selectedPiece = useSelector(selectSelectedPiece);

  const dispatch = useDispatch<AppDispatch>();
  const isActive = useIsActivePlayer(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);
  const possiblePositions = usePossiblePositions(playerNumber);
  const piecesForPlayer = usePiecesForPlayer(playerNumber);

  useEffect(() => {
    if (possiblePositions.every((position) => position === null)) {
      return;
    }
    if (isActive && !isPlayer) {
      dispatch(resetPossiblePositions());
      dispatch(moveActiveToNextOne(playerNumber));
      return;
    }
    if (!selectedPiece || !isActive) {
      return;
    }

    piecesForPlayer.forEach((piece) => {
      if (piece.pieceNumber === selectedPiece.pieceNumber) {
        if (piece.possiblePosition !== null) {
          dispatch(
            setPosition([
              piece.playerNumber,
              piece.pieceNumber,
              piece.possiblePosition,
            ])
          );

          if (
            piece.possiblePosition.x > 5 &&
            piece.possiblePosition.x < 9 &&
            piece.possiblePosition.y > 5 &&
            piece.possiblePosition.y < 9
          ) {
            dispatch(setOutOfPlay([piece.playerNumber, piece.pieceNumber]));
          }
        }
      }
    });

    dispatch(removeSelectedPiece());
    dispatch(resetPossiblePositions());
    dispatch(moveActiveToNextOne(playerNumber));
  }, [
    selectedPiece,
    dispatch,
    playerNumber,
    isActive,
    isPlayer,
    possiblePositions,
    piecesForPlayer,
  ]);
}
