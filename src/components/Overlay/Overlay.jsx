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
        <div className='overlay-content-instructions demo-note'>This is a testing version with three words hardcoded into the frontend. The game will randomly choose one of the words when you refresh the page.</div>
      </div>
    </div>
  );
};

export default Overlay;