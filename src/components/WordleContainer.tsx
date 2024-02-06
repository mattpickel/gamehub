import React from 'react';
import WordleUI from './WordleUI/WordleUI';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';
import useGameStatusChangeEffect from '../hooks/useGameStatusChangeEffect';
import useRowContent from '../hooks/useRowContent';
import useRowStyle from '../hooks/useRowStyle';
import { useWordleUIStore } from '../stores/useWordleUIStore';
import { useWordleGameStore } from '../stores/useWordleGameStore';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

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


    // Get reset method from game store and pass to UI for use in buttons
    const resetGame = useWordleGameStore((state) => state.resetGame);
    const handlePlayAgain = () => {
        resetGame();
    }

    const handleSettingsClick = () => {
        setModalType('settings');
        setIsModalOpen(true);
    }

    type buttonObject = { icon: JSX.Element, onClick: () => void };
    const buttons: buttonObject[] = [
        { icon: <RefreshIcon />, onClick: handlePlayAgain },
        { icon: <SettingsIcon />, onClick: handleSettingsClick},
    ];

    return (
        <WordleUI 
            handleKeyPress={handleKeyPress} 
            isModalOpen={isModalOpen} 
            modalMessage={modalMessage} 
            handlePlayAgain={handlePlayAgain} 
            letterStatusList={letterStatusList} 
            rowContents={rowContents} 
            rowStyles={rowStyles}
            buttons={buttons}
        />
    )
}

export default WordleContainer;