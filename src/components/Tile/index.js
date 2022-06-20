import './Tile.css';

const Tile = ({cell}) => {
  return ( 
    <div className="tile" style = {{
      "--x": cell.tile.x,
      "--y": cell.tile.y,
      "--image": `url(images/${cell.tile.value}.gif)`,
    }}></div>
  );
}

export default Tile;
