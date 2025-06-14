"use client"

import { Card } from "../components/ui/card"

interface CornerSpaceProps {
  name: string
}

export function CornerSpace({ name }: CornerSpaceProps) {
  const getCornerContent = () => {
    switch (name) {
      case "GO":
        return (
          <div className="text-center p-2">
            <div className="text-lg font-bold">GO</div>
            <div className="text-xs">Collect ⊕200</div>
          </div>
        )
      case "Jail":
        return (
          <div className="text-center p-2">
            <div className="text-sm font-bold">JAIL</div>
            <div className="text-xs">Just Visiting</div>
          </div>
        )
      case "Free Parking":
        return (
          <div className="text-center p-2">
            <div className="text-sm font-bold">FREE</div>
            <div className="text-sm font-bold">PARKING</div>
          </div>
        )
      case "Go to Jail":
        return (
          <div className="text-center p-2">
            <div className="text-sm font-bold">GO TO</div>
            <div className="text-sm font-bold">JAIL</div>
          </div>
        )
      default:
        return <div className="text-sm font-bold p-2">{name}</div>
    }
  }

  return (
    <Card className="w-24 h-24 bg-white text-black border border-gray-300 flex items-center justify-center">
      {getCornerContent()}
    </Card>
  )
}
