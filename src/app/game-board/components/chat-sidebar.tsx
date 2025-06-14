"use client"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Settings, Send, Copy, Volume2 } from "lucide-react"

export function ChatSidebar() {
  return (
    <div className="w-80 bg-slate-800 flex flex-col">
      {/* Game Room Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Game Room</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>https://gameroom10qd.io/rok</span>
          <Button variant="ghost" size="sm" className="p-1">
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <h3 className="font-semibold">Chat</h3>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <p className="text-gray-400 text-sm">No messages yet</p>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-2">
            <Input
              placeholder="type a message..."
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 text-sm"
            />
            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
