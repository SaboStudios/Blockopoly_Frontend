'use client'
import React, { createContext, useContext, useState } from 'react'

interface GameContextType {
    isAppearanceModalOpen: boolean
    setAppearanceModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAppearanceModalOpen, setAppearanceModalOpen] = useState(false)

    return (
        <GameContext.Provider value={{ isAppearanceModalOpen, setAppearanceModalOpen }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider')
    }
    return context
}
