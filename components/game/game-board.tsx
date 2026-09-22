"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const GameBoard = () => {
  const router = useRouter();

  const handlePlay = () => {
    router.push("/join-room");
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Button
        onClick={handlePlay}
        className="rounded-full px-10 py-6 text-lg font-semibold"
      >
        Play
      </Button>
    </div>
  );
};

export default GameBoard;
