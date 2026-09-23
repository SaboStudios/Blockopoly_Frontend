"use client";

import Image from "next/image";
import { BoardSquare } from "@/types/game";
import { cn } from "@/lib/utils";

interface CornerCardProps {
  square: BoardSquare;
  className?: string;
}

export function CornerCard({ square, className }: CornerCardProps) {
  const { name, icon } = square;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-sm bg-[#C8E6C9] p-1 text-center",
        className
      )}
      aria-label={name}
    >
      {icon ? (
        <Image
          src={icon}
          alt={name}
          width={64}
          height={64}
          className="h-auto w-full max-w-[64px] object-contain"
        />
      ) : (
        <span className="text-[10px] font-semibold uppercase leading-tight text-[#1B5E20]">
          {name}
        </span>
      )}
    </div>
  );
}
