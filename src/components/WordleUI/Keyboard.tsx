import React from 'react';

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    letterStatusList: { letter: string, status: string }[];
};

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStatusList }) => {
    const rows: string[][] = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
    ];

    const handleKeyPress = (key: string) => {
        onKeyPress(key);
    };

    return (
        <div className='keyboard space-y-1'>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className='flex justify-center space-x-1'>
                    {row.map((key) => {
                        let status;
                        if (key.length === 1) {
                            status = letterStatusList[key.charCodeAt(0) - 65]?.status;
                        }
                        let className = ' bg-gray-200 text-gray-800 font-semibold rounded shadow text-sm sm:text-base md:text-lg ';
                        if (key.length > 1) {
                            className += ' flex-grow max-w-[60px] sm:max-w-[75px]';
                        } else {
                            className += ' w-8 h-12 sm:w-12 sm:h-14';
                        }
                        if (status === 'correct') {
                            className += ' bg-wordle-correct-color text-white';
                        } else if (status === 'incorrect') {
                            className += ' bg-wordle-incorrect-color text-white dark:bg-neutral-700';
                        } else if (status === 'misplaced') {
                            className += ' bg-wordle-misplaced-color text-white';
                        } else {
                            className += ' hover:bg-gray-300 dark:bg-neutral-400 dark:text-white';
                        }
                        return (
                            <button
                                key={key}
                                className={`${className} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
                                onClick={() => handleKeyPress(key)}
                            >
                                {key === 'DELETE' ? '⌫' : key === 'ENTER' ? '↵' : key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    )
}

export default Keyboard;