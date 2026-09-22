import React from 'react';
import Image from 'next/image';
import { BoardSquare } from "@/types/game";

interface PropertyCardProps {
    square: BoardSquare;
}

/**
 * Shared BoardSpace primitive.
 *
 * All board space cards (property, special, corner) render through this
 * primitive so that price formatting, alt text, and aria-labels stay
 * consistent across the board. Layout is derived from the space's
 * `position` (edge of the board) rather than hardcoded per-space values.
 */
export const formatPrice = (price?: number): string => {
    if (price === undefined || price === null) return '';
    return `$${price.toLocaleString('en-US')}`;
};

interface BoardSpaceProps {
    square: BoardSquare;
    /** Optional extra classes for the outer space container. */
    className?: string;
    /** Optional content rendered inside the space (e.g. tokens, badges). */
    children?: React.ReactNode;
}

const orientationClasses = {
    bottom: 'border-t-8',
    left: 'border-t-8 rotate-90',
    top: 'border-b-8',
    right: 'border-t-8 -rotate-90',
} as const;

const priceOrientationClasses = {
    bottom: 'bottom-0.5 right-0.5',
    left: 'bottom-[30%] -right-0.5 transform -rotate-90',
    top: 'bottom-0.5 right-0.5',
    right: 'transform rotate-90 bottom-[30%] -left-0.5',
} as const;

const imageOrientationClasses = {
    bottom: '',
    left: '-rotate-90',
    top: '',
    right: 'rotate-90',
} as const;

/**
 * BoardSpace — the single primitive every board space is built from.
 *
 * Accessibility: each space is a focusable, labelled region so keyboard
 * users can move focus across the board and activate the current
 * actionable space. The aria-label combines the space name and price.
 */
export const BoardSpace = ({ square, className = '', children }: BoardSpaceProps) => {
    const { name, price, color, position, icon } = square;
    const formattedPrice = formatPrice(price);
    const ariaLabel = formattedPrice ? `${name}, ${formattedPrice}` : name;

    return (
        <div
            role="gridcell"
            tabIndex={0}
            aria-label={ariaLabel}
            data-position={position}
            className={`relative w-full h-full bg-[#F0F7F7] text-[#0B191A] p-1 flex flex-col justify-between rounded-[2.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B191A] ${orientationClasses[position]} ${className}`}
            style={{ borderColor: color }}
        >
            <div className="flex flex-col items-center">
                <p className="text-[5px] md:text-[5px] font-bold uppercase text-center">{name}</p>
                {icon && (
                    <Image
                        src={icon}
                        alt={`${name} icon`}
                        width={25}
                        height={25}
                        className={`my-1 transform ${imageOrientationClasses[position]}`}
                    />
                )}
            </div>
            {formattedPrice && (
                <p className={`text-[5px] md:text-[6px] absolute font-semibold bg-[#F0F7F7] shadow-sm p-0.5 rounded-[3px] ${priceOrientationClasses[position]}`}>
                    {formattedPrice}
                </p>
            )}
            {children}
        </div>
    );
};

const PropertyCard = ({ square }: PropertyCardProps) => {
    return <BoardSpace square={square} />;
};

export default PropertyCard;
