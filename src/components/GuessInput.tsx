import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MIN_NUMBER, MAX_NUMBER } from '../constants';

interface GuessInputProps {
  onSubmit: (guess: number) => void;
}

const GuessInput: React.FC<GuessInputProps> = ({ onSubmit }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guess = parseInt(value, 10);
    if (isNaN(guess)) {
      return;
    }
    onSubmit(guess);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="guess-input">
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={`Enter a number (${MIN_NUMBER}-${MAX_NUMBER})`}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        required
      />
      <button type="submit">Guess</button>
    </form>
  );
};

export default GuessInput;
