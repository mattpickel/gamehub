import React from 'react';

interface TileProps {
    value: string;
}

const Tile: React.FC<TileProps> = ({ value }) => {
    return (
        <div className="w-16 h-16 border-black border-2 flex items-center justify-center font-bold text-3xl">
            {value}
        </div>
    )
}

export default Tile;