import React from 'react';
import { BoardSquare } from "@/types/game";
import { GrHelp } from 'react-icons/gr';

interface SpecialCardProps {
    square: BoardSquare;
}

const SpecialCard = ({ square }: SpecialCardProps) => {
    const { position } = square;

    const orientationClasses = {
        bottom: '',
        left: 'rotate-90',
        top: '',
        right: '-rotate-90',
    };

    return (
        <div className={`w-full h-full bg-[#0B191A] flex flex-col justify-center gap-0.5 items-center rounded-[2.5px] ${orientationClasses[position]}`}>
            <GrHelp className="text-[#0FF0FC] size-4 md:size-6" />
            <p className={`text-[4px] md:text-[5px] text-[#55656D] uppercase font-semibold`}>Chance</p>
        </div>
    );
};

export default SpecialCard;
