import { BoardSquare } from "@/types/game";
import { cn, formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  square: BoardSquare;
  className?: string;
}

export function PropertyCard({ square, className }: PropertyCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-md bg-[#010F10] p-2 text-center",
        className
      )}
    >
      <span
        className="font-orbitron text-xs font-semibold text-[#00FFFF]"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {square.name}
      </span>
      <span
        className="text-[10px] text-[#00FFFF]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {formatCurrency(square.price)}
      </span>
    </div>
  );
}
