import React from 'react';
import Image from 'next/image';
import { BoardSquare } from "@/types/game";

interface PropertyCardProps {
    square: BoardSquare;
}

const PropertyCard = ({ square }: PropertyCardProps) => {
    const { name, price, color, position, icon } = square;

    // Define classes for different orientations
    const orientationClasses = {
        bottom: 'border-t-8',
        left: 'border-t-8 rotate-90',
        top: 'border-b-8',
        right: 'border-t-8 -rotate-90',
    };

    const priceOrientationClasses = {
        bottom: 'bottom-0.5 right-0.5',
        left: 'bottom-[30%] -right-0.5 transform -rotate-90',
        top: 'bottom-0.5 right-0.5',
        right: 'transform rotate-90 bottom-[30%] -left-0.5',
    }

    const imageOrientationClasses = {
        bottom: '',
        left: '-rotate-90',
        top: '',
        right: 'rotate-90',
    }

    return (
        <div
            className={`relative w-full h-full bg-[#F0F7F7] text-[#0B191A] p-1 flex flex-col justify-between rounded-[2.5px] ${orientationClasses[position]}`}
            style={{ borderColor: color }}
        >
            <div className={`flex flex-col items-center `}>
                <p className="text-[5px] md:text-[5px] font-bold uppercase text-center">{name}</p>
                {/* You will need to provide the images for each property */}
                {icon && <Image src={icon} alt={name} width={25} height={25} className={`my-1 transform ${imageOrientationClasses[position]}`} />}
            </div>
            <p className={`text-[5px] md:text-[6px] absolute font-semibold bg-[#F0F7F7] shadow-sm p-0.5 rounded-[3px] ${priceOrientationClasses[position]}`}>${price}</p>
        </div>
    );
};

export default PropertyCard;
