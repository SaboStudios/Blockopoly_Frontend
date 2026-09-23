"use client";

import Image from "next/image";
import { BoardSquare } from "@/types/game";
import { cn } from "@/lib/utils";

interface CornerCardProps {
  square: BoardSquare;
  className?: string;
}

const CornerCard = ({ square }: CornerCardProps) => {
    return (
        <div
            className="w-full h-full bg-[#F0F7F7] flex flex-col justify-center items-center text-[#0B191A] rounded-[2.5px] p-0.5"
            aria-label={square.name}
        >
            {square.icon && (
                <Image
                    src={square.icon}
                    alt={square.name ? `${square.name} corner tile icon` : "Corner tile icon"}
                    width={48}
                    height={48}
                    className="w-full h-full"
                />
            )}
        </div>
    );
};

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
