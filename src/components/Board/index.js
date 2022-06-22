import './Board.css';
import Cell from '../Cell';
import Tile from '../Tile';

const Board = ({ cells, tiles, won, over, tryAgain }) => {
  if (over) return (
    <div className='over' style={{ "--image": "url(images/game-over.gif)" }}>
      <img src='images/try-again.gif' onClick={() => tryAgain()}/>
    </div>
  )
  return (
    <div className='board'>
      {cells.map((_, index) => <Cell key={index} />)}
      {tiles.map((cell, index) => <Tile key={index} cell={cell} />)}
    </div>
  );
}

export default Board;
