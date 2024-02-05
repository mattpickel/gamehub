import isValidWord from "../utils/validateWordleGuesses";
import { useWordleGameStore } from "../stores/useWordleGameStore";
import { Bounce, toast } from 'react-toastify';

const useGuessSubmission = (answer: string) => {
    // Get state and actions from game store
    const {
        addGuess,
        incrementGuessNumber,
        setInput,
        guessNumber,
        updateScore,
        updateGameStatus
    } = useWordleGameStore((state) => state);

    // Toasty notification and configuration
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