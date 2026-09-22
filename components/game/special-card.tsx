import React from 'react';
import { BoardSquare } from "@/types/game";
import { GrHelp } from 'react-icons/gr';

interface SpecialCardProps {
    square: BoardSquare;
}

const SPECIAL_LABELS: Record<string, string> = {
    '?': 'Chance',
    chance: 'Chance',
    'community chest': 'Community Chest',
    community_chest: 'Community Chest',
    communitychest: 'Community Chest',
};

const getAccessibleName = (square: BoardSquare): string => {
    const candidates = [square.name, square.type]
        .filter((value): value is string => typeof value === 'string')
        .map((value) => value.trim());

    for (const candidate of candidates) {
        const label = SPECIAL_LABELS[candidate.toLowerCase()];
        if (label) {
            return label;
        }
    }

    const readable = candidates.find((value) => value !== '?' && value.length > 0);
    return readable ?? 'Chance';
};

const SpecialCard = ({ square }: SpecialCardProps) => {
    const { position } = square;
    const accessibleName = getAccessibleName(square);

    const orientationClasses = {
        bottom: '',
        left: 'rotate-90',
        top: '',
        right: '-rotate-90',
    };

    return (
        <div
            className={`w-full h-full bg-[#0B191A] flex flex-col justify-center gap-0.5 items-center rounded-[2.5px] ${orientationClasses[position]}`}
            role="img"
            aria-label={accessibleName}
            title={accessibleName}
        >
            <GrHelp className="text-[#0FF0FC] size-4 md:size-6" aria-hidden="true" />
            <p className={`text-[4px] md:text-[5px] text-[#55656D] uppercase font-semibold`}>{accessibleName}</p>
        </div>
    );
};

export default SpecialCard;
