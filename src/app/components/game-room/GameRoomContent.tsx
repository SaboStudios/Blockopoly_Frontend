"use client";

import React from "react";
import Navbar from "../../components/navbar";
import { useGameRoom } from "@/app/contexts/GameRoomContext";
import GameSettings from "./GameSettings";
import GameLoading from "./GameLoading";

export default function GameRoomContent() {
  const { state } = useGameRoom();

  return (
    <div className="relative min-h-screen">
      {/* Board Background - Fixed positioning */}

      {/* Content with proper spacing */}
      <div className="relative">
        <Navbar />
        
        <div className="pt-16"> {/* Add padding to prevent navbar overlap */}
          {!state?.settings ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-xl bg-white/90 px-6 py-4 rounded-lg shadow-md">
                Loading settings...
              </div>
            </div>
          ) : state.gameStarted ? (
            // Simplified condition - if game is started, always show loading
            // No check for isLoading since we want to stay in loading permanently
            <GameLoading />
          ) : (
            <GameSettings />
          )}
        </div>
      </div>
    </div>
  );
}