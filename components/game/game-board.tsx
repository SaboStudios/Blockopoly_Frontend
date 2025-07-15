import { BoardSquare } from '@/types/game';
import React from 'react'
import PropertyCard from './property-card';
import SpecialCard from './special-card';
import CornerCard from './corner-card';
import { boardData } from '@/data/board-data';

const GameBoard = () => {

    const getGridPosition = (square: BoardSquare) => {
        return {
            gridRowStart: square.gridPosition.row,
            gridColumnStart: square.gridPosition.col,
        };
    };

    return (
        <div className="w-full h-full flex justify-center items-center"
        >
            {/* Aspect ratio container to keep the board square and responsive */}
            <div className="w-full max-w-[670px] bg-[#010F10] aspect-square relative shadow-2xl shadow-cyan-500/10">
                {/* The main board grid */}
                <div className="grid grid-cols-11 grid-rows-11 w-full h-full">

                    {/* Center Area */}
                    <div className="col-start-2 col-span-9 row-start-2 row-span-9 bg-[#010F10] flex flex-col justify-center items-center p-4">
                        <h1 className="text-2xl lg:text-4xl font-bold text-[#F0F7F7] font-orbitron text-center">BLOCKOPOLY</h1>
                        <button className="mt-8 px-10 py-3 bg-[#00FFFF] text-black text-xl lg:text-2xl font-bold rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.8)] transition-shadow hover:shadow-[0_0_25px_rgba(0,255,255,1)]">
                            Play
                        </button>
                    </div>

                    {/* Render all 40 squares from the data file */}
                    {boardData.map((square) => (
                        <div key={square.id} style={getGridPosition(square)}>
                            {square.type === 'property' && <PropertyCard square={square} />}
                            {square.type === 'special' && <SpecialCard square={square} />}
                            {square.type === 'corner' && <CornerCard square={square} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GameBoard