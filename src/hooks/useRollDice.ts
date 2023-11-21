import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  moveActiveToNextOne,
  setIsRolling,
  setIsSelecting,
  setScore,
} from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import { getRandomNumber } from '../utils';
import { ROLL_TIME } from '../constants';
import useMove from './useMove';
import useIsPresentMove from './useIsPresentMove';
import useEvaluatePosition from './useEvaluatePosition';
import useScore from './useScore';
import useIsPlayer from './useIsPlayer';

export default function useRollDice(playerNumber: PlayerNumber) {
  const dispatch = useDispatch<AppDispatch>();
  const score = useScore(playerNumber);

  const evaluatePosition = useEvaluatePosition(playerNumber);

  useMove(playerNumber);
  const isPresentMove = useIsPresentMove(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);

  const rollDice = useCallback(async () => {
    dispatch(setIsRolling([playerNumber, true]));
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        dispatch(setIsRolling([playerNumber, false]));
        const newScore = getRandomNumber(1, 6);
        dispatch(setScore([playerNumber, newScore]));

        evaluatePosition(newScore);

        if (isPresentMove(newScore) && isPlayer) {
          dispatch(setIsSelecting([playerNumber, true]));
        } else {
          dispatch(moveActiveToNextOne(playerNumber));
        }
        resolve();
      }, ROLL_TIME);
    });
  }, [dispatch, isPresentMove, playerNumber, evaluatePosition, isPlayer]);

  return { score, rollDice };
}
