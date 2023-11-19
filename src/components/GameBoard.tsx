import useWidth from '../hooks/useWidth';
import Center from './Center';
import Lane from './Lane';
import PlayerBase from './PlayerBase';

const GameBoard = () => {
  const { ref, width } = useWidth();
  return (
    <div
      className="w-[900px] h-[900px] mx-auto mt-3 grid grid-cols-[repeat(15,_minmax(0,_1fr))] grid-rows-[repeat(15,_minmax(0,_1fr))] border-2 border-black"
      ref={ref}
    >
      <PlayerBase
        color={'bg-red-500'}
        horizontal="left"
        vertical="bottom"
        animationClass="pulse-red"
      />
      <PlayerBase
        color={'bg-green-600'}
        horizontal="left"
        vertical="top"
        animationClass="pulse-green"
      />
      <PlayerBase
        color={'bg-yellow-400'}
        horizontal="right"
        vertical="top"
        animationClass="pulse-yellow"
      />
      <PlayerBase
        color={'bg-blue-600'}
        horizontal="right"
        vertical="bottom"
        animationClass="pulse-blue"
      />
      <Center width={width / 5} />
      <Lane position="top" color={'bg-yellow-400'} />
      <Lane position="bottom" color={'bg-red-500'} />
      <Lane position="left" color={'bg-green-600'} />
      <Lane position="right" color={'bg-blue-600'} />
    </div>
  );
};

export default GameBoard;
