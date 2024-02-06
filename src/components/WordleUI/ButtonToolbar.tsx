import React from 'react';
import Button from './Button';

interface ButtonToolbarProps {
    buttons: { icon: JSX.Element, onClick: () => void }[];
}

const ButtonToolbar: React.FC<ButtonToolbarProps> = ({ buttons }) => {
    return (
        <div className='flex justify-center space-x-8'>
            {buttons.map((button, index) => <Button key={index} icon={button.icon} onClick={button.onClick} />)}
        </div>
    )
}

export default ButtonToolbar;