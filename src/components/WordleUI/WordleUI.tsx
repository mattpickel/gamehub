import React, { useRef } from 'react';
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
    handleRestart: () => void;
}

const WordleUI: React.FC<WordleUIProps> = ({ handleKeyPress, isModalOpen, modalMessage, handlePlayAgain, handleRestart, letterStatusList, rowContents, rowStyles, buttons }) => {
    const setIsModalOpen = useWordleUIStore((state) => state.setIsModalOpen);

    const mainRef = useRef<HTMLDivElement>(null);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            mainRef.current?.focus();
        }, 0); 
    };

    return (
        <main ref={mainRef} tabIndex={-1} className='flex flex-col justify-start items-center space-y-20 mt-16 outline-none' style={{ height: 'calc(100vh - 68px - 8rem)' }}>
            <ButtonToolbar buttons={buttons} />
            <Gameboard rowContents={rowContents} rowStyles={rowStyles} />
            <Keyboard onKeyPress={handleKeyPress} letterStatusList={letterStatusList} />
            <WordleModal isOpen={isModalOpen} onClose={handleCloseModal} onPlayAgain={handlePlayAgain} message={modalMessage} onRestart={handleRestart}/>
        </main>
    )
}

export default WordleUI;