import './Header.css';

const Header = ({ score, addition, tryAgain }) => {
  addition = addition ? `+${addition}` : "";
  return (
    <div className="header">
      <div className="game-title"><h2>2048</h2></div>
      <div className="new-game"><button onClick={() => tryAgain()}>New Game</button></div>
      <div className="score">
        <span className="addition" key={addition}>{addition}</span>
        <span className="current-score">Core: {score}</span>
      </div>
    </div>
  );
}

export default Header;
