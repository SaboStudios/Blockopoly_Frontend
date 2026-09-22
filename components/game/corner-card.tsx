import React from 'react';
import Image from 'next/image';
import { BoardSquare } from "@/types/game";

interface CornerCardProps {
    square: BoardSquare;
}

const CornerCard = ({ square }: CornerCardProps) => {
    return (
        <div
            className="w-full h-full bg-[#F0F7F7] flex flex-col justify-center items-center text-[#0B191A] rounded-[2.5px] p-0.5"
            aria-label={square.name}
        >
            {square.icon && (
                <Image
                    src={square.icon}
                    alt={square.name ? `${square.name} corner tile icon` : "Corner tile icon"}
                    width={48}
                    height={48}
                    className="w-full h-full"
                />
            )}
        </div>
    );
};

export default CornerCard;
