import { PieceNumber, PlayerNumber, playerNumberToColor } from '../types';
import greenPiece from '../assets/green-piece.png';
import yellowPiece from '../assets/yellow-piece.png';
import bluePiece from '../assets/blue-piece.png';
import redPiece from '../assets/red-piece.png';
import { useSelector } from 'react-redux';
import { selectWidth } from '../app/slices/boardSlice';

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

const Piece: React.FC<PieceProps> = ({ playerNumber, pieceNumber }) => {
  const width = useSelector(selectWidth) ?? 0;

  let leftAdjustment: number;
  let topAdjustment: number;

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
      leftAdjustment = (width / 15) * 9;
      topAdjustment = 0;
      break;
    }
    case '4': {
      leftAdjustment = 0;
      topAdjustment = 0;
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
      leftAdjustment += (width / 15) * 2 - 3;
      break;
    }
    case '3': {
      leftAdjustment += (width / 15) * 2 - 3;
      break;
    }
  }

  return (
    <div
      className="w-12 h-12 absolute"
      style={{
        bottom: topAdjustment + (width / 15) * 1.6,
        left: leftAdjustment + (width / 15) * 1.6,
      }}
    >
      <img
        src={playerToPiece[playerNumber]}
        alt={`${playerNumberToColor[playerNumber]} piece`}
      />
    </div>
  );
};

export default Piece;
