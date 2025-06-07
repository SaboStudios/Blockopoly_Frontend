"use client"

import { Card } from "../components/ui/card"
import { Building, Flag, Landmark, Plane, HelpCircle } from "lucide-react"

interface PropertyCardProps {
  name: string
  color?: string
  price?: number
  // rent?: number
  type?: string
  orientation: "top" | "right" | "bottom" | "left"
  hasBuilding?: boolean
  hasFlag?: boolean
  hasLandmark?: boolean
  hasPlane?: boolean
}

export function PropertyCard({
  name,
  color,
  price,
  // rent,
  type,
  orientation,
  hasBuilding,
  hasFlag,
  hasLandmark,
  hasPlane,
}: PropertyCardProps) {
  const isVertical = orientation === "left" || orientation === "right"

  const getIcon = () => {
    if (hasBuilding) return <Building className="w-6 h-6 text-gray-600" />
    if (hasFlag) return <Flag className="w-6 h-6 text-gray-600" />
    if (hasLandmark) return <Landmark className="w-6 h-6 text-gray-600" />
    if (hasPlane) return <Plane className="w-6 h-6 text-gray-600" />
    return <HelpCircle className="w-6 h-6 text-cyan-400" />
  }

  const getCardContent = () => {
    if (type === "chance" || type === "community") {
      return (
        <div className="flex items-center justify-center h-full">
          <HelpCircle className="w-8 h-8 text-cyan-400" />
        </div>
      )
    }

    return (
      <div className={`p-2 h-full flex flex-col ${isVertical ? "w-24" : "w-full"}`}>
        {/* Color bar */}
        {color && <div className={`${color} ${isVertical ? "h-full w-4 mb-2" : "h-4 w-full mb-2"}`}></div>}

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-2">{getIcon()}</div>
          <div className="text-xs font-bold mb-1">{name}</div>
          {price && <div className="text-xs text-gray-600">⊕{price}</div>}
        </div>
      </div>
    )
  }

  return (
    <Card
      className={`
      bg-white text-black border border-gray-300
      ${isVertical ? "h-full w-24" : "w-full h-24"}
      ${orientation === "left" ? "transform -rotate-90" : ""}
      ${orientation === "right" ? "transform rotate-90" : ""}
    `}
    >
      {getCardContent()}
    </Card>
  )
}
