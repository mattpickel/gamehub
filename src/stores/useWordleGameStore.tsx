import { create } from 'zustand';
import generateRandomWord from '../utils/generateRandomWord';

type State = {
    guessNumber: number;
    guesses: string[];
    currentInput: string;
    totalScore: number;
    gameStatus: 'playing' | 'won' | 'lost';
    answer: string;
    addGuess: (guess: string) => void;
    setInput: (input: string) => void;
    incrementGuessNumber: () => void;
    resetGame: () => void;
    updateScore: (score: number) => void;
    updateGameStatus: (status: 'playing' | 'won' | 'lost') => void;
};

export const useWordleGameStore = create<State>()((set) => ({
    guessNumber: 1,
    guesses: Array(6).fill(''),
    currentInput: '',
    totalScore: 0,
    gameStatus: 'playing',
    answer: generateRandomWord(),
    addGuess: (guess: string) => set((state) => {
        const newGuesses = [...state.guesses];
        newGuesses[state.guessNumber - 1] = guess;
        return { guesses: newGuesses };
    }),
    setInput: (input: string) => set({ currentInput: input }),
    incrementGuessNumber: () => set((state) => ({ guessNumber: state.guessNumber + 1 })),
    resetGame: () => set({ guessNumber: 1, guesses: Array(6).fill(''), currentInput: '', totalScore: 0, gameStatus: 'playing', answer: generateRandomWord() }),
    updateScore: (score: number) => set((state) => ({ totalScore: state.totalScore + score })),
    updateGameStatus: (status: 'playing' | 'won' | 'lost') => set({ gameStatus: status }),
}));

if (process.env.NODE_ENV === 'development') {
    (window as any).useWordleGameStore = useWordleGameStore;
}