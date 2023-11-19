import Container from './components/Container';
import GameBoard from './components/GameBoard';
import Header from './components/Header';

function App() {
  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Container>
        <GameBoard />
      </Container>
    </div>
  );
}

export default App;
