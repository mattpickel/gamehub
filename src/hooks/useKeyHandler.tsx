import { useCallback } from 'react';
import { useWordleGameStore } from '../stores/useWordleGameStore';
import isValidKey from '../utils/validateWordleKeys';
import useGuessSubmission from './useGuessSubmission';

// Custom hook to handle key entry from keyboard/key listener in Wordle Game

const useKeyHandler = () => {
    const currentInput = useWordleGameStore((state) => state.currentInput);
    const setInput = useWordleGameStore((state) => state.setInput);
    const answer = useWordleGameStore((state) => state.answer);
    const submitGuess = useGuessSubmission(answer.toUpperCase());

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