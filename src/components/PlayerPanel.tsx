import { useState } from 'react';
import { getRandomNumber } from '../utils';
import { PlayerNumber } from '../types';
import useIsPlayingPlayer from '../hooks/useIsPlayingPlayer';
import useIsPlayer from '../hooks/useIsPlayer';
import useIsRolling from '../hooks/useIsRolling';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setIsRolling } from '../app/slices/playersSlice';
import { ROLL_TIME } from '../constants';
import Card from './Card';

interface PlayerPanelProps {
  playerNumber: PlayerNumber;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerNumber }) => {
  const [score, setScore] = useState(0);
  const isPlaying = useIsPlayingPlayer(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);
  const isRolling = useIsRolling(playerNumber);

  const dispatch = useDispatch<AppDispatch>();

  const disabled = isRolling;

  return isPlaying ? (
    <div
      className={`h-24 flex ${
        +playerNumber < 3 ? 'justify-end' : 'justify-start'
      } flex-col`}
    >
      <div className="flex p-3 bg-white gap-3 rounded-md shadow-md items-center">
        <p>Score: {score}</p>
        {isPlayer && (
          <button
            onClick={() => {
              dispatch(setIsRolling([playerNumber, true]));
              setTimeout(() => {
                dispatch(setIsRolling([playerNumber, false]));
                setScore(getRandomNumber(1, 6));
              }, ROLL_TIME);
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
        )}
      </div>
      {isRolling && (
        <Card additionalClassnames="p-1 px-3 mt-2">
          <p>Rolling...</p>
        </Card>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default PlayerPanel;
