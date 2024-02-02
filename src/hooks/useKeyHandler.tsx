import { useCallback } from 'react';
import { useGuessesStore } from '../stores/useGuessesStore';
import isValidKey from '../data/validateWordleKeys';
import useGuessSubmission from './useGuessSubmission';

// Custom hook to handle key entry from keyboard/key listener in Wordle Game

const useKeyHandler = () => {
    const currentInput = useGuessesStore((state) => state.currentInput);
    const setInput = useGuessesStore((state) => state.setInput);
    const submitGuess = useGuessSubmission('APPLE');

    const handleKey = useCallback((key: string) => {
        if (!isValidKey(key)) {
            return;
        }
        if (key === 'DELETE' || key === 'BACKSPACE') {
            setInput(currentInput.slice(0, -1));
        } else if (key === 'ENTER') {
            // Submit guess here
            if (typeof submitGuess === 'function') {
                submitGuess(currentInput);
            }
            return;
        } else {
            if (currentInput.length === 5) {
                return;
            }
            setInput(currentInput + key);
        }
    }, [currentInput, setInput]);

    return handleKey;
    
};

export default useKeyHandler;