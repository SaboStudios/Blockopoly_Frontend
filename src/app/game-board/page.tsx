"use client"

import { GameHeader } from "./components/game-header"
import { GameSidebar } from "./components/game-sidebar"
import { GameBoard } from "./components/game-board"
import { ChatSidebar } from "./components/chat-sidebar"

export default function GamePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <GameHeader />
      <div className="flex">
        <GameSidebar />
        <main className="flex-1 p-6">
          <GameBoard />
        </main>
        <ChatSidebar />
      </div>
    </div>
  )
}
