import './Tile.css';

const Tile = ({ cell, waitting }) => {
  return (
    <div
      className="tile"
      style={{
        "--x": cell.tile.x,
        "--y": cell.tile.y,
        "--image": `url(images/${cell.tile.value}.gif)`,
      }}
      onTransitionEnd={() => waitting()}
      
    ></div>
  );
}

export default Tile;
