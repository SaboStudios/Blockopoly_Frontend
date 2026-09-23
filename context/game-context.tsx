'use client'

import React, { createContext, useContext, useState } from 'react'
import { GameContextProps, Player } from '@/types/game'

const GameContext = createContext<GameContextProps | undefined>(undefined)

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([])

  return (
    <GameContext.Provider value={{ players, setPlayers }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
