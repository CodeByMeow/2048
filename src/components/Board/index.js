import './Board.css';
import Cell from '../Cell';
import Tile from '../Tile';

const Board = ({ cells, tiles, waitting }) => {
  return (
    <div className='board'>
      {cells.map((_, index) => <Cell key={index} />)}
      {tiles.map((cell, index) => <Tile key={index} cell={cell} waitting = {waitting} />)}
    </div>
  );
}

export default Board;
