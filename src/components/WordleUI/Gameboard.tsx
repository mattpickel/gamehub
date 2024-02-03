import React from 'react';
import Row from './Row';

const Gameboard: React.FC = () => {

    return (
        <>
            <div className='space-y-2'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Row key={index} rowIndex={index} />
                ))}
            </div>
        </>
    )
}

export default Gameboard;