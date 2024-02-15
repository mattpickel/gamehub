import { useState } from "react";
import { useWordleScoreStore } from "../stores/useWordleScoreStore";

const apiBaseUrl = import.meta.env.VITE_DEV_API_URL;

const useUpdateAndSaveScore = (clerkId: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    // Access and update functions directly from the score store
    const { totalGamesPlayed, totalGamesWon, longestStreak, currentStreak,
            updateTotalGamesPlayed, updateTotalGamesWon, updateLongestStreak, updateCurrentStreak
          } = useWordleScoreStore(state => ({
              ...state,
              totalGamesPlayed: state.totalGamesPlayed,
              totalGamesWon: state.totalGamesWon,
              longestStreak: state.longestStreak,
              currentStreak: state.currentStreak,
              updateTotalGamesPlayed: state.updateTotalGamesPlayed,
              updateTotalGamesWon: state.updateTotalGamesWon,
              updateLongestStreak: state.updateLongestStreak,
              updateCurrentStreak: state.updateCurrentStreak,
          }));

    const updateAndSaveScore = async (updateType: 'won' | 'lost') => {
        setLoading(true);
        try {
            // Update the local score based on the game outcome
            updateTotalGamesPlayed(totalGamesPlayed + 1);
            if (updateType === 'won') {
                updateTotalGamesWon(totalGamesWon + 1);
                const newStreak = currentStreak + 1;
                updateCurrentStreak(newStreak);
                if (newStreak > longestStreak) {
                    updateLongestStreak(newStreak);
                }
            } else if (updateType === 'lost') {
                updateCurrentStreak(0);
            }
            
            // Now save the updated score to the backend
            const response = await fetch(`${apiBaseUrl}/users/${clerkId}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    totalGamesPlayed: totalGamesPlayed + 1,
                    totalGamesWon: updateType === 'won' ? totalGamesWon + 1 : totalGamesWon,
                    longestStreak: updateType === 'won' && (currentStreak + 1 > longestStreak) ? currentStreak + 1 : longestStreak,
                    currentStreak: updateType === 'won' ? currentStreak + 1 : 0,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            console.log('Score updated and saved successfully');
        } catch (error) {
            console.error('Failed to update and save user score:', error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    return { updateAndSaveScore, loading, error };
};

export default useUpdateAndSaveScore;
