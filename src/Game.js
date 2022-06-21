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
    this.callbacks = {};
  }

  start() {
    this.init();
  }

  restart() {
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
    const randomIndex = Math.floor(Math.random() * this.emptyCell().length);
    const emptyCell = this.emptyCell();
    return emptyCell[randomIndex];
  }

  addNew() {
    this.randomEmptyCell().setTile(new Tile());
  }

  getTiles() {
    return this.cells.filter(cell => cell.getTile() != null);
  }

  addCallback(event, callback) {
    this.callbacks[event] = callback;
  }

  removeCallback(event) {
    delete this.callbacks[event];
  }

  cellByCol() {
    return this.cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, [])
  }

  cellByRow() {
    return this.cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, [])
  }

  respond(step) {
    if (this.dispatch(step)) {
      this.cells.forEach(cell => cell.mergeTiles());
      this.addNew()
      this.tiles = this.getTiles();
      return true;
    }

    return false;
  }

  dispatch(step) {
    switch (step) {
      case "up":
        this.up();
        return true;
      case "down":
        this.down();
        return true;
      case "left":
        this.left();
        return true;
      case "right":
        this.right();
        return true;
      default:
        return false;
    }
  }

  up() {
    this.slideTile(this.cellByCol());
  }

  down() {
    this.slideTile(this.cellByCol().map(col => [...col].reverse()));
  }

  left() {
    this.slideTile(this.cellByRow());
  }

  right() {
    this.slideTile(this.cellByRow().map(col => [...col].reverse()));
  }

  slideTile(cells) {
    cells.flatMap(group => {
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.getTile() == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) {
            break;
          }

          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          if (lastValidCell.getTile() != null) {
            lastValidCell.setMergeTile(cell.getTile());
          } else {
            lastValidCell.setTile(cell.getTile());
          }
          cell.tile = null
        }
      }
    })
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tile = null;
    this.mergeTile = null;
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
      (this.mergeTile == null && this.tile.value === tile.value)
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
