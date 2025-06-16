//src/app/gameroom/page.tsx
"use client";

import React from "react";
import Navbar from "@/app/components/navbar";
import { GameRoomProvider } from "@/app/contexts/GameRoomContext";
import GameRoomContent from "@/app/components/game-room/GameRoomContent";

export default function GameRoomPage() {
  return (
    <>
      <Navbar />

      <GameRoomProvider>
        <GameRoomContent />
      </GameRoomProvider >
    </>
  );
}
