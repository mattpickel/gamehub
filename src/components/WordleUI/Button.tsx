import React from 'react';

interface ButtonProps {
    icon: JSX.Element;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, onClick }) => {
    return (
        <button 
            className='bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-2.5 rounded' onClick={onClick}
        >
            {icon}
        </button>
    )
}

export default Button;