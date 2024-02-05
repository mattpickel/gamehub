import React from 'react';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import GameResultModal from '../Modals/GameResultModal';
import ButtonToolbar from './ButtonToolbar';
// import { useWordleGameStore } from '../../stores/useWordleGameStore';

interface WordleUIProps {
    handleKeyPress: (key: string) => void;
    isModalOpen: boolean;
    modalMessage: string;
    handlePlayAgain: () => void;
    rowStyles: string[][];
}

const WordleUI: React.FC<WordleUIProps> = ({ handleKeyPress, isModalOpen, modalMessage, handlePlayAgain, rowStyles }) => {
    // const answer = useWordleGameStore((state) => state.answer);

    return (
        <main className='flex flex-col justify-start items-center space-y-20 mt-16' style={{ height: 'calc(100vh - 68px - 8rem)' }}>
            {/* <h1 className='text-4xl font-semibold'>{answer}</h1> */}
            <ButtonToolbar buttons={[{ text: 'New Game', onClick: handlePlayAgain }]} />
            <Gameboard rowStyles={rowStyles} />
            <Keyboard onKeyPress={handleKeyPress} />
            <GameResultModal isOpen={isModalOpen} onClose={() => {}} onPlayAgain={handlePlayAgain} message={modalMessage} />
        </main>
    )
}

export default WordleUI;