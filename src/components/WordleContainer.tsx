import React from 'react';
import WordleUI from './WordleUI';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';
import useGameStatusChangeEffect from '../hooks/useGameStatusChangeEffect';
import { useWordleUIStore } from '../stores/useWordleUIStore';
import { useWordleGameStore } from '../stores/useWordleGameStore';

const WordleContainer: React.FC = () => {
    // Define behavior for key presses from keyboard and pass to key listener
    const handleKeyPress = useKeyHandler();
    useKeyListener(handleKeyPress);

    // Get UI state from UI store
    const { isModalOpen, modalMessage } = useWordleUIStore((state) => ({
        isModalOpen: state.isModalOpen,
        modalMessage: state.modalMessage,
    }));

    // Get reset method from game store 
    const resetGame = useWordleGameStore((state) => state.resetGame);

    // Use custom hook to handle game status change
    useGameStatusChangeEffect();

    // Define behavior for Play Again button
    const handlePlayAgain = () => {
        resetGame();
    }

    return (
        <WordleUI handleKeyPress={handleKeyPress} isModalOpen={isModalOpen} modalMessage={modalMessage} handlePlayAgain={handlePlayAgain} />
    )
}

export default WordleContainer;