import React from 'react';
import Tile from './Tile';

interface RowProps {
    rowContent: string;
    rowStyle: string[];
}

const Row: React.FC<RowProps> = ({ rowContent, rowStyle }) => {
    return (
        <div className='flex space-x-1 sm:space-x-2'>
            {Array.from({ length: 5 }).map((_, index) => (
                <Tile key={index} value={rowContent.charAt(index)} tileStyle={rowStyle[index]}/>
            ))}
        </div>
    )
}

export default Row;