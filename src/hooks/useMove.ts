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
import { PlayerNumber, Screen } from '../types';
import useIsActivePlayer from './useIsActivePlayer';
import useIsPlayer from './useIsPlayer';
import usePossiblePositions from './usePossiblePositions';
import usePiecesForPlayer from './usePiecesForPlayer';
import useNumberOutOfPlay from './useNumberOutOfPlay';
import { setIsOver, setWinner } from '../app/slices/gameSettingsSlice';
import { setScreen } from '../app/slices/screensSlice';
import { STARTING_POSITIONS, STARTING_POSITIONS_PLAYER } from '../constants';

export default function useMove(playerNumber: PlayerNumber) {
  const selectedPiece = useSelector(selectSelectedPiece);

  const dispatch = useDispatch<AppDispatch>();
  const isActive = useIsActivePlayer(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);
  const possiblePositions = usePossiblePositions(playerNumber);
  const piecesForPlayer = usePiecesForPlayer(playerNumber);
  const numberOutOfPlay = useNumberOutOfPlay(playerNumber);

  useEffect(() => {
    if (possiblePositions.every((position) => position === null)) {
      return;
    }

    if (!selectedPiece || !isActive) {
      return;
    }

    if (selectedPiece.playerNumber !== playerNumber) return;

    let moved = false;

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
          const starting = STARTING_POSITIONS.find(
            (position) =>
              position.x === piece.position?.x &&
              position.y === piece.position?.y
          );
          if (
            piece.position &&
            !(starting && STARTING_POSITIONS_PLAYER[playerNumber] == starting)
          ) {
            moved = true;
          }

          if (
            piece.possiblePosition.x > 5 &&
            piece.possiblePosition.x < 9 &&
            piece.possiblePosition.y > 5 &&
            piece.possiblePosition.y < 9
          ) {
            dispatch(setOutOfPlay([piece.playerNumber, piece.pieceNumber]));
            if (numberOutOfPlay === 3) {
              dispatch(setIsOver(true));
              dispatch(setScreen(Screen.GAME_OVER));
              if (isPlayer) {
                dispatch(setWinner('player'));
              } else {
                dispatch(setWinner('bot'));
              }
            }
          }
        }
      }
    });

    dispatch(removeSelectedPiece());
    dispatch(resetPossiblePositions());

    if (!moved) {
      dispatch(moveActiveToNextOne(playerNumber));
    }
  }, [
    selectedPiece,
    dispatch,
    playerNumber,
    isActive,
    isPlayer,
    possiblePositions,
    piecesForPlayer,
    numberOutOfPlay,
  ]);
}
