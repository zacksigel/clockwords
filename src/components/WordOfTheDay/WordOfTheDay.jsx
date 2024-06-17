import Keyboard from '../Keyboard/Keyboard';
import React, { useState, useEffect } from 'react';

const WordOfTheDay = ({ wordlist, wordlistArr, seconds, onWordSubmit, scoreboard, allSubmittedWords }) => {
    const [misspelledWord, setMisspelledWord] = useState([]);
    const [grayIndexes, setGrayIndexes] = useState([]);
    const [misspelledWordWithLettersRemoved, setMisspelledWordWithLettersRemoved] = useState([]);

    useEffect(() => {
        const newWord = wordlistArr[1];
        const letters = Array.from(newWord);
        setMisspelledWord(letters);
    }, [wordlist]);

    useEffect(() => {
        const totalLetters = misspelledWord.length;
        const elapsedFiveSeconds = Math.floor((60 - seconds) / 5); // Calculate how many 5-second intervals have passed

        if (elapsedFiveSeconds > 0) {
            const activeIndex = (elapsedFiveSeconds - 1) % totalLetters;
            if (!grayIndexes.includes(activeIndex)) {
                setGrayIndexes(prev => {
                    const newGrayIndexes = [...prev, activeIndex];
                    const updatedWord = misspelledWord.filter((_, idx) => !newGrayIndexes.includes(idx));
                    setMisspelledWordWithLettersRemoved(updatedWord);
                    return newGrayIndexes;
                });
            }
        }
    }, [seconds, misspelledWord.length, grayIndexes, misspelledWord]);

    const radius = 235; // radius of the circle

    const getDivStyle = (index) => {
        const angle = (index / misspelledWord.length) * 2 * Math.PI + Math.PI / 2;
        const x = radius + radius * Math.cos(angle) - 50; // subtract half of div width for centering
        const y = radius - radius * Math.sin(angle) - 10; // subtract half of div height for centering
        return {
            position: 'absolute',
            left: `${x}px`,
            top: `${y - 50}px`,
            color: grayIndexes.includes(index) ? 'gray' : 'white',
        };
    };

    return (
        <div>
            <div>
                {misspelledWord.map((letter, index) => (
                    <div key={index} className="word-of-the-day-letter" id={`letter-${index + 1}`} style={getDivStyle(index)}>
                        {letter}
                    </div>
                ))}
            </div>
            <Keyboard misspelledWord={misspelledWord} wordlistArr={wordlistArr} onWordSubmit={onWordSubmit} allSubmittedWords={allSubmittedWords} misspelledWordWithLettersRemoved={misspelledWordWithLettersRemoved}/>
        </div>
    );
}

export default WordOfTheDay;







// console.log(wordlist[Object.keys(wordlist)[0]]["matches"]["3"]) how to access everything down to the three letter words
  

