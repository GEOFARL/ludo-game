import { PlayerNumber } from '../types';
import useIsPlayingPlayer from '../hooks/useIsPlayingPlayer';
import useIsPlayer from '../hooks/useIsPlayer';
import useIsRolling from '../hooks/useIsRolling';
import Card from './Card';
import useIsActivePlayer from '../hooks/useIsActivePlayer';
import useRollDice from '../hooks/useRollDice';
import { useEffect } from 'react';
import useIsSelecting from '../hooks/useIsSelecting';

interface PlayerPanelProps {
  playerNumber: PlayerNumber;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerNumber }) => {
  const { score, rollDice } = useRollDice(playerNumber);

  const isPlaying = useIsPlayingPlayer(playerNumber);
  const isPlayer = useIsPlayer(playerNumber);
  const isRolling = useIsRolling(playerNumber);
  const isActive = useIsActivePlayer(playerNumber);
  const isSelecting = useIsSelecting(playerNumber);

  const disabled = isRolling || !isActive || isSelecting;

  useEffect(() => {
    (async () => {
      if (isActive && !isPlayer && !isRolling) {
        await rollDice();
      }
    })();
  }, [isActive, isPlayer, isRolling, rollDice]);

  return isPlaying ? (
    <div
      className={`flex gap-3 ${
        +playerNumber === 1 || +playerNumber === 4
          ? 'flex-row'
          : 'flex-row-reverse'
      }`}
    >
      <div className="flex p-4 bg-white gap-3 rounded-md shadow-md items-center">
        <p>Score: {score}</p>
        {isPlayer && (
          <button
            onClick={() => {
              rollDice();
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
        <Card additionalClassnames="p-1 px-3 flex items-center">
          <p>Rolling...</p>
        </Card>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default PlayerPanel;
