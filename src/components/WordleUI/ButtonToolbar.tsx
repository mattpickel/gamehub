import React from 'react';
import Button from './Button';

interface ButtonToolbarProps {
    buttons: { text: string, onClick: () => void }[];
}

const ButtonToolbar: React.FC<ButtonToolbarProps> = ({ buttons }) => {
    return (
        <div className='flex justify-center space-x-4'>
            {buttons.map((button, index) => <Button key={index} text={button.text} onClick={button.onClick} />)}
        </div>
    )
}

export default ButtonToolbar;