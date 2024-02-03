import React from 'react';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import GameResultModal from '../Modals/GameResultModal';
import ButtonToolbar from './ButtonToolbar';

interface WordleUIProps {
    handleKeyPress: (key: string) => void;
    isModalOpen: boolean;
    modalMessage: string;
    handlePlayAgain: () => void;
}

const WordleUI: React.FC<WordleUIProps> = ({ handleKeyPress, isModalOpen, modalMessage, handlePlayAgain }) => {
    return (
        <main className='flex flex-col justify-start items-center space-y-20 mt-16' style={{ height: 'calc(100vh - 68px - 8rem)' }}>
            <ButtonToolbar buttons={[{ text: 'New Game', onClick: handlePlayAgain }]} />
            <Gameboard />
            <Keyboard onKeyPress={handleKeyPress} />
            <GameResultModal isOpen={isModalOpen} onClose={() => {}} onPlayAgain={handlePlayAgain} message={modalMessage} />
        </main>
    )
}

export default WordleUI;