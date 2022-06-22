import { Component } from 'react';
import game from './Game';
import Board from './components/Board';
import Modal from './components/Modal';
import Header from './components/Header';
import History from './components/History';

game.start();
class App extends Component {

  state = {
    cells: game.cells,
    tiles: game.tiles,
    score: 0,
    won: false,
    over: false,
    addition: 0,
    history: game.history,
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydown);

    game.addCallback('addition', (score) => this.setState({
      score: game.score,
      addition: score,
    }));
    
    game.addCallback('won', (score) => {
      game.updateToHistory(score);
      this.setState({ won: true, history: game.loadHistory() });
    });
    
    game.addCallback('over', (score) => {
      game.updateToHistory(score);
      this.setState({ over: true, history: game.loadHistory() });
    });
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
      history: game.loadHistory(),
    })
  }

  render() {
    const { cells, tiles, won, over, score, addition, history } = this.state;
    return (
      <div className='container'>
        <div className='game-board'>
          <Header score={score} addition={addition} />
          <Board cells={cells} tiles={tiles} won={won} over={over} tryAgain={this.tryAgain} />
        </div>
        <div className='sidebar'>
          <History history = {history} />
        </div>
        {won && <Modal message="You won !!!" tryAgain={this.tryAgain} />}
      </div>
    );
  }
}

export default App;
