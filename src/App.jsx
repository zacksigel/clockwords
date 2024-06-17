import React, { useState, useEffect } from 'react';
import './App.css';
import Timer from './components/Timer/Timer.jsx';
import SpeedButtons from './components/SpeedButtons/SpeedButtons.jsx';
import Words from './assets/wordlist-demo.js';
import Overlay from './components/Overlay/Overlay.jsx';
import GuessedWords from './components/GuessedWords/GuessedWords.jsx';
import Score from './components/Score/Score.jsx';

const wordlist = Words;

const wordlistArr = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const wordToSolve = Object.keys(wordlist)[getRandomInt(3)];
wordlistArr.push(wordToSolve);
wordlistArr.push(wordlist[wordToSolve]["misspelled_word"]);
for (let item in wordlist[wordToSolve]["matches"]) {
  for (let derivativeWord in wordlist[wordToSolve]["matches"][item]) {
    wordlistArr.push(wordlist[wordToSolve]["matches"][item][derivativeWord]);
  }
}

function App() {
  const [seconds, setSeconds] = useState(60);
  const [intervalMs, setIntervalMs] = useState(1000);
  const [submittedWord, setSubmittedWord] = useState("");
  const [newPoints, setNewPoints] = useState();
  const [scoreboard, setScoreBoard] = useState(0);
  const [allSubmittedWords, setAllSubmittedWords] = useState([]);
  const [showOverlay, setShowOverlay] = useState(true);

  const handleStart = () => {
    setShowOverlay(false);
  };

  const handleWordSubmit = (word) => {
    if (!allSubmittedWords.includes(word)) {
      setSubmittedWord(word);
      console.log("submitted word from app.js: ", submittedWord);
      const scoreMath = Math.round((12**((word.length)/6))*100);
      setNewPoints(scoreMath);
      handleScore(scoreboard + scoreMath);
      setAllSubmittedWords(prevAllSubmittedWords => [...prevAllSubmittedWords, word]);
    }
  };

  const handleScore = (score) => {
    setScoreBoard(score);
  };

  useEffect(() => {
    if (seconds > 0 && !showOverlay) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, intervalMs);

      return () => clearInterval(interval);
    }
  }, [seconds, intervalMs, showOverlay]);

  return (
    <>
      {showOverlay && <Overlay onStart={handleStart} />}
      {!showOverlay && (
        <div className="game-board">
          <Timer wordlist={wordlist} wordlistArr={wordlistArr} seconds={seconds} onWordSubmit={handleWordSubmit} allSubmittedWords={allSubmittedWords}/>
          {/* <SpeedButtons setIntervalMs={setIntervalMs} /> */}
          <SpeedButtons />
          <Score scoreboard={scoreboard} newPoints={newPoints} />
          <GuessedWords submittedWord={submittedWord} allSubmittedWords={allSubmittedWords} />
          {/* <WordOfTheDay /> */}
        </div>
      )}
    </>
  );
}

export default App;
