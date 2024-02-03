import React from 'react';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import GameResultModal from './Modals/GameResultModal';
import useKeyListener from '../hooks/useKeyListener';
import useKeyHandler from '../hooks/useKeyHandler';

const Wordle: React.FC = () => {
    // Define behavior for key presses from keyboard
    const handleKeyPress = useKeyHandler();

    // Pass key handler to key listener
    useKeyListener(handleKeyPress);

    return (
        <>
            <div className='flex flex-col justify-start items-center space-y-20 mt-32' style={{ height: 'calc(100vh - 68px - 8rem)' }}>
                <Gameboard />
                <Keyboard onKeyPress={handleKeyPress} />
                <GameResultModal isOpen={false} onClose={() => {}} onPlayAgain={() => {}} message='You win!' />
            </div>
        </>
    )
}

export default Wordle;