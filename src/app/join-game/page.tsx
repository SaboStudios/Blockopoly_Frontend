"use client";

import { useState } from "react";
import { ArrowLeft, Plus, User } from "lucide-react";

const shapes = {
  "arrow-right": "polygon(1rem 0%, 100% 0%, calc(100% - 1rem) 100%, 0% 100%)",
  diamond:
    "polygon(1rem 0%, calc(100% - 1rem) 0%, 100% 50%, calc(100% - 1rem) 100%, 1rem 100%, 0% 50%)",
  "chevron-right":
    "polygon(0% 0%, calc(100% - 1rem) 0%, 100% 50%, calc(100% - 1rem) 100%, 0% 100%, 1rem 50%)",
  "slant-left": "polygon(0rem 0%, 100% 0%, 100% 100%, 100% 100%, 20% 100%)",
  "gaming-panel": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
} as const;

interface AngledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: keyof typeof shapes;
  size?: keyof typeof sizes;
}

const AngledButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "arrow-right",
  size = "md",
}: AngledButtonProps) => {
  const buttonClasses = `
    relative inline-block
    font-medium
    transition-all duration-300 ease-in-out
    transform hover:scale-105 hover:shadow-lg
    cursor-pointer
    ${sizes[size]}
    ${
      disabled
        ? "bg-gray-400 cursor-not-allowed opacity-60"
        : "bg-[#003B3E] hover:bg-teal-700 "
    }
    text-white
    ${className}
  `;

  const buttonStyle = {
    clipPath: shapes[variant],
    WebkitClipPath: shapes[variant],
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      style={buttonStyle}
      disabled={disabled}
    >
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </button>
  );
};

interface Room {
  id: string;
  name: string;
  isPasswordProtected: boolean;
  isOnline: boolean;
}

const rooms: Room[] = [
  { id: "1", name: "QVN45", isPasswordProtected: true, isOnline: true },
  { id: "2", name: "QVN45", isPasswordProtected: true, isOnline: true },
  { id: "3", name: "QVN45", isPasswordProtected: true, isOnline: true },
  { id: "4", name: "QVN45", isPasswordProtected: true, isOnline: true },
];

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = (roomId: string) => {
    console.log("Joining room:", roomId);
  };

  const handleJoinByCode = () => {
    if (roomCode.trim()) {
      console.log("Joining room with code:", roomCode);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs z-10"
        style={{
          backgroundImage: `url('/background.png')`,
        }}
      />
      <div className="w-full z-20 my-32">
        <div className="max-w-[792px] mx-auto pb-6 flex flex-col gap-16 items-center">
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-semibold text-[#F0F7F7]">Join Room</h1>
            <p className="text-sm text-[#F0F7F7]">
              Select the room you would like to join
            </p>
          </div>

          <div className="w-full flex justify-between gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0E1415] border border-[#003B3E] rounded-md hover:bg-teal-700 transition-colors"
              onClick={() => console.log("Go back home")}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back Home
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#003B3E] text-white rounded-md hover:bg-teal-700 transition-colors"
              onClick={() => console.log("Create new room")}
            >
              <Plus className="w-4 h-4" />
              Create New Room
            </button>
          </div>
        </div>

        <div className="w-full bg-[#010F10] border border-[#0B191A] max-w-[792px] mx-auto rounded-[12px] p-6 space-y-6 z-20">
          <div className="space-y-3">
            {rooms.map((room, index) => (
              <div
                key={`${room.id}-${index}`}
                className="border border-[#0E282A] rounded-lg p-4 cursor-pointer active:bg-[#091F20] hover:bg-[#0B191A] transition-colors"
                onClick={() => handleJoinRoom(room.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        room.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />

                    <span className="font-medium text-[#F0F7F7]">
                      {room.name}
                    </span>

                    {room.isPasswordProtected && (
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 rounded-full bg-gray-400"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <User className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-center items-center gap-4 border border-[#0E282A] rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Input room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="flex-1 px-3 py-2 text-center bg-transparent text-[#F0F7F7] placeholder-gray-400 rounded-lg focus:outline-none focus:border-transparent"
              onKeyDown={(e) => e.key === "Enter" && handleJoinByCode()}
            />
            <AngledButton
              variant="slant-left"
              size="md"
              onClick={handleJoinByCode}
              disabled={!roomCode.trim()}
              className={`rounded-tr-[8px] rounded-br-[8px] px-4${
                !roomCode.trim()
                  ? "bg-[#676869]"
                  : "bg-[#003B3E] hover:bg-[#11141b] transition-colors"
              }`}
            >
              Join Room
            </AngledButton>
          </div>
        </div>
      </div>
    </main>
  );
}
