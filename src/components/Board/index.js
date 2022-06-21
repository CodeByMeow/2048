import './Board.css';
import Cell from '../Cell';
import Tile from '../Tile';

const Board = ({ cells, tiles }) => {
  return (
    <div className='board'>
      {cells.map((_, index) => <Cell key={index} />)}
      {tiles.map((cell, index) => <Tile key={index} cell={cell} />)}
    </div>
  );
}

export default Board;
