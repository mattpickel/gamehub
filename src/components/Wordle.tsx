import React from 'react';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
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
            </div>
        </>
    )
}

export default Wordle;