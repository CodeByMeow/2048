class Game {
  constructor() {
    this.cells = [];
    this.tiles = [];
    this.keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
  }

  start() {
    this.init();
  }
  init() {
    this.cells = Array(16).fill().map(
      (_, index) => new Cell(
        index % 4,
        Math.floor(index / 4)
      )
    );

    this.addNew();
    this.addNew();
    this.tiles = this.cells.filter(cell => cell.getTile() != null);
  }

  emptyCell() {
    return this.cells.filter(cell => cell.getTile() == null);
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * 16);
    const emptyCell = this.emptyCell();
    return emptyCell[randomIndex];
  }

  addNew() {
    this.randomEmptyCell().setTile(new Tile());
  }

  cellByCol() {
    return this.cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, [])
  }

  respond(step) {

  }

  dispatch(step) {
    switch (step) {
      case "up": 
        
    }
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getTile() {
    return this.tile;
  }

  setTile(value) {
    this.tile = value;
    if (value == null) return;
    this.tile.x = this.x;
    this.tile.y = this.y;
  }

  getMergeTile() {
    return this.mergeTile;
  }

  setMergeTile(value) {
    this.mergeTile = value;
    if (value == null) return;
    this.mergeTile.x = this.x;
    this.mergeTile.y = this.y;
  }

  canAccept(tile) {
    return (
      this.tile == null ||
      this.mergeTile == null && this.tile.value == tile.value
    );
  }

  mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile = null;
  }
}

export class Tile {
  constructor(value = Math.random() > 0.5 ? 4 : 2) {
    this.value = value;
  }
}

export default new Game;
