const Center = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 row-start-7 row-span-3 col-start-7 col-span-3 bg-black">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div key={i}></div>
        ))}
    </div>
  );
};

export default Center;
