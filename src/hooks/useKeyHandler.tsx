import { useCallback } from 'react';
import { useWordleGameStore } from '../stores/useWordleGameStore';
import isValidKey from '../utils/validateWordleKeys';
import useGuessSubmission from './useGuessSubmission';

// Custom hook to handle key entry from keyboard/key listener in Wordle Game

const useKeyHandler = () => {
    const { currentInput, setInput, gameStatus } = useWordleGameStore((state) => ({
        currentInput: state.currentInput,
        setInput: state.setInput,
        gameStatus: state.gameStatus,
    }));
    const submitGuess = useGuessSubmission();

    const handleKey = useCallback((key: string) => {
        if (!isValidKey(key)) {
            return;
        }
        if (key === 'DELETE' || key === 'BACKSPACE') {
            setInput(currentInput.slice(0, -1));
        } else if (key === 'ENTER') {
            // Submit guess here
            if (typeof submitGuess === 'function' && gameStatus === 'playing') {
                submitGuess(currentInput);
            }
            return;
        } else {
            if (currentInput.length === 5) {
                return;
            }
            setInput(currentInput + key);
        }
    }, [currentInput, setInput, gameStatus, submitGuess]);

    return handleKey;
    
};

export default useKeyHandler;