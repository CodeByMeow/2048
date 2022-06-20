import game from './Game';
import Board from './components/Board';
import { useEffect, useState } from 'react';

function App() {
  game.start();
  const [board, setBoard] = useState(game);

  useEffect(
    () => {
      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
    }, []
  );

  return (
    <Board board={board} />
  );
}

function handleKeyDown(e) {
  if (!Object.values(game.keyMap).includes(e.key)) return;
  
  
}


export default App;
