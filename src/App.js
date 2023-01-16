import { useEffect, useState } from 'react';

import './App.css';

const WORD_LENGTH = 5;
const TEST_WORD = "table"

function App() {
  const [solution, setSolution] = useState(TEST_WORD)
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) => {
      if(isGameOver){
        return;
      }

      if (event.key === 'Enter') {
        if (currentGuess.length !== 5){
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex(val => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');

        const isCorrect = currentGuess === solution;
        if (isCorrect){
          setIsGameOver(true);
        }
      }

      if (event.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0,-1));
        return;
      }

      if (currentGuess.length >= 5) {
        return;
      }

      setCurrentGuess(currentGuess + event.key)
    };

    window.addEventListener('keydown', handleType);

    return () => window.removeEventListener('keydown', handleType)
  }, [currentGuess, solution, isGameOver, guesses]);

  function reset() {
    setCurrentGuess('');
    setIsGameOver(false);
    setGuesses(Array(6).fill(null))
  }
  
  
  return (
    <>
      <div className='board'>
        {
          guesses.map((guess, i) => {
            const isCurrentGuess = i === guesses.findIndex(val => val == null);
            return (
              <Line 
                  isFinal={!isCurrentGuess && guess != null} 
                  guess={isCurrentGuess ? currentGuess : guess ?? ''}
                  solution={solution}/>
              
            );
          })
        }
      </div>
      <div>
          <button type='submit' onClick={reset}>New Game</button>
      </div>
    </>
  );
}

function Line({ guess, isFinal, solution }) {
  const tiles = [];

  for(let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = 'tile';

    if (isFinal) {
      if (char === solution[i]) {
        className += ' correct';
      } else if (solution.includes(char)){
        className += ' close';
      } else {
        className += ' incorrect';
      }
    }

    tiles.push(<div key={i} className={className}>{char}</div>)
  }


  return <div className='line'>{tiles}</div>
}


export default App;
