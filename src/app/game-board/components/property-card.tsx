interface PropertyCardProps {
  name: string
  price?: string
  color: string
  type: "property" | "corner" | "chance" | "utility" | "tax"
  icon?: string
  rotation?: number
}

export function PropertyCard({ name, price, color, type, icon, rotation = 0 }: PropertyCardProps) {
  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      brown: "bg-amber-800",
      lightblue: "bg-sky-300",
      pink: "bg-pink-400",
      orange: "bg-orange-500",
      red: "bg-red-500",
      yellow: "bg-yellow-400",
      green: "bg-green-500",
      blue: "bg-blue-600",
      purple: "bg-purple-600",
      cyan: "bg-cyan-400",
    }
    return colorMap[color] || "bg-gray-400"
  }

  if (type === "corner") {
    return (
      <div
        className="w-24 h-24 bg-white border-2 border-black flex items-center justify-center text-xs font-bold text-center p-1"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {icon && <span className="text-2xl ">{icon}</span>}
        <span className="text-[8px] leading-tight">{name}</span>
      </div>
    )
  }

  if (type === "chance") {
    return (
      <div
        className="w-16 h-24 bg-black border border-black flex flex-col items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="text-2xl text-cyan-500 font-bold ">?</div>
        <div className="text-[8px] font-bold text-center px-1">{name}</div>
      </div>
    )
  }

  return (
    <div
      className="w-16 h-24 bg-white border border-black flex flex-col"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className={`h-4 ${getColorClass(color)}`}></div>
      <div className="flex-1 flex flex-col justify-between p-1">
        <div className="text-[8px] font-bolder text-black text-center leading-tight">{name}</div>
        {price && <div className="text-[7px] text-center font-semibold text-black">{price}</div>}
      </div>
    </div>
  )
}
