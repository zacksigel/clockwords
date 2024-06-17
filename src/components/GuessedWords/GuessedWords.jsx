import React, { useState, useEffect } from 'react';

const GuessedWords = ({ submittedWord, allSubmittedWords }) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (fade) {
            const timer = setTimeout(() => setFade(false), 50);
            return () => clearTimeout(timer);
        }
    }, [fade]);

    return (
        <div className='guessed-words-container'>
            <h2 className='guessed-words-header inter-500'>Correctly Guessed Words</h2>
            {allSubmittedWords.map((word, index) => (
                <div key={index} id={`guessedword-${index + 1}`}>
                    <div className='guessed-words fade-in fade-out inter-500'>{word}</div>
                </div>
            ))}
        </div>
    );
};

export default GuessedWords;
