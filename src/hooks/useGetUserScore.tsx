import { useEffect, useState } from "react";
import { useWordleScoreStore } from "../stores/useWordleScoreStore";
// Retreive user score from the backend

const apiBaseUrl = import.meta.env.VITE_DEV_API_URL;

const useGetUserScore = (userId: string) => {
    const updateTotalGamesPlayed = useWordleScoreStore((state) => state.updateTotalGamesPlayed);
    const updateTotalGamesWon = useWordleScoreStore((state) => state.updateTotalGamesWon);
    const updateLongestStreak = useWordleScoreStore((state) => state.updateLongestStreak);
    const updateCurrentStreak = useWordleScoreStore((state) => state.updateCurrentStreak);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null); 

    useEffect(() => {
        const fetchUserScore = async () => {
            if (!userId) return;

            setLoading(true);
            try {
                const response = await fetch(`${apiBaseUrl}/users/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const userScore = await response.json();

                updateTotalGamesPlayed(userScore.totalGamesPlayed);
                updateTotalGamesWon(userScore.totalGamesWon);
                updateLongestStreak(userScore.longestStreak);
                updateCurrentStreak(userScore.currentStreak);
            } catch (error) {
                console.error('Failed to fetch user score:', error);
                setError(error as Error); 
            } finally {
                setLoading(false);
            }
        };

        fetchUserScore();
    }, [userId, updateTotalGamesPlayed, updateTotalGamesWon, updateLongestStreak, updateCurrentStreak]);

    return { loading, error };
}

export default useGetUserScore;
