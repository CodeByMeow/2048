import { Component } from 'react';
import game from './Game';
import Board from './components/Board';
import Modal from './components/Modal';
import Header from './components/Header';

game.start();
class App extends Component {

  state = {
    cells: game.cells,
    tiles: game.tiles,
    score: 0,
    won: false,
    over: false,
    addition: 0,
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydown);

    game.addCallback('addition', (score) => this.setState({
      score: this.state.score + score,
      addition: score,
    }));
    game.addCallback('won', () => this.setState({ won: true }));
    game.addCallback('over', () => this.setState({ over: true }));
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeydown);

    game.removeCallback('addition');
    game.removeCallback('won');
    game.removeCallback('over');
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

  tryAgain = () => {
    game.restart();
    this.setState({
      cells: game.cells,
      tiles: game.tiles,
      won: false,
      over: false,
      score: 0,
    })
  }

  render() {
    const { cells, tiles, won, over, score, addition } = this.state;
    return (
      <div className='container'>
        <Header score={score} addition={addition} />
        <Board cells={cells} tiles={tiles} won={won} over={over} tryAgain={this.tryAgain} />
        {won && <Modal message="You won !!!" tryAgain={this.tryAgain} />}
      </div>
    );
  }
}

export default App;
