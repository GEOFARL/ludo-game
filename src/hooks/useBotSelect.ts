import { useEffect } from 'react';
import { PieceNumber, PlayerNumber } from '../types';
import useIsPlayer from './useIsPlayer';
import useIsSelecting from './useIsSelecting';
import usePossiblePositions from './usePossiblePositions';
import { getRandomNumber } from '../utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  setRollOneMoreTime,
  setSelectedPiece,
} from '../app/slices/piecesSlice';
import useIsActivePlayer from './useIsActivePlayer';
import {
  moveActiveToNextOne,
  setBeat,
  setIsActive,
  setIsSelecting,
  setMoveAgain,
} from '../app/slices/playersSlice';
import useMoveAgain from './useMoveAgain';
import useRollOneMoreTime from './useRollOneMoreTime';
import useBeat from './useBeat';

export default function useBotSelect(playerNumber: PlayerNumber) {
  const isPlayer = useIsPlayer(playerNumber);
  const isSelecting = useIsSelecting(playerNumber);
  const isActive = useIsActivePlayer(playerNumber);

  const rollOneMoreTime = useRollOneMoreTime();

  const possiblePositions = usePossiblePositions(playerNumber);
  const moveAgain = useMoveAgain(playerNumber);
  const beat = useBeat(playerNumber);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isPlayer || !isSelecting || !isActive || rollOneMoreTime) return;

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
        if (moveAgain) {
          dispatch(setIsActive([playerNumber, true]));
          dispatch(setIsSelecting([playerNumber, false]));
          dispatch(setMoveAgain([playerNumber, false]));
          dispatch(setRollOneMoreTime(true));
        } else if (beat) {
          dispatch(setIsActive([playerNumber, true]));
          dispatch(setIsSelecting([playerNumber, false]));
          dispatch(setBeat([playerNumber, false]));
          dispatch(setRollOneMoreTime(true));
        } else {
          dispatch(moveActiveToNextOne(playerNumber));
        }
      }
    }
  }, [
    isPlayer,
    isSelecting,
    possiblePositions,
    dispatch,
    playerNumber,
    isActive,
    moveAgain,
    rollOneMoreTime,
    beat,
  ]);
}
