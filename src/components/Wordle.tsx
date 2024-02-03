import React, { useEffect } from 'react';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import GameResultModal from './Modals/GameResultModal';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';
import { useWordleUIStore } from '../stores/useWordleUIStore';
import { useWordleGameStore } from '../stores/useWordleGameStore';

const Wordle: React.FC = () => {
    // Define behavior for key presses from keyboard and pass to key listener
    const handleKeyPress = useKeyHandler();
    useKeyListener(handleKeyPress);

    // Get UI state from UI store
    const isModalOpen = useWordleUIStore((state) => state.isModalOpen);
    const setIsModalOpen = useWordleUIStore((state) => state.setIsModalOpen);
    const modalMessage = useWordleUIStore((state) => state.modalMessage);
    const setModalMessage = useWordleUIStore((state) => state.setModalMessage);

    // Get game status from game store
    const gameStatus = useWordleGameStore((state) => state.gameStatus);
    const resetGame = useWordleGameStore((state) => state.resetGame);

    // Define behavior for game end
    const handleGameEnd = () => {
        if (gameStatus === 'playing') {
            return;
        }
        if (gameStatus === 'won') {
            setModalMessage('You won!');
        } else if (gameStatus === 'lost') {
            setModalMessage('You lost!');
        }
        setIsModalOpen(true);
    }

    useEffect(() => {
        handleGameEnd();
    }, [gameStatus]);

    // Define behavior for Play Again button
    const handlePlayAgain = () => {
        setIsModalOpen(false);
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