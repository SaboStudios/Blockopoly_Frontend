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
    chest: 'Community Chest',
    tax: 'Tax',
    'free parking': 'Free Parking',
    freeparking: 'Free Parking',
    'go to jail': 'Go To Jail',
    gotojail: 'Go To Jail',
    jail: 'Jail',
    go: 'Go',
};

const getSpecialLabel = (square: BoardSquare): string => {
    const candidates = [square.name, square.type]
        .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
        .map((value) => value.trim().toLowerCase());

    for (const candidate of candidates) {
        if (SPECIAL_LABELS[candidate]) {
            return SPECIAL_LABELS[candidate];
        }
    }

    return 'Special';
};

const SpecialCard = ({ square }: SpecialCardProps) => {
    const { position } = square;
    const label = getSpecialLabel(square);

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
            aria-label={label}
            title={label}
        >
            <GrHelp className="text-[#0FF0FC] size-4 md:size-6" aria-hidden="true" />
            <p className={`text-[4px] md:text-[5px] text-[#55656D] uppercase font-semibold`}>{label}</p>
        </div>
    );
};

export default SpecialCard;
