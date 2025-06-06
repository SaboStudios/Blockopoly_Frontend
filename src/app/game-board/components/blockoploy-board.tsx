"use client"

import { PropertyCard } from "../../game-board/components/property-card"

export default function BlockopolyBoard() {
  const topProperties = [
    { name: "FREE PARKING", type: "corner" as const, color: "", rotation: 0 },
    { name: "STRAND", type: "property" as const, color: "red", price: "£220", rotation: 0 },
    { name: "CHANCE", type: "chance" as const, color: "", rotation: 0 },
    { name: "FLEET ST", type: "property" as const, color: "red", price: "£220", rotation: 0 },
    { name: "TRAFALGAR SQ", type: "property" as const, color: "red", price: "£240", rotation: 0 },
    { name: "FENCHURCH ST STATION", type: "chance" as const, color: "lightblue", price: "£200", rotation: 0 },
    { name: "LEICESTER SQ", type: "property" as const, color: "yellow", price: "£260", rotation: 0 },
    { name: "COVENTRY ST", type: "property" as const, color: "yellow", price: "£260", rotation: 0 },
    { name: "WATER WORKS", type: "chance" as const, color: "lightblue", price: "£150", rotation: 0 },
    { name: "PICCADILLY", type: "property" as const, color: "yellow", price: "£280", rotation: 0 },
    { name: "GO TO JAIL", type: "corner" as const, color: "", rotation: 0 },
  ]

  const rightProperties = [
    { name: "REGENT ST", type: "chance" as const, color: "green", price: "£300", rotation: -90 },
    { name: "OXFORD ST", type: "property" as const, color: "green", price: "£300", rotation: -90 },
    { name: "COMMUNITY CHEST", type: "chance" as const, color: "", rotation: -90 },
    { name: "BOND ST", type: "property" as const, color: "green", price: "£320", rotation: -90 },
    { name: "LIVERPOOL ST STATION", type: "utility" as const, color: "lightblue", price: "£200", rotation: -90 },
    { name: "CHANCE", type: "chance" as const, color: "", rotation: -90 },
    { name: "PARK LANE", type: "property" as const, color: "blue", price: "£350", rotation: -90 },
    { name: "SUPER TAX", type: "tax" as const, color: "", price: "£100", rotation: -90 },
    { name: "MAYFAIR", type: "chance" as const, color: "blue", price: "£400", rotation: -90 },
  ]

  const bottomProperties = [
    { name: "JAIL", type: "corner" as const, color: "", rotation: 180 },
    { name: "PALL MALL", type: "chance" as const, color: "pink", price: "£140", rotation: 180 },
    { name: "ELECTRIC COMPANY", type: "utility" as const, color: "lightblue", price: "£150", rotation: 180 },
    { name: "WHITEHALL", type: "property" as const, color: "pink", price: "£140", rotation: 180 },
    { name: "NORTHUMBERLAND AVE", type: "property" as const, color: "pink", price: "£160", rotation: 180 },
    { name: "MARYLEBONE STATION", type: "utility" as const, color: "lightblue", price: "£200", rotation: 180 },
    { name: "BOW ST", type: "property" as const, color: "orange", price: "£180", rotation: 180 },
    { name: "COMMUNITY CHEST", type: "chance" as const, color: "", rotation: 180 },
    { name: "MARLBOROUGH ST", type: "property" as const, color: "orange", price: "£180", rotation: 180 },
    { name: "VINE ST", type: "property" as const, color: "orange", price: "£200", rotation: 180 },
    { name: "GO", type: "chance" as const, color: "", rotation: 180 },
  ]

  const leftProperties = [
    { name: "PENTONVILLE RD", type: "property" as const, color: "lightblue", price: "£120", rotation: 90 },
    { name: "EUSTON RD", type: "property" as const, color: "lightblue", price: "£100", rotation: 90 },
    { name: "CHANCE", type: "chance" as const, color: "", rotation: 90 },
    { name: "THE ANGEL ISLINGTON", type: "property" as const, color: "lightblue", price: "£100", rotation: 90 },
    { name: "KINGS CROSS STATION", type: "chance" as const, color: "lightblue", price: "£200", rotation: 90 },
    { name: "INCOME TAX", type: "tax" as const, color: "", price: "£200", rotation: 90 },
    { name: "WHITECHAPEL RD", type: "property" as const, color: "brown", price: "£60", rotation: 90 },
    { name: "COMMUNITY CHEST", type: "chance" as const, color: "", rotation: 90 },
    { name: "OLD KENT RD", type: "property" as const, color: "brown", price: "£60", rotation: 90 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative">
        {/* Main board container */}
        <div className="w-[600px] h-[600px] bg-slate-800 relative">
          {/* Center area */}
          <div className="absolute inset-6 bg-black flex items-center justify-center">
            <div className="text-white text-4xl font-bold">BLOCKOPOLY</div>
          </div>

          {/* Top row */}
          <div className="absolute top-0 left-0 right-0 flex justify-between">
            {topProperties.map((property, index) => (
              <PropertyCard key={`top-${index}`} {...property} />
            ))}
          </div>

          {/* Right column */}
          <div className="absolute top-6 right-0 flex flex-col justify-between h-[calc(100%-48px)]">
            {rightProperties.map((property, index) => (
              <PropertyCard key={`right-${index}`} {...property} />
            ))}
          </div>

          {/* Bottom row */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {bottomProperties.map((property, index) => (
              <PropertyCard key={`bottom-${index}`} {...property} />
            ))}
          </div>

          {/* Left column */}
          <div className="absolute top-6 left-0 flex flex-col justify-between h-[calc(100%-48px)]">
            {leftProperties.map((property, index) => (
              <PropertyCard key={`left-${index}`} {...property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
