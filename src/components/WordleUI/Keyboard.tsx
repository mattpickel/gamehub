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
        <div className='keyboard'>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className='flex justify-center space-x-1 mb-2'>
                    {row.map((key) => {
                        let status;
                        if (key.length === 1) {
                            status = letterStatusList[key.charCodeAt(0) - 65]?.status;
                        }
                        let className = 'py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded shadow';
                        if (key.length > 1) {
                            className += ' flex-grow';
                        } else {
                            className += ' w-12 h-12';
                        }
                        if (status === 'correct') {
                            className += ' bg-wordle-correct-color';
                        } else if (status === 'incorrect') {
                            className += ' bg-wordle-incorrect-color';
                        } else if (status === 'misplaced') {
                            className += ' bg-wordle-misplaced-color';
                        }
                        return (
                            <button
                                key={key}
                                className={`${className} hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
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