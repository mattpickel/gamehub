import React from 'react';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import WordleModal from '../Modals/WordleModal';
import ButtonToolbar from './ButtonToolbar';
import { useWordleUIStore } from '../../stores/useWordleUIStore';
// import { useWordleGameStore } from '../../stores/useWordleGameStore';

interface WordleUIProps {
    handleKeyPress: (key: string) => void;
    isModalOpen: boolean;
    modalMessage: string;
    handlePlayAgain: () => void;
    letterStatusList: { letter: string, status: string }[];
    rowContents: string[];
    rowStyles: string[][];
    buttons: { icon: JSX.Element, onClick: () => void }[];
}

const WordleUI: React.FC<WordleUIProps> = ({ handleKeyPress, isModalOpen, modalMessage, handlePlayAgain, letterStatusList, rowContents, rowStyles, buttons }) => {
    const setIsModalOpen = useWordleUIStore((state) => state.setIsModalOpen);

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    }

    return (
        <main className='flex flex-col justify-start items-center space-y-20 mt-16' style={{ height: 'calc(100vh - 68px - 8rem)' }}>
            <ButtonToolbar buttons={buttons} />
            <Gameboard rowContents={rowContents} rowStyles={rowStyles} />
            <Keyboard onKeyPress={handleKeyPress} letterStatusList={letterStatusList} />
            <WordleModal isOpen={isModalOpen} onClose={handleCloseModal} onPlayAgain={handlePlayAgain} message={modalMessage} />
        </main>
    )
}

export default WordleUI;