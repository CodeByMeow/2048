import './Helper.css';

const Helper = ({ backStep, shuffle }) => {
  return (
    <div className='helper' >
      <button className='back-step' onClick={() => backStep()}>
        <i className="fa-solid fa-rotate-left"></i>
      </button>
      <button className='shuffle' onClick={() => shuffle()}>
        <i className="fa-solid fa-shuffle"></i>
      </button>
    </div>
  );
}

export default Helper;
