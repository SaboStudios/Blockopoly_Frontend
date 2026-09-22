'use client';

import { GameContextProps } from '@/types/game';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const GameContext = createContext<GameContextProps | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [isAppearanceModalOpen, setAppearanceModalOpen] = useState(true); // Open by default
    const [players, setPlayers] = useState<any[]>([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [playerName, setPlayerName] = useState('');

    // TODO: Add useEffect hooks here to fetch initial game state from Dojo

    // Required fields must be set before the game can be started.
    const canStart = playerName.trim().length > 0 && selectedColor.trim().length > 0;

    const value = {
        isAppearanceModalOpen,
        setAppearanceModalOpen,
        players,
        setPlayers,
        selectedColor,
        setSelectedColor,
        playerName,
        setPlayerName,
        canStart,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}


export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}