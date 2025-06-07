"use client"

import { PropertyCard } from "../components/property-card"
import { CornerSpace } from "../components/corner-space"
import { Button } from "../components/ui/button"

const boardProperties = {
  top: [
    { name: "Free Parking", type: "corner" },
    { name: "LONDON", color: "bg-orange-500", price: 220, rent: 18, hasBuilding: true },
    { name: "MOSCOW", color: "bg-yellow-500", price: 240, rent: 20, hasFlag: true },
    { name: "BERLIN", color: "bg-yellow-500", price: 240, rent: 20, hasFlag: true },
    { name: "PARIS", color: "bg-red-500", price: 260, rent: 22, hasLandmark: true },
    { name: "MADRID", color: "bg-red-500", price: 260, rent: 22, hasLandmark: true },
    { name: "ROME", color: "bg-red-500", price: 280, rent: 24, hasPlane: true },
    { name: "Go to Jail", type: "corner" },
  ],
  right: [
    { name: "TORONTO", color: "bg-green-500", price: 300, rent: 26, hasBuilding: true },
    { name: "TORONTO", color: "bg-green-500", price: 300, rent: 26, hasBuilding: true },
    { name: "NEW YORK", color: "bg-green-500", price: 320, rent: 28, hasBuilding: true },
    { name: "NEW YORK", color: "bg-green-500", price: 320, rent: 28, hasBuilding: true },
  ],
  bottom: [
    { name: "Jail", type: "corner" },
    { name: "SYDNEY", color: "bg-blue-500", price: 350, rent: 35, hasLandmark: true },
    { name: "TAIPEI", color: "bg-blue-500", price: 350, rent: 35, hasBuilding: true },
    { name: "SHANGHAI", color: "bg-cyan-400", price: 400, rent: 50, hasBuilding: true },
    { name: "SEOUL", color: "bg-purple-500", price: 450, rent: 55, hasBuilding: true },
    { name: "TOKYO", color: "bg-purple-500", price: 500, rent: 60, hasPlane: true },
    { name: "GO", type: "corner" },
  ],
  left: [
    { name: "CAIRO", color: "bg-purple-600", price: 100, rent: 6, hasLandmark: true },
    { name: "CAIRO", color: "bg-purple-600", price: 100, rent: 6, hasLandmark: true },
    { name: "CAIRO", color: "bg-purple-600", price: 120, rent: 8, hasLandmark: true },
    { name: "CAIRO", color: "bg-purple-600", price: 120, rent: 8, hasLandmark: true },
  ],
}

export function GameBoard() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="relative w-[700px] h-[700px] bg-slate-900 rounded-lg">
        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold text-xl px-12 py-6 rounded-full">
            Play
          </Button>
        </div>

        {/* Top Row */}
        <div className="absolute top-0 left-0 right-0 flex">
          {boardProperties.top.map((property, index) => (
            <div key={index} className="flex-1">
              {property.type === "corner" ? (
                <CornerSpace name={property.name} />
              ) : (
                <PropertyCard {...property} orientation="top" />
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="absolute top-0 right-0 bottom-0 flex flex-col">
          <div className="h-24"></div>
          {boardProperties.right.map((property, index) => (
            <div key={index} className="flex-1">
              <PropertyCard {...property} orientation="right" />
            </div>
          ))}
          <div className="h-24"></div>
        </div>

        {/* Bottom Row */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-row-reverse">
          {boardProperties.bottom.map((property, index) => (
            <div key={index} className="flex-1">
              {property.type === "corner" ? (
                <CornerSpace name={property.name} />
              ) : (
                <PropertyCard {...property} orientation="bottom" />
              )}
            </div>
          ))}
        </div>

        {/* Left Column */}
        <div className="absolute top-0 left-0 bottom-0 flex flex-col-reverse">
          <div className="h-24"></div>
          {boardProperties.left.map((property, index) => (
            <div key={index} className="flex-1">
              <PropertyCard {...property} orientation="left" />
            </div>
          ))}
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  )
}
