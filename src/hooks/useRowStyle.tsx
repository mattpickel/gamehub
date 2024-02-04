import { useWordleGameStore } from '../stores/useWordleGameStore';

// Takes rowIndex as an argument and if the guess for that row exists, returns an array of strings describing the result of each cell. If the guess does not exist, return array of 5 'default strings.

const useRowStyle = (rowIndex: number) => {
    const guesses = useWordleGameStore((state) => state.guesses);
    const answer = useWordleGameStore((state) => state.answer).toUpperCase();
    const answerLetters = answer.split('');

    // Directly calculate and return styles
    // const calculateStyles = () => {
    //     const guess = guesses[rowIndex];
    //     if (!guess) {
    //         return Array.from({ length: 5 }, () => 'bg-white');
    //     }

    //     const guessLetters = guess.split('');
    //     const remainingLetters = [...answerLetters];
    //     return guessLetters.map((letter, index) => {
    //         if (letter === answerLetters[index]) {
    //             remainingLetters.splice(remainingLetters.indexOf(letter), 1);
    //             return 'bg-wordle-correct-color';
    //         } else if (remainingLetters.includes(letter)) {
    //             remainingLetters.splice(remainingLetters.indexOf(letter), 1);
    //             return 'bg-wordle-misplaced-color';
    //         } else {
    //             return 'bg-wordle-incorrect-color';
    //         }
    //     });
    // };
    const calculateStyles = () => {
        const guess = guesses[rowIndex];
        if (!guess) {
            return Array.from({ length: 5 }, () => 'bg-white');
        }
    
        const guessLetters = guess.split('');
        const remainingLetters = [...answerLetters];
        const styles = [];
    
        // First pass: Check for correct letters
        for (let i = 0; i < guessLetters.length; i++) {
            if (guessLetters[i] === answerLetters[i]) {
                remainingLetters.splice(remainingLetters.indexOf(guessLetters[i]), 1);
                styles.push('bg-wordle-correct-color');
            } else {
                styles.push(null);  // Placeholder for second pass
            }
        }
    
        // Second pass: Check for misplaced letters
        for (let i = 0; i < guessLetters.length; i++) {
            if (styles[i] === null && remainingLetters.includes(guessLetters[i])) {
                remainingLetters.splice(remainingLetters.indexOf(guessLetters[i]), 1);
                styles[i] = 'bg-wordle-misplaced-color';
            } else if (styles[i] === null) {
                styles[i] = 'bg-wordle-incorrect-color';
            }
        }
    
        return styles;
    };

    return calculateStyles();
};

export default useRowStyle;