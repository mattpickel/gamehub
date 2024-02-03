import React from 'react';
import WordleUI from './WordleUI/WordleUI';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';
import useGameStatusChangeEffect from '../hooks/useGameStatusChangeEffect';
import { useWordleUIStore } from '../stores/useWordleUIStore';
import { useWordleGameStore } from '../stores/useWordleGameStore';

const WordleContainer: React.FC = () => {
    // Define behavior for key presses from keyboard and pass to key listener so that player can input guesses
    const handleKeyPress = useKeyHandler();
    useKeyListener(handleKeyPress);

    // Get modal state from UI store
    const { isModalOpen, modalMessage } = useWordleUIStore((state) => ({
        isModalOpen: state.isModalOpen,
        modalMessage: state.modalMessage,
    }));

    // Use custom hook to handle game status change
    useGameStatusChangeEffect();

    // Get reset method from game store 
    const resetGame = useWordleGameStore((state) => state.resetGame);

    // Define behavior for Play Again button as calling the reset game method
    const handlePlayAgain = () => {
        resetGame();
    }

    return (
        <WordleUI handleKeyPress={handleKeyPress} isModalOpen={isModalOpen} modalMessage={modalMessage} handlePlayAgain={handlePlayAgain} />
    )
}

export default WordleContainer;