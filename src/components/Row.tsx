import React from 'react';
import Tile from './Tile';
import useRowContent from '../hooks/useRowContent';

interface GameboardProps {
    rowIndex: number;
}

const Gameboard: React.FC<GameboardProps> = ({ rowIndex }) => {
    const getRowContent = useRowContent(rowIndex);
    const rowContent: string = getRowContent();

    return (
        <div className='flex space-x-2'>
            {Array.from({ length: 5 }).map((_, index) => (
                <Tile key={index} value={rowContent.charAt(index)} />
            ))}
        </div>
    )
}

export default Gameboard;