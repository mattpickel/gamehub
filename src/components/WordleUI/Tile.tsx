import React from 'react';

interface TileProps {
    value: string;
    tileStyle: string;
}

const Tile: React.FC<TileProps> = ({ value, tileStyle }) => {
    return (
        <div className={`w-16 h-16 border-black border-2 flex items-center justify-center font-bold text-3xl ${tileStyle}`}>
            {value}
        </div>
    )
}

export default Tile;