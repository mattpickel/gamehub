import { useMemo } from 'react';
import { useWordleGameStore } from '../stores/useWordleGameStore';

// Returns an array of strings representing the contents of each cell in the gameboard. If the guess for that row exists, return the guess. If the guess does not exist, return the current input if the row is the current row, otherwise return 5 spaces.

const useRowContent = (): string[] => {
  const { guessNumber, guesses, currentInput } = useWordleGameStore((state) => ({
    guessNumber: state.guessNumber,
    guesses: state.guesses,
    currentInput: state.currentInput,
  }));

  const calculateContents = () => {
    return guesses.map((guess, index) => {
      if (guess) {
        return guess;
      } else if (index === guessNumber - 1) {
        return currentInput;
      } else {
        return '     ';
      }
    })
  };

  return useMemo(calculateContents, [guesses, guessNumber, currentInput]);
}

export default useRowContent;