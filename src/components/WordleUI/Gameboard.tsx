import React from 'react';
import Row from './Row';

interface GameboardProps {
    rowStyles: string[][];
};

const Gameboard: React.FC<GameboardProps> = ({ rowStyles }) => {

    return (
        <>
            <div className='space-y-2'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Row key={index} rowIndex={index} rowStyle={rowStyles[index]}/>
                ))}
            </div>
        </>
    )
}

export default Gameboard;