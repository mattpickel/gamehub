import React from 'react';
import Row from './Row';

interface GameboardProps {
    rowContents: string[];
    rowStyles: string[][];
};

const Gameboard: React.FC<GameboardProps> = ({ rowContents, rowStyles }) => {

    return (
        <>
            <div className='space-y-1 sm:space-y-2'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Row key={index} rowContent={rowContents[index]} rowStyle={rowStyles[index]}/>
                ))}
            </div>
        </>
    )
}

export default Gameboard;