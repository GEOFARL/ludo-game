import { useState } from 'react';
import { getRandomNumber } from '../utils';
import { PlayerNumber } from '../types';
import useIsActivePlayer from '../hooks/useIsPlayingPlayer';

interface PlayerPanelProps {
  playerNumber: PlayerNumber;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerNumber }) => {
  const [score, setScore] = useState(0);
  const isActive = useIsActivePlayer(playerNumber);

  const disabled = true;

  return isActive ? (
    <div className="flex p-3 bg-white gap-3 rounded-md shadow-md items-center">
      <p>Score: {score}</p>
      <button
        onClick={() => {
          setScore(getRandomNumber(1, 6));
        }}
        className={`px-2 py-1  text-white rounded-sm transition-all duration-200 ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
        }`}
        disabled={disabled}
      >
        Roll Dice
      </button>
    </div>
  ) : (
    <div></div>
  );
};

export default PlayerPanel;
