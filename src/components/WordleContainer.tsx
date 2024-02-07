import React from 'react';
import WordleUI from './WordleUI/WordleUI';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';
import useGameStatusChangeEffect from '../hooks/useGameStatusChangeEffect';
import useRowContent from '../hooks/useRowContent';
import useRowStyle from '../hooks/useRowStyle';
import useUpdateScore from '../hooks/useUpdateScore';
import { useWordleUIStore } from '../stores/useWordleUIStore';
import { useWordleGameStore } from '../stores/useWordleGameStore';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const WordleContainer: React.FC = () => {
    // User input is handled with key keypresses. Attach handler to keylistener and pass to UI for use w/ virtual keyboard
    const handleKeyPress = useKeyHandler();
    useKeyListener(handleKeyPress);

    // Get modal state from UI store to pass to UI
    const { isModalOpen, modalMessage, setModalType, setIsModalOpen } = useWordleUIStore((state) => ({
        isModalOpen: state.isModalOpen,
        modalMessage: state.modalMessage,
        setModalType: state.setModalType,
        setIsModalOpen: state.setIsModalOpen
    }));

    // Use custom hook to handle game status change and open game-over modal
    useGameStatusChangeEffect();

    // Get list of letter statuses from game store to pass to UI for keyboard styling
    const letterStatusList = useWordleGameStore((state) => state.letterStatusList);

    // Determine row contents and styles to pass to UI
    const getRowContent = useRowContent();
    const rowContents: string[] = getRowContent;
    const getRowStyles = useRowStyle();
    const rowStyles: string[][] = getRowStyles;


    // Get reset and score update methods from game store and pass to UI for use in buttons
    // Define click handlers for other buttons
    const resetGame = useWordleGameStore((state) => state.resetGame);
    const updateScore = useUpdateScore();
    const handlePlayAgain = () => {
        resetGame();
    }

    const handleRestartGame = () => {
        resetGame();
        updateScore('lost');
        setIsModalOpen(false);
    }

    const handleLeaderboardClick = () => {
        setModalType('leaderboard');
        setIsModalOpen(true);
    }

    const gameStatus = useWordleGameStore((state) => state.gameStatus);
    const handleRestartClick = () => {
        gameStatus === 'playing' ? setModalType('restart') : setModalType('gameOver');
        setIsModalOpen(true);
    }

    const handleSettingsClick = () => {
        setModalType('settings');
        setIsModalOpen(true);
    }

    const handleHelpClick = () => {
        setModalType('help');
        setIsModalOpen(true);
    }

    // Define button objects to pass to UI
    type buttonObject = { icon: JSX.Element, onClick: () => void };
    const buttons: buttonObject[] = [
        { icon: <LeaderboardIcon sx={{fontSize: { xs: 24, sm: 35 } }} />, onClick: handleLeaderboardClick},
        { icon: <RefreshIcon sx={{fontSize: { xs: 24, sm: 35 } }} />, onClick: handleRestartClick },
        { icon: <SettingsIcon sx={{fontSize: { xs: 24, sm: 35 } }} />, onClick: handleSettingsClick},
        { icon: <HelpOutlineIcon sx={{fontSize: { xs: 24, sm: 35 } }} />, onClick: handleHelpClick},
    ];

    return (
        <WordleUI 
            handleKeyPress={handleKeyPress} 
            isModalOpen={isModalOpen} 
            modalMessage={modalMessage} 
            handlePlayAgain={handlePlayAgain}
            handleRestart={handleRestartGame} 
            letterStatusList={letterStatusList} 
            rowContents={rowContents} 
            rowStyles={rowStyles}
            buttons={buttons}
        />
    )
}

export default WordleContainer;