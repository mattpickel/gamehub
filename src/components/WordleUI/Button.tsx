import React from 'react';

interface ButtonProps {
    icon: JSX.Element;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, onClick }) => {
    return (
        <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded' onClick={(event) => {
                onClick();
                (event.target as HTMLButtonElement).blur();
            }}
        >
            {icon}
        </button>
    )
}

export default Button;