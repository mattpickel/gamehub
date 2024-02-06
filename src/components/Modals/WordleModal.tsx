import React from 'react';
import Modal from './Modal';
import { useWordleUIStore } from '../../stores/useWordleUIStore';
import Switch from '@mui/material/Switch';

interface WordleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPlayAgain: () => void;
    onRestart: () => void;
    message: string;
};

interface RestartModalProps {
    onRestart: () => void;
};

interface GameResultModalProps {
    message: string;
    onPlayAgain: () => void;
};

// Type definition for settings switch props
type SwitchSetting = { 
    inputProps: { inputProps: { 'aria-label': string } },
    displayText: string; 
};

// Define labels for settings switches
const switchSettings: SwitchSetting[] = [
    { inputProps: { inputProps: { 'aria-label': 'Dark Mode' } }, displayText: 'Dark Mode' },
    { inputProps: { inputProps: { 'aria-label': 'Hard Mode' } }, displayText: 'Hard Mode' },
    { inputProps: { inputProps: { 'aria-label': 'Show My Stats' } }, displayText: 'Show My Stats' }
];

const LeaderBoardModal: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>Leaderboard</h1>
            <h2 className='text-xl'>Highest Streak</h2>
            <ol className='text-left'>
                <li>Player 1: 10</li>
                <li>Player 2: 9</li>
                <li>Player 3: 8</li>
            </ol>
            <h2 className='text-xl'>Most Wins</h2>
            <ol className='text-left'>
                <li>Player 1: 83</li>
                <li>Player 2: 76</li>
                <li>Player 3: 54</li>
            </ol>
            <h2 className='text-xl'>Best Win Percentage</h2>
            <ol className='text-left'>
                <li>Player 1: 87%</li>
                <li>Player 2: 84%</li>
                <li>Player 3: 76%</li>
            </ol>
        </div>
    )
};

const RestartModal: React.FC<RestartModalProps> = ({ onRestart }) => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>Restart</h1>
            <h2 className='text-xl'>Restarting the game will count as a loss.</h2>
            <h2 className='text-xl'>Are you sure you want to restart?</h2>
            <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={onRestart} >Restart</button>
        </div>
    )
};

const SettingsModal: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>Settings</h1>
            <ul className='text-left flex flex-col'>
                 {switchSettings.map((label, index) => (
                    <li key={index}>
                        <Switch {...label.inputProps} /> {label.displayText}
                    </li>
                ))}
            </ul>
        </div>
    )
};

const HelpModal: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>How To Play</h1>
            <h2 className='text-xl'>Guess the secret 5-letter word</h2>
            <ul className='text-left'>
                <li>Letters will change color to based on accuracy.</li>
                <li>Green letters are in the right position.</li>
                <li>Yellow letters are in the word but out of place.</li>
                <li>Grey letters are not in the word.</li>
                <li>You have 6 tries to guess the word.</li>
            </ul>
        </div>
    )
};

const GameResultModal: React.FC<GameResultModalProps> = ({ message, onPlayAgain }) => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>{message}</h1>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onPlayAgain}>Play Again</button>
        </div>
    )
};

const WordleModal: React.FC<WordleModalProps> = ({ isOpen, onClose, onPlayAgain, message, onRestart }) => {
    const modalType = useWordleUIStore((state) => state.modalType);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} hasCloseBtn={true}>
                {modalType === 'gameOver' ? <GameResultModal message={message} onPlayAgain={onPlayAgain} /> 
                : modalType === 'settings' ? <SettingsModal /> 
                : modalType === 'leaderboard' ? <LeaderBoardModal /> 
                : modalType === 'restart' ? <RestartModal onRestart={onRestart} />
                : <HelpModal />}
            </Modal>
        </>
    )
};

export default WordleModal;