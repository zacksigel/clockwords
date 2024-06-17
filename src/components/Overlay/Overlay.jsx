import React from 'react';
import './Overlay.css';

const Overlay = ({ onStart }) => {
  return (
    <div className="overlay">
      <div className="overlay-title notable-regular">
        <div>Clockwords!</div>
      </div>
      <div className="overlay-content">
        <div className='overlay-content-instructions instructions-header'>Race against the clock to guess as many words as you can.</div>
        <div className='overlay-content-instructions'>Longer words are worth more points, but every five seconds a letter will be removed from the board.</div>
        <button className="start-button" onClick={onStart}>Play</button>
      </div>
    </div>
  );
};

export default Overlay;