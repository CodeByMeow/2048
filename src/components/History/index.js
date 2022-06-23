import './History.css';

const History = ({ history }) => {
  history.sort((a, b) => b.score - a.score);
  return (
    <div className='history'>
      <h2>Last play</h2>
      <div className='history-head'>
        <span>Time play</span>
        <span>Best score</span>
      </div>
      {
        history.map(({ time, score }, index) => {
          return (
            <div key={index} className='history-list'>
              <span>{time}</span>
              <span>{score}</span>
            </div>
          )
        })
      }
    </div>
  );
}

export default History;
