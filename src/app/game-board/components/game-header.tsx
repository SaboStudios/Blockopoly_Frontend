"use client";

import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Bell, Volume2, Users } from "lucide-react";
import Logo from "../../components/icons/logo";

export function GameHeader() {
  return (
    <header className="bg-slate-800 border-b border-cyan-400 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 justify-center">
            <Logo />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Users className="w-4 h-4" />
            <span>0 friends online</span>
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <Volume2 className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-500 text-white">
                F
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Flora</span>
          </div>
        </div>
      </div>
    </header>
  );
}
