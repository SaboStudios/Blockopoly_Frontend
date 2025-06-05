"use client";

import { useState, useEffect } from "react";
import LoadingProgress from "../components/loadingProgress";

export default function GameLoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs z-10"
        style={{
          backgroundImage: `url('/background.png')`,
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="text-center z-10 mb-16">
          <h1 className="text-[24px] text-[#F0F7F7] font-bold mb-2">
            Loading Game
          </h1>
          <p className="text-[#869298] text-[14px] mb-4">
            Always remember to show stategize properly and...
          </p>
          <p className="text-[#869298] text-[14px] uppercase">show no mercy!</p>
          <p className="text-[#869298] text-[14px] mb-3">
            😈MUAHAHAHAHAHAHAHAHAHAHAHAHAH😈
          </p>
          <LoadingProgress progress={progress} />
        </div>
      </div>
    </main>
  );
}
