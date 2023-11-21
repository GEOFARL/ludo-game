import { PieceNumber, PlayerNumber, playerNumberToColor } from '../types';
import greenPiece from '../assets/green-piece.png';
import yellowPiece from '../assets/yellow-piece.png';
import bluePiece from '../assets/blue-piece.png';
import redPiece from '../assets/red-piece.png';
import { useSelector } from 'react-redux';
import { selectWidth } from '../app/slices/boardSlice';
import { ForwardedRef, forwardRef } from 'react';
import useIsActivePlayer from '../hooks/useIsActivePlayer';
import useIsSelecting from '../hooks/useIsSelecting';

interface PieceProps {
  playerNumber: PlayerNumber;
  pieceNumber: PieceNumber;
}

const playerToPiece = {
  '1': greenPiece,
  '2': yellowPiece,
  '3': bluePiece,
  '4': redPiece,
};

const Piece = forwardRef<HTMLDivElement, PieceProps>(function (
  { playerNumber, pieceNumber },
  ref: ForwardedRef<HTMLDivElement | null>
) {
  const width = useSelector(selectWidth) ?? 0;

  let leftAdjustment: number;
  let topAdjustment: number;

  const isActive = useIsActivePlayer(playerNumber);
  const isSelecting = useIsSelecting(playerNumber);

  switch (playerNumber) {
    case '1': {
      leftAdjustment = 0;
      topAdjustment = (width / 15) * 9;
      break;
    }
    case '2': {
      leftAdjustment = (width / 15) * 9;
      topAdjustment = (width / 15) * 9;
      break;
    }
    case '3': {
      leftAdjustment = (width / 15) * 9 - 0.75;
      topAdjustment = -2.25;
      break;
    }
    case '4': {
      leftAdjustment = -0.75;
      topAdjustment = -2.25;
      break;
    }
  }

  switch (pieceNumber) {
    case '1': {
      topAdjustment += (width / 15) * 2;
      break;
    }
    case '2': {
      topAdjustment += (width / 15) * 2;
      leftAdjustment += (width / 15) * 2 - 3.75;
      break;
    }
    case '3': {
      leftAdjustment += (width / 15) * 2 - 3.75;
      topAdjustment += 3;
      break;
    }
    case '4': {
      topAdjustment += 3;
      break;
    }
  }

  return (
    <div
      className={`absolute ${
        isActive && isSelecting ? 'active-piece' : ''
      } w-[50px] h-[50px]`}
      style={{
        bottom: topAdjustment + (width / 15) * 1.6,
        left: leftAdjustment + (width / 15) * 1.6,
      }}
      ref={ref}
    >
      <img
        src={playerToPiece[playerNumber]}
        alt={`${playerNumberToColor[playerNumber]} piece`}
      />
    </div>
  );
});

export default Piece;
