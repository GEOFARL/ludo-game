import Card from '../components/Card';

const GameOverScreen = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card additionalClassnames="p-10 flex flex-col justify-center gap-4">
        <h2>Game is OVER</h2>
      </Card>
    </div>
  );
};

export default GameOverScreen;
