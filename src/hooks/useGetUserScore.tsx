import { useWordleScoreStore } from "../stores/useWordleScoreStore";
import useUpdateScore from "./useScoreGame";
import users from "../data/users"; 

const useGetUserScore = () => {
    const updateTotalGamesPlayed = useWordleScoreStore((state) => state.updateTotalGamesPlayed);
    const updateTotalGamesWon = useWordleScoreStore((state) => state.updateTotalGamesWon);
    const updateLongestStreak = useWordleScoreStore((state) => state.updateLongestStreak);
    const updateCurrentStreak = useWordleScoreStore((state) => state.updateCurrentStreak);

    return (userId: string) => {
        if (!userId) {
            return;
        }
        const user = users.find(user => user.id === userId);
        if (!user) {
            return;
        }
        const userScore = {
            totalGamesPlayed: user.totalGamesPlayed,
            totalGamesWon: user.totalGamesWon,
            longestStreak: user.longestStreak,
            currentStreak: user.currentStreak
        }

        updateTotalGamesPlayed(userScore.totalGamesPlayed);
        updateTotalGamesWon(userScore.totalGamesWon);
        updateLongestStreak(userScore.longestStreak);
        updateCurrentStreak(userScore.currentStreak);

        console.log('User Score:', userScore);
        return;
    }
}

export default useGetUserScore;