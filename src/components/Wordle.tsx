import React from 'react';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import GameResultModal from './Modals/GameResultModal';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';
import useGameStatusChangeEffect from '../hooks/useGameStatusChangeEffect';
import { useWordleUIStore } from '../stores/useWordleUIStore';
import { useWordleGameStore } from '../stores/useWordleGameStore';

const Wordle: React.FC = () => {
    // Define behavior for key presses from keyboard and pass to key listener
    const handleKeyPress = useKeyHandler();
    useKeyListener(handleKeyPress);

    // Get UI state from UI store
    const isModalOpen = useWordleUIStore((state) => state.isModalOpen);
    const modalMessage = useWordleUIStore((state) => state.modalMessage);

    // Get reset method from game store 
    const resetGame = useWordleGameStore((state) => state.resetGame);

    // Use custom hook to handle game status change
    useGameStatusChangeEffect();

    // Define behavior for Play Again button
    const handlePlayAgain = () => {
        resetGame();
    }

    return (
        <>
            <div className='flex flex-col justify-start items-center space-y-20 mt-32' style={{ height: 'calc(100vh - 68px - 8rem)' }}>
                <Gameboard />
                <Keyboard onKeyPress={handleKeyPress} />
                <GameResultModal isOpen={isModalOpen} onClose={() => {}} onPlayAgain={handlePlayAgain} message={modalMessage} />
            </div>
        </>
    )
}

export default Wordle;