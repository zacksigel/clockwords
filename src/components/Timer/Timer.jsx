import React, { useState, useEffect, useRef } from 'react';
import WordOfTheDay from '../WordOfTheDay/WordOfTheDay';
import './Timer.css'    

const Timer = ({ wordlist, wordlistArr, seconds, onWordSubmit, scoreboard, allSubmittedWords }) => {
  

    const handRef = useRef(null);

    const secondsAngle = 90 - ((60 - seconds) * 6);

    const generateNumberPositions = () => {
      const positions = [];
      for (let i = 0; i < 12; i++) {
        const seconds = i * 5;
        const degrees = i * 30;
        let time = seconds.toString().padStart(2, '0');
        if (time === "00") {
          time = "60";
        }
        positions.push({ time, degrees });
      }
      return positions;
    };
    
    // Generate positions for dots at every one-second increment except where numbers are present
    const generateDotPositions = (numberPositions) => {
      const positions = [];
      const numberDegrees = new Set(numberPositions.map(pos => pos.degrees));
    
      for (let i = 0; i < 60; i++) {
        const degrees = i * 6; // 360 degrees / 60 seconds = 6 degrees per second
        if (!numberDegrees.has(degrees)) {
          positions.push({ degrees });
        }
      }
      return positions;
    };
    
    const numberPositions = generateNumberPositions();
    const dotPositions = generateDotPositions(numberPositions);
    
    const calculatePosition = (degrees) => {
      const radius = 40; // radius as a percentage of the container's width/height
      const centerX = 50; // center X position as a percentage
      const centerY = 50; // center Y position as a percentage
    
      const top = centerY - radius * Math.cos((degrees * Math.PI) / 180);
      const left = centerX + radius * Math.sin((degrees * Math.PI) / 180);
    
      return { top: `${top}%`, left: `${left}%` };
    };
    

    return (
      <div>
      <div className="clock">
        <div style={{position: 'absolute', marginTop: '-100px', marginLeft: '190px'}}>{seconds}</div>
        <div className="hand" style={{ transform: `rotate(${secondsAngle}deg)` }} ref={handRef}></div>
        <div className="center"></div>
        {numberPositions.map((position, index) => {
        const { top, left } = calculatePosition(position.degrees);
        return (
          <div
            key={index}
            className="number"
            style={{ top, left }}
          >
          {position.time}
          </div>
        );
      })}
      {dotPositions.map((position, index) => {
        const { top, left } = calculatePosition(position.degrees);
        return (
          <div
            key={index + 12} // Ensure unique keys for dots
            className="dot"
            style={{ top, left }}
          ></div>
        );
      })}
        <WordOfTheDay wordlist={wordlist} seconds={seconds} wordlistArr={wordlistArr} onWordSubmit={onWordSubmit} scoreboard={scoreboard} allSubmittedWords={allSubmittedWords} />
      </div>
      </div>
    );
  };

export default Timer;