import { create } from 'zustand';
import generateRandomWord from '../utils/generateRandomWord';

type LetterStatus = {
    letter: string;
    status: 'correct' | 'incorrect' | 'misplaced' | 'not-guessed';
};

type correctLetterForHardMode = { 
    letter: string, 
    index: number 
};

type State = {
    guessNumber: number;
    guesses: string[];
    currentInput: string;
    gameStatus: 'playing' | 'won' | 'lost';
    answer: string;
    letterStatusList: LetterStatus[];
    correctLettersForHardMode: correctLetterForHardMode[];
    misplacedLettersForHardMode: string[];
    isHardMode: boolean;
    addGuess: (guess: string) => void;
    setInput: (input: string) => void;
    incrementGuessNumber: () => void;
    resetGame: () => void;
    updateGameStatus: (status: 'playing' | 'won' | 'lost') => void;
    updateLetterStatus: (letter: string, status: 'correct' | 'incorrect' | 'misplaced' | 'not-guessed') => void;
    resetLetterStatus: () => void;
    updateCorrectLettersForHardMode: (newCorrectLetters: correctLetterForHardMode[]) => void;
    updateMisplacedLettersForHardMode: (letters: string[]) => void;
    toggleIsHardMode: () => void;
};

export const useWordleGameStore = create<State>()((set) => ({
    guessNumber: 1,
    guesses: Array(6).fill(''),
    currentInput: '',
    gameStatus: 'playing',
    answer: generateRandomWord(),
    letterStatusList: Array.from({length: 26}, (_, i) => ({
        letter: String.fromCharCode(65 + i),
        status: 'not-guessed'
      })),
    correctLettersForHardMode: [],
    misplacedLettersForHardMode: [],
    isHardMode: false,
    addGuess: (guess: string) => set((state) => {
        const newGuesses = [...state.guesses];
        newGuesses[state.guessNumber - 1] = guess;
        return { guesses: newGuesses };
    }),
    setInput: (input: string) => set({ currentInput: input }),
    incrementGuessNumber: () => set((state) => ({ guessNumber: state.guessNumber + 1 })),
    resetGame: () => set((state) => {
        state.resetLetterStatus();
        return { guessNumber: 1, guesses: Array(6).fill(''), currentInput: '', totalScore: 0, gameStatus: 'playing', answer: generateRandomWord(), correctLettersForHardMode: [], misplacedLettersForHardMode: []};
    }),
    updateGameStatus: (status: 'playing' | 'won' | 'lost') => set({ gameStatus: status }),
    updateLetterStatus(letter: string, status: 'correct' | 'incorrect' | 'misplaced' | 'not-guessed') {
        set((state) => {
            const newLetterStatusList = [...state.letterStatusList];
            const letterIndex = letter.toUpperCase().charCodeAt(0) - 65;
            newLetterStatusList[letterIndex] = {
                letter, status
            };
            return { letterStatusList: newLetterStatusList };
        });
    },
    resetLetterStatus: () => set({ letterStatusList: Array.from({length: 26}, (_, i) => ({
        letter: String.fromCharCode(65 + i),
        status: 'not-guessed'
      })) }),
    updateCorrectLettersForHardMode: (newCorrectLetters: correctLetterForHardMode[]) => set({ correctLettersForHardMode: newCorrectLetters }),
    updateMisplacedLettersForHardMode: (letters: string[]) => set({ misplacedLettersForHardMode: letters }),
    toggleIsHardMode: () => set((state) => ({ isHardMode: !state.isHardMode })),
}));

if (process.env.NODE_ENV === 'development') {
    (window as any).useWordleGameStore = useWordleGameStore;
}