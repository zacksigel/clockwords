import React, { useState, useEffect } from 'react';

const Keyboard = ({ misspelledWord, wordlistArr, onWordSubmit, allSubmittedWords, misspelledWordWithLettersRemoved }) => {
  const [usableLetters, setUsableLetters] = useState([]);
  const [submittedWord, setSubmittedWord] = useState("");
  const [shake, setShake] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorLabel, setErrorLabel] = useState("Error goes here");

  const allLetters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
  const possibleWords = wordlistArr;


  useEffect(() => {
    if (usableLetters.length === 0) {
      const getLetters = Array.from(misspelledWord);
      setUsableLetters(getLetters)
    } else if (misspelledWordWithLettersRemoved.length < misspelledWord.length) {
      const getLetters = Array.from(misspelledWordWithLettersRemoved);
      setUsableLetters(getLetters);
    }
  }, [misspelledWord, misspelledWordWithLettersRemoved]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyPressed = event.key.toUpperCase();
      if (keyPressed === 'BACKSPACE') {
        event.preventDefault();
        setInputValue(prevValue => prevValue.slice(0, -1));
      } else if (keyPressed === 'ENTER') {
        event.preventDefault();
        setSubmittedWord(inputValue);
        setInputValue("");
        handleSubmit(inputValue);
      } else if (usableLetters.includes(keyPressed)) {
        event.preventDefault();
        setInputValue(prevValue => prevValue + keyPressed);
      } else {
        event.preventDefault();
        setShake(true);
        setTimeout(() => setShake(false), 200);
      }
    };


    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue, allLetters]);

  const handleSubmit = (submittedWord) => {
    console.log("Submitted word:", submittedWord);
    if (possibleWords.includes(submittedWord)) {
      if (!allSubmittedWords.includes(submittedWord)) {
      onWordSubmit(submittedWord);
      setInputValue("");
      } else {
        setErrorLabel("Already found");
        setAlreadySubmitted(true);
        setTimeout(() => setAlreadySubmitted(false), 300);
        setShake(true);
        setTimeout(() => setShake(false), 200);
      }
    } else {
      setErrorLabel("Word not found")
      setAlreadySubmitted(true);
      setTimeout(() => setAlreadySubmitted(false), 300);
      setShake(true);
      setTimeout(() => setShake(false), 200);
    }
  };

  const handleClick = (letter) => {
    setInputValue(prevValue => prevValue + letter);
  };

  const handleButtonDisabled = (letter) => {
    if (!usableLetters.includes(letter)) {
      return true;
    }
    return false;
  }
  

  return (
    <div>
      <div className='keyboard'>
        <div className={alreadySubmitted ? 'submitted-or-not-label fade-in fade-out already-submitted' : 'submitted-or-not-label not-submitted'}>{errorLabel}</div>
        <input
          className={shake ? 'letter-input shake' : 'letter-input'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          autoFocus
        /><p></p>
          {allLetters
            .filter(letter => misspelledWord.includes(letter))
            .map((letter, index) => (
              <div key={index} className='keyboard-letter' id={`keyboard-letter-${index + 1}`}>
                <button 
                  onClick={() => handleClick(letter)} 
                  disabled={handleButtonDisabled(letter)}
                >
                  {letter}
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Keyboard;
