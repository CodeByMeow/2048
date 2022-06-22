import './Modal.css';

const Modal = ({ message, tryAgain }) => {
  const charactors = message.split("");
  return (
    <div className="modal">
      <div className='waviy'>
        {charactors.map((char, index) => {
          return <span style={{ "--i": ++index, whiteSpace: "pre" }} key={index}>{char}</span>
        })}
      </div>
      <a href="#" onClick={() => tryAgain()}>Play again</a>
    </div>
  );
}

export default Modal;
