interface PlayerBaseSpawnProps {
  color: string;
}

const PlayerBaseSpawn: React.FC<PlayerBaseSpawnProps> = ({ color }) => {
  return (
    <div
      className={`row-start-2 row-span-4 col-start-2 col-span-4 bg-white border-2 border-black grid grid-cols-2 grid-rows-2`}
    >
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex justify-center items-center">
            <div
              className={`w-[50%] h-[50%] rounded-full ${color} border-2 border-black`}
            ></div>
          </div>
        ))}
    </div>
  );
};

export default PlayerBaseSpawn;
