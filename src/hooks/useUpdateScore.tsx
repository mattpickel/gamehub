import { useWordleScoreStore } from "../stores/useWordleScoreStore";

const useUpdateScore = () => {
    const totalGamesPlayed = useWordleScoreStore((state) => state.totalGamesPlayed);
    const totalGamesWon = useWordleScoreStore((state) => state.totalGamesWon);
    const longestStreak = useWordleScoreStore((state) => state.longestStreak);
    const currentStreak = useWordleScoreStore((state) => state.currentStreak);
    const updateTotalGamesPlayed = useWordleScoreStore((state) => state.updateTotalGamesPlayed);
    const updateTotalGamesWon = useWordleScoreStore((state) => state.updateTotalGamesWon);
    const updateLongestStreak = useWordleScoreStore((state) => state.updateLongestStreak);
    const updateCurrentStreak = useWordleScoreStore((state) => state.updateCurrentStreak);

    return (updateType: string) => {
        if (updateType === 'won') {
            updateTotalGamesPlayed(totalGamesPlayed + 1);
            updateTotalGamesWon(totalGamesWon + 1);
            updateCurrentStreak(currentStreak + 1);
            if (currentStreak + 1 > longestStreak) {
                updateLongestStreak(currentStreak + 1);
            }
        } else if (updateType === 'lost') {
            updateTotalGamesPlayed(totalGamesPlayed + 1);
            updateCurrentStreak(0);
        }
        return;
    }
}

export default useUpdateScore;