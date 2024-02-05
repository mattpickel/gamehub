import React from 'react';
import Modal from './Modal';

interface GameResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPlayAgain: () => void;
    message: string;
};

const GameResultModal: React.FC<GameResultModalProps> = ({ isOpen, onClose, onPlayAgain, message }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} hasCloseBtn={true}>
                <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
                    <h1 className='text-3xl'>{message}</h1>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onPlayAgain}>Play Again</button>
                </div>
            </Modal>
        </>
    )
};

export default GameResultModal;