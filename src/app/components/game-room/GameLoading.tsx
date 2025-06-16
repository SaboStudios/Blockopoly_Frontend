"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import board from '@/app/assets/board.png';

// import { useGameRoom } from "@/app/contexts/GameRoomContext";

export default function GameLoading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length < 5 ? prev + "A" : ""));
    }, 300);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#010f10] flex items-center justify-center text-center p-4 text-white">
      <Image
        src={board}
        alt="board"
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xs pointer-events-none z-0"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      />

      <div className="max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Loading Game</h2>
        <p className="text-lg md:text-xl">
          Always remember to strategize properly and...
          <br />
          <span className="font-semibold">show no mercy!</span>
        </p>
        <p className="mt-8 text-xl md:text-3xl animate-pulse">
          😈MUAHAHAHAHAHA{dots}😈
        </p>
      </div>
    </div>
  );
}
