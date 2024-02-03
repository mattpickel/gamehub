import { useCallback } from 'react';
import { useWordleGameStore } from '../stores/useWordleGameStore';

// Takes rowIndex as an argument and returns string of that row's guess, the current input, or blank string w/ a length of 5 characters

const useRowContent = (rowIndex: number) => {
  const guessNumber = useWordleGameStore((state) => state.guessNumber);
  const guesses = useWordleGameStore((state) => state.guesses);
  const currentInput = useWordleGameStore((state) => state.currentInput);

  return useCallback(() => {
    if (guesses[rowIndex]) {
      return guesses[rowIndex];
    } else if (rowIndex === guessNumber - 1) {
      return currentInput;
    } else {
      return '     ';
    }
  }, [guesses, rowIndex, guessNumber, currentInput]);
};

export default useRowContent;