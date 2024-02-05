import { create } from 'zustand';

type State = {
    totalGamesPlayed: number;
    totalGamesWon: number;
    longestStreak: number;
    currentStreak: number;
    updateTotalGamesPlayed: (totalGames: number) => void;
    updateTotalGamesWon: (totalGames: number) => void;
    updateLongestStreak: (streak: number) => void;
    updateCurrentStreak: (streak: number) => void;
};

export const useWordleScoreStore = create<State>((set) => ({
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    longestStreak: 0,
    currentStreak: 0,
    updateTotalGamesPlayed: (totalGames) => set({ totalGamesPlayed: totalGames }),
    updateTotalGamesWon: (totalGames) => set({ totalGamesWon: totalGames }),
    updateLongestStreak: (streak) => set({ longestStreak: streak }),
    updateCurrentStreak: (streak) => set({ currentStreak: streak }),
}));