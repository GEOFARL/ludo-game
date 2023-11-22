import { MutableRefObject, useEffect, useMemo } from 'react';
import { PieceNumber, PlayerNumber, Position } from '../types';
import usePiecesForPlayer from './usePiecesForPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  removeIsMoving,
  setIsMoving,
  setPreviousPosition,
} from '../app/slices/piecesSlice';
import { selectWidth } from '../app/slices/boardSlice';
import getPath from '../utils/getPath';
import { pause } from '../utils';
import { PIECE_MOVE_TIME } from '../constants';
import { moveActiveToNextOne, setIsActive } from '../app/slices/playersSlice';

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
  const arePiecesMoving = useMemo(() => {
    return piecesForPlayer.map((piece) => piece.isMoving);
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

    positions.forEach(async (position, positionIdx) => {
      if (!position) return;

      const move = async (ref: MutableRefObject<HTMLDivElement | null>) => {
        if (arePiecesMoving[positionIdx]) return;

        if (previousPositions[positionIdx] === null) {
          const [bottom, left] = getCoordinates(width, position);
          ref.current!.style.bottom = `${bottom}px`;
          ref.current!.style.left = `${left}px`;
          return;
        }
        const path = getPath(
          previousPositions[positionIdx]!,
          position,
          playerNumber
        );

        if (path.length > 0) {
          dispatch(
            setIsMoving([
              playerNumber,
              (positionIdx + 1).toString() as PieceNumber,
            ])
          );
          dispatch(setIsActive([playerNumber, false]));
        }
        for (const coordinate of path) {
          const [bottom, left] = getCoordinates(width, coordinate);
          ref.current!.style.bottom = `${bottom}px`;
          ref.current!.style.left = `${left}px`;
          await pause(PIECE_MOVE_TIME);
        }
        if (path.length > 0) {
          dispatch(removeIsMoving());
          dispatch(moveActiveToNextOne(playerNumber));
        }
      };

      switch (positionIdx + 1) {
        case 1: {
          await move(firstRef);
          break;
        }
        case 2: {
          await move(secondRef);
          break;
        }
        case 3: {
          await move(thirdRef);
          break;
        }
        case 4: {
          await move(fourthRef);
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
    arePiecesMoving,
  ]);
}
