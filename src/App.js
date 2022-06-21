import { Component } from 'react';
import game from './Game';
import Board from './components/Board';

game.start();
class App extends Component {

  state = {
    cells: game.cells,
    tiles: game.tiles,
    score: 0,
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydown);

    game.addCallback('addition', (score) => this.setState({ score: score }));
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeydown);

    game.removeCallback('addition');
  }

  handleKeydown = (e) => {
    if (!Object.keys(game.keyMap).includes(e.key)) return;
    if (game.respond(game.keyMap[e.key])) {
      this.refreshGameState();
    }
  }

  refreshGameState = () => {
    this.setState({
      cells: game.cells,
      tiles: game.tiles,
    })
  }

  render() {
    const { cells, tiles } = this.state;
    return (
      <Board cells={cells} tiles={tiles} />
    );
  }
}

export default App;
