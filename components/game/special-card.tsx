import type { BoardSquare } from "@/types/game"
import { cn } from "@/lib/utils"

interface SpecialCardProps {
  square: BoardSquare
  className?: string
}

function getSpecialLabel(square: BoardSquare) {
  const name = square.name?.trim()
  if (name && name !== "?") return name
  if (square.type === "special") return "Special"
  return "Special"
}

export function SpecialCard({ square, className }: SpecialCardProps) {
  const label = getSpecialLabel(square)

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-1 rounded-sm bg-[#010F10] p-1 text-center text-[#00FFFF]",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <span
        className="text-[0.75rem] font-bold leading-none"
        style={{ fontFamily: "Orbitron, sans-serif" }}
        aria-hidden="true"
      >
        ?
      </span>
      <span
        className="line-clamp-2 text-[0.45rem] font-semibold uppercase leading-tight tracking-wide"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </span>
    </div>
  )
}

export default SpecialCard
