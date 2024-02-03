import isValidWord from "../utils/validateWordleGuesses";
import { useWordleGameStore } from "../stores/useWordleGameStore";
import { Bounce, toast } from 'react-toastify';

const useGuessSubmission = (answer: string) => {
    const addGuess = useWordleGameStore((state) => state.addGuess);
    const incrementGuessNumber = useWordleGameStore((state) => state.incrementGuessNumber);
    const setInput = useWordleGameStore((state) => state.setInput);
    const guessNumber = useWordleGameStore((state) => state.guessNumber);
    const updateScore = useWordleGameStore((state) => state.updateScore);
    const updateGameStatus = useWordleGameStore((state) => state.updateGameStatus);

    const notify = (message: string) => toast(message, {position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,});

    return (guess: string) => {
        // Validate word and length of guess
        if (guess.length !== 5) {
            notify('Guess must be 5 characters long');
            return;
        }
        if (!isValidWord(guess)) {
            notify('Guess must be a valid word');
            return;
        }
        // Add guess to list of guesses and check against answer
        addGuess(guess);
        console.log('answer:' + answer);
        if (guess === answer) {
            updateScore(1);
            updateGameStatus('won');
            return;
        } else {
            if (guessNumber > 5) {
                updateGameStatus('lost');
                return;
            } else {
                notify('Wrong guess, try again.');
                incrementGuessNumber();
                setInput('');
            }
            
            
            return;
        }
    };
};

export default useGuessSubmission;