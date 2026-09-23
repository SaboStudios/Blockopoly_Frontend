import type { BoardSquare } from "@/types/game"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  square: BoardSquare
  className?: string
}

function formatPrice(price?: number) {
  if (price === undefined || price === null) return "—"
  return `$${price.toLocaleString("en-US")}`
}

export function PropertyCard({ square, className }: PropertyCardProps) {
  const price = formatPrice(square.price)

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-between gap-1 rounded-sm bg-[#F0F7F7] p-1 text-center text-[#010F10]",
        className,
      )}
    >
      <span
        className="line-clamp-2 text-[0.5rem] font-semibold uppercase leading-tight tracking-wide"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {square.name}
      </span>
      <span
        className="text-[0.5rem] font-bold text-[#010F10]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        aria-label={`Price ${price}`}
      >
        {price}
      </span>
    </div>
  )
}

export default PropertyCard