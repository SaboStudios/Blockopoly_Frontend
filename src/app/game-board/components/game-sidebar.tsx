"use client"

import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { ChevronDown, Plus, Check, FileText } from "lucide-react"

const players = [
  { name: "Aji", initials: "A", money: 1000, color: "bg-yellow-500", isMe: true },
  { name: "Flora", initials: "F", money: 1000, color: "bg-blue-500" },
  { name: "Ejembi", initials: "E", money: 1000, color: "bg-pink-500" },
]

export function GameSidebar() {
  return (
    <div className="w-80 bg-slate-800 p-6 space-y-6">
      {/* Players Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Players</h2>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        <div className="space-y-3">
          {players.map((player) => (
            <div key={player.name} className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={`${player.color} text-white font-semibold`}>
                  {player.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {player.name} {player.isMe && "(Me)"}
                </div>
                {player.isMe && <div className="text-xs text-gray-400">Change appearance</div>}
              </div>
              <div className="text-sm font-mono text-gray-300">⊕{player.money}</div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-slate-700" />

      {/* Trade Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Trade</h2>
          <Button variant="outline" size="sm" className="text-xs">
            <Plus className="w-3 h-3 mr-1" />
            Create Trade
          </Button>
        </div>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardContent className="p-4">
            <p className="text-sm text-gray-300 mb-3">
              Make trades with other players to exchange properties, money, and bonus cards. Use the Create Trade
              button to create a new trade.
            </p>
            <Button variant="ghost" size="sm" className="w-full text-cyan-400">
              <Check className="w-4 h-4 mr-2" />
              Got it
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-slate-700" />

      {/* My Properties Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">My Properties</h2>
          <Button variant="outline" size="sm" className="text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Declare Bankruptcy
          </Button>
        </div>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardContent className="p-4">
            <p className="text-sm text-gray-300 mb-3">
              You can start building houses on your properties when you have a complete set.
            </p>
            <p className="text-sm text-gray-300 mb-3">Click on a property to upgrade, downgrade or sell it</p>
            <Button variant="ghost" size="sm" className="w-full text-cyan-400">
              <Check className="w-4 h-4 mr-2" />
              Got it
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
