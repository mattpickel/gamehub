import isValidWord from "../utils/validateWordleGuesses";
import { useWordleGameStore } from "../stores/useWordleGameStore";
import useUpdateAndSaveScore from "./useUpdateAndSaveScore";
import { Zoom, toast } from 'react-toastify';
import { useUser } from "@clerk/clerk-react";

// Custom hook to handle guess submission. Validate guess and check against answer, ending game if won or lost and updating score accordingly.

const useGuessSubmission = () => {
    // Get state and actions from game store
    const {
        answer,
        correctLettersForHardMode,
        misplacedLettersForHardMode,
        isHardMode,
        addGuess,
        incrementGuessNumber,
        setInput,
        guessNumber,
        updateGameStatus,
        letterStatusList,
        updateLetterStatus,
        updateCorrectLettersForHardMode,
        updateMisplacedLettersForHardMode
    } = useWordleGameStore((state) => state);

    const { user } = useUser();
    const { updateAndSaveScore } = useUpdateAndSaveScore(user?.id ?? '');

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
        let isGuessValidForHardMode = true;
        if (isHardMode) {
            correctLettersForHardMode.forEach((correctLetter) => {
                if (guess[correctLetter.index] !== correctLetter.letter) {
                    notify('Must use correct letters in hard mode');
                    isGuessValidForHardMode = false;
                    console.log('correct letter not in guess')
                }
            });

            if (!isGuessValidForHardMode) return; // Early return if guess is invalid

            misplacedLettersForHardMode.forEach((letter) => {
                if (!guess.includes(letter)) {
                    notify('Must use misplaced letters in hard mode');
                    isGuessValidForHardMode = false;
                    console.log('misplaced letter not in guess')
                }
            });

            if (!isGuessValidForHardMode) return; // Early return if guess is invalid
        }

        if (!isGuessValidForHardMode) return; // Prevent guess submission if it doesn't meet hard mode criteria

        // Add guess to list of guesses 
        addGuess(guess);

        // Update key status for virtual keyboard to reflect guessed letters
        const newCorrectLetters: { letter: string, index: number }[] = [];
        const newMisplacedLetters: string[] = [];
        guess.split('').forEach((letter, index) => {
            const currentStatus = letterStatusList[letter.charCodeAt(0) - 65].status;
            if (letter === answer[index]) {
                updateLetterStatus(letter, 'correct');
                newCorrectLetters.push({ letter, index });
            } else if (answer.includes(letter) && currentStatus !== 'correct') {
                updateLetterStatus(letter, 'misplaced');
                newMisplacedLetters.push(letter);
            } else if (currentStatus === 'not-guessed') {
                updateLetterStatus(letter, 'incorrect');
            }
        })
        updateCorrectLettersForHardMode(newCorrectLetters);
        updateMisplacedLettersForHardMode(newMisplacedLetters);
        console.log('answer:' + answer);

        // Check if guess is correct and update game status
        if (guess === answer) {
            updateGameStatus('won');
            updateAndSaveScore('won');
            return;
        } else {
            if (guessNumber > 5) {
                updateGameStatus('lost');
                updateAndSaveScore('lost');
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