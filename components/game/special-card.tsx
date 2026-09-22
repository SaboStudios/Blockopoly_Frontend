import React from 'react';
import { BoardSquare } from "@/types/game";
import { GrHelp } from 'react-icons/gr';

interface SpecialCardProps {
    square: BoardSquare;
}

/**
 * SpecialCard renders a non-property board space (e.g. Chance, Community Chest,
 * tax, railroad, utility). It is a thin, data-driven wrapper around the shared
 * BoardSpace primitive so that name/icon/aria-label all come from
 * `data/board-data.ts` instead of being hardcoded per space.
 *
 * The `orientation` prop is derived from the space's grid position by the
 * layout engine (see GameBoard) so the label reads correctly on every edge of
 * the board. On mobile the board collapses to a "current space + strip"
 * metaphor, in which case the strip renders these cards at a fixed upright
 * orientation.
 */
const SpecialCard = ({ square }: SpecialCardProps) => {
    const { position, name, icon } = square;

    const orientationClasses = {
        bottom: '',
        left: 'rotate-90',
        top: '',
        right: '-rotate-90',
    };

    const label = name ?? 'Special';
    const Icon = icon ?? GrHelp;

    return (
        <div
            role="gridcell"
            aria-label={`${label} space`}
            className={`w-full h-full bg-[#0B191A] flex flex-col justify-center gap-0.5 items-center rounded-[2.5px] ${orientationClasses[position]}`}
        >
            <Icon aria-hidden="true" className="text-[#0FF0FC] size-4 md:size-6" />
            <p className={`text-[4px] md:text-[5px] text-[#55656D] uppercase font-semibold`}>{label}</p>
        </div>
    );
};

export default SpecialCard;
