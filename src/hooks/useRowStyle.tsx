import { useGuessesStore } from '../stores/useGuessesStore';

// Takes rowIndex as an argument and if the guess for that row exists, returns an array of strings describing the result of each cell. If the guess does not exist, return array of 5 'default strings.

const useRowStyle = (rowIndex: number, answer: string) => {
    const guesses = useGuessesStore((state) => state.guesses);
    const answerLetters = answer.split('');

    // Directly calculate and return styles
    const calculateStyles = () => {
        const guess = guesses[rowIndex];
        if (!guess) {
            return Array.from({ length: 5 }, () => 'bg-white');
        }

        const guessLetters = guess.split('');
        const remainingLetters = [...answerLetters];
        return guessLetters.map((letter, index) => {
            if (letter === answerLetters[index]) {
                remainingLetters.splice(remainingLetters.indexOf(letter), 1);
                return 'bg-wordle-correct-color';
            } else if (remainingLetters.includes(letter)) {
                remainingLetters.splice(remainingLetters.indexOf(letter), 1);
                return 'bg-wordle-misplaced-color';
            } else {
                return 'bg-wordle-incorrect-color';
            }
        });
    };

    return calculateStyles();
};

export default useRowStyle;