import React, { useState, useEffect } from 'react';
import './Score.css';

function Score({ scoreboard, newPoints }) {
  const [displayScore, setDisplayScore] = useState(scoreboard);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (scoreboard !== displayScore) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        setDisplayScore(scoreboard);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scoreboard, displayScore]);

  return (
    <div>
        <div className='score-label'>Score:</div>
    <div className="score-container orbitron">
      {!animating && (
        <div className="score">
          {displayScore}
        </div>
      )}
      {animating && (
        <>
          <div className="score scroll-out" key={displayScore}>
            {displayScore}
          </div>
          <div className="score scroll-in" key={scoreboard}>
            {scoreboard}
          </div>
        </>
      )}

    </div>      
    <div className='orbitron new-points'>
      +{newPoints} points!
      </div></div>
  );
}

export default Score;