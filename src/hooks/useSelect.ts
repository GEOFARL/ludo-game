import { useEffect, useRef } from 'react';
import { PlayerNumber } from '../types';
import { useDispatch } from 'react-redux';
import { setIsSelecting } from '../app/slices/playersSlice';
import { AppDispatch } from '../app/store';
import { setSelectedPiece } from '../app/slices/piecesSlice';
import useIsSelecting from './useIsSelecting';
import useIsPlayer from './useIsPlayer';

export default function useSelect(playerNumber: PlayerNumber) {
  const firstPiece = useRef<HTMLDivElement | null>(null);
  const secondPiece = useRef<HTMLDivElement | null>(null);
  const thirdPiece = useRef<HTMLDivElement | null>(null);
  const fourthPiece = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const isSelecting = useIsSelecting(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);

  useEffect(() => {
    if (!isPlayer) {
      dispatch(setIsSelecting([playerNumber, false]));
      return;
    }
    const first = firstPiece.current;
    const second = secondPiece.current;
    const third = thirdPiece.current;
    const fourth = fourthPiece.current;
    const handleFirstClick = () => {
      dispatch(setSelectedPiece([playerNumber, '1']));
      dispatch(setIsSelecting([playerNumber, false]));
    };
    const handleSecondClick = () => {
      dispatch(setSelectedPiece([playerNumber, '2']));
      dispatch(setIsSelecting([playerNumber, false]));
    };
    const handleThirdClick = () => {
      dispatch(setSelectedPiece([playerNumber, '3']));
      dispatch(setIsSelecting([playerNumber, false]));
    };
    const handleFourthClick = () => {
      dispatch(setSelectedPiece([playerNumber, '4']));
      dispatch(setIsSelecting([playerNumber, false]));
    };
    if (isSelecting) {
      first?.addEventListener('click', handleFirstClick);
      second?.addEventListener('click', handleSecondClick);
      third?.addEventListener('click', handleThirdClick);
      fourth?.addEventListener('click', handleFourthClick);
    }

    return () => {
      first?.removeEventListener('click', handleFirstClick);
      second?.removeEventListener('click', handleSecondClick);
      third?.removeEventListener('click', handleThirdClick);
      fourth?.removeEventListener('click', handleFourthClick);
    };
  }, [
    firstPiece,
    secondPiece,
    thirdPiece,
    fourthPiece,
    isSelecting,
    isPlayer,
    dispatch,
    playerNumber,
  ]);

  return [firstPiece, secondPiece, thirdPiece, fourthPiece];
}
