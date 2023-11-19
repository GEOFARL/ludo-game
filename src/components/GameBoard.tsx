import useWidth from '../hooks/useWidth';
import { Color } from '../types';
import Center from './Center';
import Lane from './Lane';
import PlayerBase from './PlayerBase';

const GameBoard = () => {
  const { ref, width } = useWidth();
  return (
    <div
      className="w-[800px] h-[800px] mx-auto mt-3 grid grid-cols-[repeat(15,_minmax(0,_1fr))] grid-rows-[repeat(15,_minmax(0,_1fr))] border-2 border-black"
      ref={ref}
    >
      <PlayerBase color={Color.RED} horizontal="left" vertical="bottom" />
      <PlayerBase color={Color.GREEN} horizontal="left" vertical="top" />
      <PlayerBase color={Color.YELLOW} horizontal="right" vertical="top" />
      <PlayerBase color={Color.BLUE} horizontal="right" vertical="bottom" />
      <Center width={width / 5} />
      <Lane position="top" color={Color.YELLOW} />
      <Lane position="bottom" color={Color.RED} />
      <Lane position="left" color={Color.GREEN} />
      <Lane position="right" color={Color.BLUE} />
    </div>
  );
};

export default GameBoard;
