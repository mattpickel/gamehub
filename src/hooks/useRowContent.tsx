import { useCallback } from 'react';
import { useGuessesStore } from '../stores/useGuessesStore';

const useRowContent = (rowIndex: number) => {
  const guessNumber = useGuessesStore((state) => state.guessNumber);
  const guesses = useGuessesStore((state) => state.guesses);
  const currentInput = useGuessesStore((state) => state.currentInput);

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