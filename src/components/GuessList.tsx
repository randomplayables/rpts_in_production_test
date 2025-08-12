import React from 'react';

interface GuessListProps {
  guesses: number[];
}

const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  if (guesses.length === 0) {
    return null;
  }

  return (
    <ul className="guess-list">
      {guesses.map((guess, index) => (
        <li key={index}>{guess}</li>
      ))}
    </ul>
  );
};

export default GuessList;