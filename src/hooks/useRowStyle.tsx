import { useMemo } from 'react';
import { useWordleGameStore } from '../stores/useWordleGameStore';

// Returns an array of arrays of strings, each representing the styles for a row of the gameboard based on the current guesses and answer

const useRowStyle = (): string[][] => {
    const guesses = useWordleGameStore((state) => state.guesses);
    const answer = useWordleGameStore((state) => state.answer);
    const answerLetters = answer.split('');

    const calculateStyles = () => {
        return guesses.map(guess => {
            if (!guess) {
                return Array.from({ length: 5 }, () => 'bg-white border-black dark:bg-neutral-800 dark:border-neutral-500 dark:text-white');
            }
        
            const guessLetters = guess.split('');
            const remainingLetters = [...answerLetters];
            const styles = [];
        
            // First pass: Check for correct letters
            for (let i = 0; i < guessLetters.length; i++) {
                if (guessLetters[i] === answerLetters[i]) {
                    remainingLetters.splice(remainingLetters.indexOf(guessLetters[i]), 1);
                    styles.push('bg-wordle-correct-color border-wordle-correct-color text-white');
                } else {
                    styles.push('bg-white');  // Placeholder for second pass
                }
            }
        
            // Second pass: Check for misplaced letters
            for (let i = 0; i < guessLetters.length; i++) {
                if (styles[i] === 'bg-white' && remainingLetters.includes(guessLetters[i])) {
                    remainingLetters.splice(remainingLetters.indexOf(guessLetters[i]), 1);
                    styles[i] = 'bg-wordle-misplaced-color border-wordle-misplaced-color text-white';
                } else if (styles[i] === 'bg-white') {
                    styles[i] = 'bg-wordle-incorrect-color border-wordle-incorrect-color text-white';
                }
            }
    
            return styles;
        });
    };

    return useMemo(calculateStyles, [guesses, answer]);
};

export default useRowStyle;