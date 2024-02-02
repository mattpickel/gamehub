import isValidWord from "../data/validateWordleGuesses";
import { useGuessesStore } from "../stores/useGuessesStore";

const useGuessSubmission = (answer: string) => {
    const addGuess = useGuessesStore((state) => state.addGuess);
    const incrementGuessNumber = useGuessesStore((state) => state.incrementGuessNumber);
    const setInput = useGuessesStore((state) => state.setInput);
    const guessNumber = useGuessesStore((state) => state.guessNumber);

    return (guess: string) => {
        // Validate word and length of guess
        if (guess.length !== 5) {
            console.log('Guess must be 5 characters long');
            return;
        }
        if (!isValidWord(guess)) {
            console.log('Guess must be a valid word');
            return;
        }
        // Add guess to list of guesses and check against answer
        addGuess(guess);
        console.log('answer:' + answer);
        if (guess === answer) {
            console.log('Correct guess, you win!');
            return;
        } else {
            if (guessNumber > 5) {
                console.log('Out of guesses, you lose...');
                // Game over logic here
                return;
            } else {
                console.log('Wrong guess, try again.');
                incrementGuessNumber();
                setInput('');
            }
            
            
            return;
        }
    };
};

export default useGuessSubmission;