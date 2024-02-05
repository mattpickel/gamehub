import React from 'react';
import Tile from './Tile';
import useRowContent from '../../hooks/useRowContent';

interface RowProps {
    rowIndex: number;
    rowStyle: string[];
}

const Row: React.FC<RowProps> = ({ rowIndex, rowStyle }) => {
    const getRowContent = useRowContent(rowIndex);
    const rowContent: string = getRowContent();
    
    return (
        <div className='flex space-x-2'>
            {Array.from({ length: 5 }).map((_, index) => (
                <Tile key={index} value={rowContent.charAt(index)} tileStyle={rowStyle[index]}/>
            ))}
        </div>
    )
}

export default Row;