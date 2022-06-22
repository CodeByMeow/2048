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
    this.won = false;
    this.over = false;
    this.score = 0;
    this.history = [];
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
    this.tiles = this.getTiles();
    this.won = false;
    this.over = false;
    this.score = 0;
    this.history = this.loadHistory();
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
      let score = 0;
      this.cells.forEach(cell => score += cell.mergeTiles());
      this.addNew();
      this.tiles = this.getTiles();
      this.score += score;
      this.callbacks['addition'] && this.callbacks['addition'](score);
      if (this.isWon()) this.callbacks['won'] && this.callbacks['won'](this.score);
      if (this.isOver()) this.callbacks['over'] && this.callbacks['over'](this.score);

      return true;
    }

    return false;
  }

  largestValue() {
    const tileValues = this.getTiles().map(cell => cell.getTile().value);
    return Math.max(...tileValues);
  }

  isWon() {
    return this.largestValue() === 2048;
  }

  isOver() {
    return (!this.canMoveUp() && !this.canMoveDown() && !this.canMoveLeft() && !this.canMoveRight());
  }

  dispatch(step) {
    switch (step) {
      case "up":
        if (!this.canMoveUp()) return false;
        this.up();
        return true;
      case "down":
        if (!this.canMoveDown()) return false;
        this.down();
        return true;
      case "left":
        if (!this.canMoveLeft()) return false;
        this.left();
        return true;
      case "right":
        if (!this.canMoveRight()) return false;
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
    cells.forEach(group => {
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.getTile() == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.getTile())) {
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
          cell.setTile(null)
        }
      }
    })
  }

  canMoveUp() {
    return this.canMove(this.cellByCol());
  }

  canMoveDown() {
    return this.canMove(this.cellByCol().map(col => [...col].reverse()));
  }

  updateToHistory(score) {
    const date = new Date();
    const timeGameOver = date.toLocaleString();
    const data = JSON.parse(localStorage.getItem("history")) || [];
    data.push({time: timeGameOver, score: score});
    localStorage.setItem('history', JSON.stringify(data));
  }

  loadHistory() {
    return JSON.parse(localStorage.getItem('history')) || [];
  }

  canMoveLeft() {
    return this.canMove(this.cellByRow());
  }

  canMoveRight() {
    return this.canMove(this.cellByRow().map(row => [...row].reverse()));
  }

  canMove(cells) {
    return cells.some(group => {
      return group.some((cell, index) => {
        if (index === 0) return false;
        if (cell.getTile() == null) return false;
        const moveToCell = group[index - 1];
        return moveToCell.canAccept(cell.getTile());
      })
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
    if (this.tile == null || this.mergeTile == null) return 0;
    const addition = this.mergeTile.value;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile = null;

    return addition;
  }
}

class Tile {
  constructor(value = Math.random() > 0.5 ? 4 : 2) {
    this.value = value;
  }
}

export default new Game;
