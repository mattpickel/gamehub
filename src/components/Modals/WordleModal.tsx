import React from 'react';
import Modal from './Modal';
import { useWordleUIStore } from '../../stores/useWordleUIStore';

interface WordleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPlayAgain: () => void;
    message: string;
};

interface GameResultModalProps {
    message: string;
    onPlayAgain: () => void;
}

const SettingsModal: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl'>Settings</h1>
        </div>
    )
};

const GameResultModal: React.FC<GameResultModalProps> = ({ message, onPlayAgain }) => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl'>{message}</h1>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onPlayAgain}>Play Again</button>
        </div>
    )
};

const LeaderBoardModal: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl'>Leaderboard</h1>
        </div>
    )
};

const WordleModal: React.FC<WordleModalProps> = ({ isOpen, onClose, onPlayAgain, message }) => {
    const modalType = useWordleUIStore((state) => state.modalType);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} hasCloseBtn={true}>
                {modalType === 'gameOver' ? <GameResultModal message={message} onPlayAgain={onPlayAgain} /> : modalType === 'settings' ? <SettingsModal /> : <LeaderBoardModal />}
            </Modal>
        </>
    )
};

export default WordleModal;