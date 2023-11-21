import { useEffect, useMemo } from 'react';
import { PlayerNumber, Position } from '../types';
import usePiecesForPlayer from './usePiecesForPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setPreviousPosition } from '../app/slices/piecesSlice';
import { selectWidth } from '../app/slices/boardSlice';

const getCoordinates = (width: number, position: Position) => {
  const block = width / 15;
  const { x, y } = position;
  const bottom = (14 - y) * block;
  const left = x * block;
  return [bottom, left];
};

export default function useDisplace(
  playerNumber: PlayerNumber,
  refs: React.MutableRefObject<HTMLDivElement | null>[]
) {
  const piecesForPlayer = usePiecesForPlayer(playerNumber);
  const positions = useMemo(() => {
    return piecesForPlayer.map((piece) => piece.position);
  }, [piecesForPlayer]);
  const previousPositions = useMemo(() => {
    return piecesForPlayer.map((piece) => piece.previousPosition);
  }, [piecesForPlayer]);
  const [firstRef, secondRef, thirdRef, fourthRef] = refs;

  const dispatch = useDispatch<AppDispatch>();
  const width = useSelector(selectWidth);

  useEffect(() => {
    if (
      firstRef.current === null ||
      secondRef.current === null ||
      thirdRef.current === null ||
      fourthRef.current === null ||
      width === null
    ) {
      return;
    }

    positions.forEach((position, positionIdx) => {
      if (!position) return;

      if (!previousPositions[positionIdx]) {
        console.log(
          'displacing from',
          previousPositions[positionIdx],
          'to',
          position
        );
        console.log(piecesForPlayer[positionIdx]);
        switch (positionIdx + 1) {
          case 1: {
            const [bottom, left] = getCoordinates(width, position);
            firstRef.current!.style.bottom = `${bottom}px`;
            firstRef.current!.style.left = `${left}px`;
            break;
          }
          case 2: {
            const [bottom, left] = getCoordinates(width, position);
            secondRef.current!.style.bottom = `${bottom}px`;
            secondRef.current!.style.left = `${left}px`;
            break;
          }
          case 3: {
            const [bottom, left] = getCoordinates(width, position);
            thirdRef.current!.style.bottom = `${bottom}px`;
            thirdRef.current!.style.left = `${left}px`;
            break;
          }
          case 4: {
            const [bottom, left] = getCoordinates(width, position);
            fourthRef.current!.style.bottom = `${bottom}px`;
            fourthRef.current!.style.left = `${left}px`;
            break;
          }
        }

        dispatch(
          setPreviousPosition([
            playerNumber,
            (positionIdx + 1).toString() as PlayerNumber,
            position,
          ])
        );
        return;
      }

      if (
        position.x !== previousPositions[positionIdx]!.x ||
        position.y !== previousPositions[positionIdx]!.y
      ) {
        console.log(
          'displacing from',
          previousPositions[positionIdx],
          'to',
          position
        );
        console.log(piecesForPlayer[positionIdx], '2');
        switch (positionIdx + 1) {
          case 1: {
            const [bottom, left] = getCoordinates(width, position);
            firstRef.current!.style.bottom = `${bottom}px`;
            firstRef.current!.style.left = `${left}px`;
            break;
          }
          case 2: {
            const [bottom, left] = getCoordinates(width, position);
            secondRef.current!.style.bottom = `${bottom}px`;
            secondRef.current!.style.left = `${left}px`;
            break;
          }
          case 3: {
            const [bottom, left] = getCoordinates(width, position);
            thirdRef.current!.style.bottom = `${bottom}px`;
            thirdRef.current!.style.left = `${left}px`;
            break;
          }
          case 4: {
            const [bottom, left] = getCoordinates(width, position);
            fourthRef.current!.style.bottom = `${bottom}px`;
            fourthRef.current!.style.left = `${left}px`;
            break;
          }
        }
        dispatch(
          setPreviousPosition([
            playerNumber,
            (positionIdx + 1).toString() as PlayerNumber,
            position,
          ])
        );
        // MOVE PIECE HERE
        return;
      }
    });
  }, [
    firstRef,
    secondRef,
    thirdRef,
    fourthRef,
    positions,
    previousPositions,
    playerNumber,
    dispatch,
    width,
  ]);
}
