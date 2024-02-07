import isValidWord from "../utils/validateWordleGuesses";
import { useWordleGameStore } from "../stores/useWordleGameStore";
import useUpdateScore from "./useUpdateScore";
import { Zoom, toast } from 'react-toastify';

// Custom hook to handle guess submission. Validate guess and check against answer, ending game if won or lost.

const useGuessSubmission = () => {
    // Get state and actions from game store
    const {
        answer,
        addGuess,
        incrementGuessNumber,
        setInput,
        guessNumber,
        updateGameStatus,
        letterStatusList,
        updateLetterStatus,
    } = useWordleGameStore((state) => state);

    const updateScore = useUpdateScore();

    // Toasty notification and configuration
    const notify = (message: string) => {
        toast.dismiss();
        toast(message, {position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,});
    };

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
        // Add guess to list of guesses 
        addGuess(guess);

        // Update key status for virtual keyboard to reflect guessed letters
        guess.split('').forEach((letter, index) => {
            const currentStatus = letterStatusList[letter.charCodeAt(0) - 65].status;
            if (letter === answer[index]) {
                updateLetterStatus(letter, 'correct');
            } else if (answer.includes(letter) && currentStatus !== 'correct') {
                updateLetterStatus(letter, 'misplaced');
            } else if (currentStatus === 'not-guessed') {
                updateLetterStatus(letter, 'incorrect');
            }
        
        })
        console.log('answer:' + answer);

        // Check if guess is correct and update game status
        if (guess === answer) {
            updateGameStatus('won');
            updateScore('won');
            return;
        } else {
            if (guessNumber > 5) {
                updateGameStatus('lost');
                updateScore('lost');
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