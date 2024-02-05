import React from 'react';
import WordleUI from './WordleUI/WordleUI';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';
import useGameStatusChangeEffect from '../hooks/useGameStatusChangeEffect';
import useRowContent from '../hooks/useRowContent';
import useRowStyle from '../hooks/useRowStyle';
import { useWordleUIStore } from '../stores/useWordleUIStore';
import { useWordleGameStore } from '../stores/useWordleGameStore';
import { useWordleScoreStore } from '../stores/useWordleScoreStore';

const WordleContainer: React.FC = () => {
    // User input is handled with key keypresses. Attach handler to keylistener and pass to UI for use w/ virtual keyboard
    const handleKeyPress = useKeyHandler();
    useKeyListener(handleKeyPress);

    // Get modal state from UI store to pass to UI
    const { isModalOpen, modalMessage } = useWordleUIStore((state) => ({
        isModalOpen: state.isModalOpen,
        modalMessage: state.modalMessage,
    }));

    // Get guessed letters from game store to pass to UI for keyboard styling
    const letterStatusList = useWordleGameStore((state) => state.letterStatusList);

    // Determine row contents and styles to pass to UI
    const getRowContent = useRowContent();
    const rowContents: string[] = getRowContent;
    const getRowStyles = useRowStyle();
    const rowStyles: string[][] = getRowStyles;

    // Use custom hook to handle game status change
    useGameStatusChangeEffect();

    // Get reset method from game store 
    const resetGame = useWordleGameStore((state) => state.resetGame);

    // Define method to pass to UI for resetting game
    const handlePlayAgain = () => {
        resetGame();
    }

    const totalGamesPlayed = useWordleScoreStore((state) => state.totalGamesPlayed);
    const totalGamesWon = useWordleScoreStore((state) => state.totalGamesWon);
    const longestStreak = useWordleScoreStore((state) => state.longestStreak);
    const currentStreak = useWordleScoreStore((state) => state.currentStreak);
    console.log('totalGamesPlayed: ' + totalGamesPlayed, 'totalGamesWon: ' + totalGamesWon, 'longestStreak: ' + longestStreak, 'currentStreak: ' + currentStreak);

    return (
        <WordleUI handleKeyPress={handleKeyPress} isModalOpen={isModalOpen} modalMessage={modalMessage} handlePlayAgain={handlePlayAgain} letterStatusList={letterStatusList} rowContents={rowContents} rowStyles={rowStyles}/>
    )
}

export default WordleContainer;