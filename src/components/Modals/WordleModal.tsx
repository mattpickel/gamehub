import React from 'react';
import Modal from './Modal';
import { useWordleUIStore } from '../../stores/useWordleUIStore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import wordleHowToPlayImages from '../../assets/imgs/wordleHowToPlayImages.js';
import useFetchLeaderboard from '../../hooks/useFetchLeaderboard';

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
    inputProps: { checked?: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void },
    displayText: string,
};

const LeaderBoardModal: React.FC = () => {
    const { leaderboardData, loading, error } = useFetchLeaderboard(import.meta.env.VITE_DEV_API_URL);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>Leaderboard</h1>
            <h2 className='text-xl'>Highest Streak</h2>
            <ol className='text-center'>
                {leaderboardData.highestStreakLeaders.map((player, index) => (
                    <li key={index}>{player.username}: {player.score}</li>
                ))}
            </ol>
            <h2 className='text-xl'>Most Wins</h2>
            <ol className='text-center'>
                {leaderboardData.mostWinsLeaders.map((player, index) => (
                    <li key={index}>{player.username}: {player.score}</li>
                ))}
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
    const isScoreDisplayed = useWordleUIStore((state) => state.isScoreDisplayed);
    const setIsScoreDisplayed = useWordleUIStore((state) => state.setIsScoreDisplayed);

    // Define labels for settings switches
    const switchSettings: SwitchSetting[] = [
        { inputProps: { onChange: (event) => console.log(event) }, displayText: 'Dark Mode' },
        { inputProps: { onChange: (event) => console.log(event) }, displayText: 'Hard Mode' },
        { inputProps: { checked: isScoreDisplayed, onChange: (event) => setIsScoreDisplayed(event.target.checked)}, displayText: 'Show My Stats' }
    ];
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>Settings</h1>
            <FormGroup>
                {switchSettings.map((label, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Switch {...label.inputProps} />}
                        label={label.displayText}
                    />
                ))}
            </FormGroup>
        </div>
    )
};

const HelpModal: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-8 rounded-lg py-8 px-10 bg-gray-800 text-white'>
            <h1 className='text-3xl font-bold'>How To Play</h1>
            <h2 className='text-xl'>Guess the secret 5-letter word!</h2>
            <ul className='text-left'>
                <li>Letters will change color to based on accuracy.</li>
                <li>
                    <img src={wordleHowToPlayImages.exampleAllRight} alt='Example: Correct answer' className={'py-2'}></img>
                </li>
                <li>Green letters are in the right position.</li>
                <li>
                    <img src={wordleHowToPlayImages.exampleOneRight} alt='Example: Correct letter' className={'py-2'}></img>
                </li>
                <li>Yellow letters are in the word but out of place.</li>
                <li>
                    <img src={wordleHowToPlayImages.exampleOneMisplaced} alt='Example: Misplaced letter' className={'py-2'}></img>
                </li>
                <li>Grey letters are not in the word.</li>
                <li>
                    <img src={wordleHowToPlayImages.exampleAllWrong} alt='Example: Incorrect letters' className={'py-2'}></img>
                </li>
                <li>You have 6 tries to guess the word!</li>
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