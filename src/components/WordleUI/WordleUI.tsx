import React, { useRef } from 'react';
import ScoreDisplay from './ScoreDisplay';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import WordleModal from '../Modals/WordleModal';
import ButtonToolbar from './ButtonToolbar';
import { useWordleUIStore } from '../../stores/useWordleUIStore';

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

    const isScoreDisplayed = useWordleUIStore((state) => state.isScoreDisplayed);

    return (
        <main ref={mainRef} tabIndex={-1} className='flex-grow flex flex-col outline-none space-y-8 sm:space-y-12 mt-10 '>          
            <ButtonToolbar buttons={buttons} />
            <div className='flex flex-col items-center space-y-6 sm:space-y-12'>
                {isScoreDisplayed ? <ScoreDisplay /> : null}
                <Gameboard rowContents={rowContents} rowStyles={rowStyles} />
            </div>
            <Keyboard onKeyPress={handleKeyPress} letterStatusList={letterStatusList} />
            <WordleModal isOpen={isModalOpen} onClose={handleCloseModal} onPlayAgain={handlePlayAgain} message={modalMessage} onRestart={handleRestart}/>
        </main>
    )
}

export default WordleUI;