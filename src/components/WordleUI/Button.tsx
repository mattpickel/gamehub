import React, { useRef } from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    const handleButtonClick = () => {
        onClick();
        console.log('test');
    };

    return (
        <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(event) => {
                handleButtonClick();
                (event.target as HTMLButtonElement).blur();
            }}
        >
            {text}
        </button>
    )
}

export default Button;