import { create } from 'zustand';

type State = {
    guessNumber: number;
    guesses: string[];
    currentInput: string;
    addGuess: (guess: string) => void;
    setInput: (input: string) => void;
    incrementGuessNumber: () => void;
};

export const useGuessesStore = create<State>((set) => ({
    guessNumber: 1,
    guesses: [],
    currentInput: '',
    addGuess: (guess: string) => set((state) => ({ guesses: [...state.guesses, guess] })),
    setInput: (input: string) => set({ currentInput: input }),
    incrementGuessNumber: () => set((state) => ({ guessNumber: state.guessNumber + 1 })),
}));
