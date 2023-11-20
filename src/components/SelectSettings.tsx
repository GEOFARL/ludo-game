import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  setNumberOfPlayers,
  setPlayerColor,
} from '../app/slices/gameSettingsSlice';
import { Color, NumberOfPlayers } from '../types';

const SelectSettings = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h3 className="text-5xl uppercase font-semibold text-center">
        Select Players
      </h3>
      <div className="flex flex-col pl-4 gap-3 mt-4">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="player-count"
            id="2-players"
            className="w-7 h-7"
            value={2}
            onChange={(e) => {
              dispatch(setNumberOfPlayers(+e.target.value as NumberOfPlayers));
            }}
          />
          <label htmlFor="2-players" className="text-2xl">
            2 players
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="player-count"
            id="4-players"
            className="w-7 h-7"
            value={4}
            onChange={(e) => {
              dispatch(setNumberOfPlayers(+e.target.value as NumberOfPlayers));
            }}
          />
          <label htmlFor="4-players" className="text-2xl">
            4 players
          </label>
        </div>
      </div>

      <div className="h-[2px] w-full bg-black my-6"></div>

      <h3 className="text-5xl uppercase font-semibold text-center">
        Select Color
      </h3>

      <div className="flex justify-around mt-4">
        <div className="flex flex-col gap-3 items-center">
          <label htmlFor="red-color">
            <div className="w-14 h-14 bg-red-500"></div>
          </label>
          <input
            type="radio"
            name="color"
            id="red-color"
            className="w-7 h-7"
            value={'red'}
            onChange={(e) => {
              dispatch(setPlayerColor(e.target.value as Color));
            }}
          />
        </div>

        <div className="flex flex-col gap-3 items-center">
          <label htmlFor="green-color">
            <div className="w-14 h-14 bg-green-600"></div>
          </label>
          <input
            type="radio"
            name="color"
            id="green-color"
            className="w-7 h-7"
            value={'green'}
            onChange={(e) => {
              dispatch(setPlayerColor(e.target.value as Color));
            }}
          />
        </div>

        <div className="flex flex-col gap-3 items-center">
          <label htmlFor="yellow-color">
            <div className="w-14 h-14 bg-yellow-400"></div>
          </label>
          <input
            type="radio"
            name="color"
            id="yellow-color"
            className="w-7 h-7"
            value={'yellow'}
            onChange={(e) => {
              dispatch(setPlayerColor(e.target.value as Color));
            }}
          />
        </div>

        <div className="flex flex-col gap-3 items-center">
          <label htmlFor="blue-color">
            <div className="w-14 h-14 bg-blue-600"></div>
          </label>
          <input
            type="radio"
            name="color"
            id="blue-color"
            className="w-7 h-7"
            value={'blue'}
            onChange={(e) => {
              dispatch(setPlayerColor(e.target.value as Color));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectSettings;
