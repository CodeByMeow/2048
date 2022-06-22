import './Header.css';

const Header = ({ score, addition }) => {
  addition = addition ? `+${addition}` : "";
  return (
    <div className="header">
      <div className="title">2048</div>
      <div className="score">
        <span className="addition" key={addition}>{addition}</span>
        <span className="current-score">You core: {score}</span>
      </div>
    </div>
  );
}

export default Header;
