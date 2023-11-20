import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  moveActiveToNextOne,
  setIsRolling,
  setIsSelecting,
} from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import { getRandomNumber } from '../utils';
import { ROLL_TIME } from '../constants';
import useMove from './useMove';
import useIsPresentMove from './useIsPresentMove';

export default function useRollDice(playerNumber: PlayerNumber) {
  const [score, setScore] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useMove(playerNumber);
  const isPresentMove = useIsPresentMove(playerNumber);

  const rollDice = useCallback(async () => {
    dispatch(setIsRolling([playerNumber, true]));
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        dispatch(setIsRolling([playerNumber, false]));
        const newScore = getRandomNumber(1, 6);
        setScore(newScore);

        if (isPresentMove(newScore)) {
          dispatch(setIsSelecting([playerNumber, true]));
        } else {
          dispatch(moveActiveToNextOne(playerNumber));
        }
        resolve();
      }, ROLL_TIME);
    });
  }, [dispatch, isPresentMove, playerNumber]);

  return { score, rollDice };
}
