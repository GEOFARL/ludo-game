import useWidth from '../hooks/useWidth';
import { Color } from '../types';
import Center from './Center';
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
      <Center width={Math.round((width / 5) * 100) / 100} />
    </div>
  );
};

export default GameBoard;
