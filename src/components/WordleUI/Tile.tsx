import React from 'react';

interface TileProps {
    value: string;
    tileStyle: string;
}

const Tile: React.FC<TileProps> = ({ value, tileStyle }) => {
    return (
        <div className={`w-12 h-12 sm:w-16 sm:h-16 border-black border-2 flex items-center justify-center font-bold text-lg sm:text-3xl ${tileStyle}`}>
            {value}
        </div>
    )
}

export default Tile;