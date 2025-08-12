import React from 'react';
import useGame from './hooks/useGame';
import GuessInput from './components/GuessInput';
import GuessList from './components/GuessList';
import Feedback from './components/Feedback';

const App: React.FC = () => {
  const { guesses, feedback, isCorrect, submitGuess, resetGame } = useGame();

  return (
    <div className="app-container">
      <h1>Prime Number Guessing Game</h1>
      <Feedback feedback={feedback} />
      {isCorrect ? (
        <div>
          <p>Congratulations! You guessed the prime number in {guesses.length} attempts.</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <GuessInput onSubmit={submitGuess} />
      )}
      <GuessList guesses={guesses} />
    </div>
  );
};

export default App;