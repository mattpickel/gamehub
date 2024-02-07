import React from 'react';
import { useWordleScoreStore } from '../../stores/useWordleScoreStore';

const ScoreDisplay: React.FC = () => {
    const totalGamesPlayed = useWordleScoreStore(state => state.totalGamesPlayed);
    const totalGamesWon = useWordleScoreStore(state => state.totalGamesWon);
    const longestStreak = useWordleScoreStore(state => state.longestStreak);
    const currentStreak = useWordleScoreStore(state => state.currentStreak);
    const winPercentage = totalGamesPlayed === 0 ? 0 : (totalGamesWon / totalGamesPlayed) * 100;

    const scoreItems = [
        { title: 'Games', value: totalGamesPlayed },
        { title: 'Wins', value: totalGamesWon },
        { title: 'Win %', value: `${winPercentage.toFixed(0)}%` },
        { title: 'Best Streak', value: longestStreak },
        { title: 'Active Streak', value: currentStreak },
    ];

    return (
        <ul className='flex items-center justify-center text-gray-800 text-sm sm:text-base font-bold space-x-4'>
            {scoreItems.map((item, index) => (
                <li key={index} className='flex flex-col text-center'>
                    <h3 className='underline decoration-2'>
                        {item.title}
                    </h3>
                    <p className=''>
                        {item.value}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default ScoreDisplay;