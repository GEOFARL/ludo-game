import { PlayerNumber } from '../types';
import Piece from './Piece';

interface PlayerBaseSpawnProps {
  playerNumber: PlayerNumber;
  color: string;
}

const PlayerBaseSpawn: React.FC<PlayerBaseSpawnProps> = ({
  color,
  playerNumber,
}) => {
  return (
    <div
      className={`row-start-2 row-span-4 col-start-2 col-span-4 bg-white border-2 border-black grid grid-cols-2 grid-rows-2`}
    >
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          <Piece playerNumber={playerNumber} pieceNumber="1" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          <Piece playerNumber={playerNumber} pieceNumber="2" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          <Piece playerNumber={playerNumber} pieceNumber="3" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
        >
          <Piece playerNumber={playerNumber} pieceNumber="4" />
        </div>
      </div>
    </div>
  );
};

export default PlayerBaseSpawn;
