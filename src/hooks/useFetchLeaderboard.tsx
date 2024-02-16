import { useState, useEffect } from 'react';

interface LeaderboardData {
    highestStreakLeaders: any[]; // Replace `any` with the actual type you expect
    mostWinsLeaders: any[]; // Replace `any` with the actual type you expect
}

const useFetchLeaderboard = (apiBaseUrl: string) => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({ highestStreakLeaders: [], mostWinsLeaders: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null >(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiBaseUrl}/users/leaderboard`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setLeaderboardData(data);
            } catch (error: any) { // Catch block errors are typed as `any` by default
                setError(error instanceof Error ? error : new Error('An unexpected error occurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [apiBaseUrl]);

    return { leaderboardData, loading, error };
};

export default useFetchLeaderboard;