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
    communitychest: 'Community Chest',
    chest: 'Community Chest',
};

const getAccessibleLabel = (square: BoardSquare): string => {
    const name = (square.name ?? '').trim();
    const type = (square.type ?? '').trim();

    const byName = SPECIAL_LABELS[name.toLowerCase()];
    if (byName) return byName;

    const byType = SPECIAL_LABELS[type.toLowerCase()];
    if (byType) return byType;

    if (name && name !== '?') return name;
    if (type && type !== '?') return type;

    return 'Chance';
};

const SpecialCard = ({ square }: SpecialCardProps) => {
    const { position } = square;
    const accessibleLabel = getAccessibleLabel(square);

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
            aria-label={accessibleLabel}
            title={accessibleLabel}
        >
            <GrHelp className="text-[#0FF0FC] size-4 md:size-6" aria-hidden="true" />
            <p className={`text-[4px] md:text-[5px] text-[#55656D] uppercase font-semibold`}>{accessibleLabel}</p>
        </div>
    );
};

export default SpecialCard;
