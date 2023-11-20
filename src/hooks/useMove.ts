import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeSelectedPiece,
  selectSelectedPiece,
} from '../app/slices/piecesSlice';
import { AppDispatch } from '../app/store';
import { moveActiveToNextOne } from '../app/slices/playersSlice';
import { PlayerNumber } from '../types';
import useIsActivePlayer from './useIsActivePlayer';

export default function useMove(playerNumber: PlayerNumber) {
  const selectedPiece = useSelector(selectSelectedPiece);

  const dispatch = useDispatch<AppDispatch>();
  const isActive = useIsActivePlayer(playerNumber);

  useEffect(() => {
    if (!selectedPiece || !isActive) {
      return;
    }

    dispatch(removeSelectedPiece());
    dispatch(moveActiveToNextOne(playerNumber));
  }, [selectedPiece, dispatch, playerNumber, isActive]);
}
