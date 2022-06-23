import './Helper.css';

const Helper = ({ backStep }) => {
  return (
    <div className='helper' >
      <button className='back-step' onClick={() => backStep()}>
        <i className="fa-solid fa-rotate-left"></i>
      </button>
    </div>
  );
}

export default Helper;
