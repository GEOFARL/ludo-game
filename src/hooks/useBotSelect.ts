import { useEffect } from 'react';
import { PieceNumber, PlayerNumber } from '../types';
import useIsPlayer from './useIsPlayer';
import useIsSelecting from './useIsSelecting';
import usePossiblePositions from './usePossiblePositions';
import { getRandomNumber } from '../utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setSelectedPiece } from '../app/slices/piecesSlice';
import useIsActivePlayer from './useIsActivePlayer';
import { moveActiveToNextOne } from '../app/slices/playersSlice';

export default function useBotSelect(playerNumber: PlayerNumber) {
  const isPlayer = useIsPlayer(playerNumber);
  const isSelecting = useIsSelecting(playerNumber);
  const isActive = useIsActivePlayer(playerNumber);

  const possiblePositions = usePossiblePositions(playerNumber);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isPlayer || !isSelecting || !isActive) return;

    if (isSelecting) {
      const positionsPlayer = possiblePositions
        .map((pos, idx) => {
          return {
            position: pos,
            pieceNumber: (idx + 1).toString(),
          };
        })
        .filter((entry) => entry.position !== null);
      if (positionsPlayer.length !== 0) {
        const rand = getRandomNumber(0, positionsPlayer.length - 1);
        const entry = positionsPlayer[rand];
        dispatch(
          setSelectedPiece([playerNumber, entry.pieceNumber as PieceNumber])
        );
      } else {
        dispatch(moveActiveToNextOne(playerNumber));
      }
    }
  }, [
    isPlayer,
    isSelecting,
    possiblePositions,
    dispatch,
    playerNumber,
    isActive,
  ]);
}
