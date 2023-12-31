import Header from './components/Header';
import useScreen from './hooks/useScreen';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartingScreen from './screens/StartingScreen';
import { Screen } from './types';

function App() {
  const screenType = useScreen();

  let screen;

  switch (screenType) {
    case Screen.GAME: {
      screen = <GameScreen />;
      break;
    }
    case Screen.STARTING: {
      screen = <StartingScreen />;
      break;
    }
    case Screen.GAME_OVER: {
      screen = <GameOverScreen />;
      break;
    }
  }

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      {screen}
      {/* <GameScreen /> */}
    </div>
  );
}

export default App;
