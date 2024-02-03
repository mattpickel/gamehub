import React from 'react';
import Tile from './Tile';
import useRowContent from '../hooks/useRowContent';
import useRowStyle from '../hooks/useRowStyle';

interface RowProps {
    rowIndex: number;
}

const Row: React.FC<RowProps> = ({ rowIndex }) => {
    const getRowContent = useRowContent(rowIndex);
    const rowContent: string = getRowContent();

    const answer: string = 'APPLE';
    const getRowStyles = useRowStyle(rowIndex, answer);
    const rowStyles: string[] = getRowStyles;
    
    return (
        <div className='flex space-x-2'>
            {Array.from({ length: 5 }).map((_, index) => (
                <Tile key={index} value={rowContent.charAt(index)} tileStyle={rowStyles[index]}/>
            ))}
        </div>
    )
}

export default Row;