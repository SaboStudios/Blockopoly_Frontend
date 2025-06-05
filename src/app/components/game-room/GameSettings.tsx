//src/app/components/game-room/GameSettings.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useGameRoom } from "@/app/contexts/GameRoomContext";
import ToggleSwitch from "./ToggleSwitch";
import board from "../../assets/board.png";
import profiles from "../../assets/profiles.png";
import privateKey from "../../assets/Private key.png";

export default function GameSettings() {
  const {
    state,
    updateMaxPlayers,
    togglePrivateRoom,
    toggleAuction,
    toggleRentInPrison,
    toggleMortgage,
    toggleEvenBuild,
    updateStartingCash,
    toggleRandomizePlayOrder,
    startGame,
  } = useGameRoom();

  const { settings } = state;

  const handleStartingCashChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateStartingCash(parseInt(e.target.value));
  };

  const handleMaxPlayersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMaxPlayers(parseInt(e.target.value));
  };

  const handlePlayClick = () => {
    startGame();
  };

  return (
    <div className="min-h-screen bg-[#010f10] flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      <Image
        src={board}
        alt="board"
        className="absolute inset-0 w-full h-1/2 object-cover object-center opacity-30 blur-xs pointer-events-none z-0"
        style={{ clipPath: "inset(68% 0 0 0)" }}
      />

      <div className="w-full max-w-2xl  mx-auto relative z-10">
        {/* Game Settings Header */}
        <div className="text-center mb-8">
          <h1 className="text-[24px] font-bold text-white mb-2">
            Game Settings
          </h1>
          <p className="text-gray-400">
            Since you&apos;re creating a private game room, you get to choose
            how you want your game to go
          </p>
        </div>

        {/* Settings Card */}
        <div>
          {/* Maximum Players */}
          <div className="bg-[#010f10] backdrop-blur-sm shadow-2xl border border-[#003B3E] mb-10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Image src={profiles} alt="profiles icon" width={25} />
                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Maximum Players
                  </h3>
                  <p className="text-gray-400 text-sm">
                    How many players can join the game.
                  </p>
                </div>
              </div>
              <select
                value={settings.maxPlayers}
                onChange={handleMaxPlayersChange}
                className="bg-[#010f10] text-white px-6 py-3 rounded-3xl border border-gray-800 focus:outline-none focus:ring-1 focus:ring-[#003B3E] focus:border-[#003B3E]"
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </div>
            {/* Private Room */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-white text-2xl">
                  <Image src={privateKey} alt="profiles icon" width={25} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Private Room
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Private rooms can be accessed using the room URL only.
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={settings.privateRoom}
                onChange={togglePrivateRoom}
              />
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-800 mb-10 w-full" />

          {/* Gameplay Rules */}
          <div className="text-center mb-4">
            <h1 className="text-[24px] font-bold text-white mb-2">
              {" "}
              Gameplay Rules
            </h1>
            <p className="text-gray-400">
              Set the rules for the game in your private game room
            </p>
          </div>

          <div className="bg-[#010f10] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-[#003B3E]">
            <div className="space-y-4 sm:space-y-6">
              {/* Auction */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 pb-4 sm:pb-6 border-b sm:border-b-0 border-gray-800/50">
                <div className="flex items-start space-x-3 flex-1">
                  <Image
                    src={privateKey}
                    alt="auction icon"
                    width={20}
                    height={20}
                    className="sm:w-6 sm:h-6 mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-base sm:text-lg font-semibold">
                      Auction
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      If someone skips purchasing a property during auction, it
                      will be sold to the highest bidder.
                    </p>
                  </div>
                </div>
                <div className="self-start sm:self-center sm:ml-4">
                  <ToggleSwitch
                    checked={settings.auction}
                    onChange={toggleAuction}
                  />
                </div>
              </div>

              {/* Rent In Prison */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 pb-4 sm:pb-6 border-b sm:border-b-0 border-gray-800/50">
                <div className="flex items-start space-x-3 flex-1">
                  <Image
                    src={privateKey}
                    alt="rent icon"
                    width={20}
                    height={20}
                    className="sm:w-6 sm:h-6 mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-base sm:text-lg font-semibold">
                      Rent In Prison
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Rent will be collected when landing on properties of a
                      player in prison.
                    </p>
                  </div>
                </div>
                <div className="self-start sm:self-center sm:ml-4">
                  <ToggleSwitch
                    checked={settings.rentInPrison}
                    onChange={toggleRentInPrison}
                  />
                </div>
              </div>

              {/* Mortgage */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 pb-4 sm:pb-6 border-b sm:border-b-0 border-gray-800/50">
                <div className="flex items-start space-x-3 flex-1">
                  <Image
                    src={privateKey}
                    alt="mortgage icon"
                    width={20}
                    height={20}
                    className="sm:w-6 sm:h-6 mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-base sm:text-lg font-semibold">
                      Mortgage
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Mortgage properties to earn 50% of their cost, but you
                      won&apos;t get paid rent when players land on them.
                    </p>
                  </div>
                </div>
                <div className="self-start sm:self-center sm:ml-4">
                  <ToggleSwitch
                    checked={settings.mortgage}
                    onChange={toggleMortgage}
                  />
                </div>
              </div>

              {/* Even Build */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 pb-4 sm:pb-6 border-b sm:border-b-0 border-gray-800/50">
                <div className="flex items-start space-x-3 flex-1">
                  <Image
                    src={privateKey}
                    alt="build icon"
                    width={20}
                    height={20}
                    className="sm:w-6 sm:h-6 mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-base sm:text-lg font-semibold">
                      Even Build
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Houses and hotels must be built up and sold off evenly
                      within a property set.
                    </p>
                  </div>
                </div>
                <div className="self-start sm:self-center sm:ml-4">
                  <ToggleSwitch
                    checked={settings.evenBuild}
                    onChange={toggleEvenBuild}
                  />
                </div>
              </div>

              {/* Starting Cash */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 pb-4 sm:pb-6 border-b sm:border-b-0 border-gray-800/50">
                <div className="flex items-start space-x-3 flex-1">
                  <Image
                    src={privateKey}
                    alt="cash icon"
                    width={20}
                    height={20}
                    className="sm:w-6 sm:h-6 mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-base sm:text-lg font-semibold">
                      Starting Cash
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Adjust how much players can start the game with.
                    </p>
                  </div>
                </div>
                <div className="sm:ml-4">
                  <select
                    value={settings.startingCash}
                    onChange={handleStartingCashChange}
                    className="bg-[#010f10] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-2xl sm:rounded-3xl border border-gray-800 focus:outline-none focus:ring-1 focus:ring-[#003B3E] focus:border-[#003B3E] text-sm sm:text-base w-full sm:w-auto min-w-[120px]"
                  >
                    <option value={500}>&#9417; 500</option>
                    <option value={1000}>&#9417; 1000</option>
                    <option value={1500}>&#9417; 1500</option>
                    <option value={2000}>&#9417; 2000</option>
                  </select>
                </div>
              </div>

              {/* Randomize Play Order */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-start space-x-3 flex-1">
                  <Image
                    src={privateKey}
                    alt="random icon"
                    width={20}
                    height={20}
                    className="sm:w-6 sm:h-6 mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-base sm:text-lg font-semibold">
                      Randomize Play Order
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Randomly reorder players at the beginning of the game.
                    </p>
                  </div>
                </div>
                <div className="self-start sm:self-center sm:ml-4">
                  <ToggleSwitch
                    checked={settings.randomizePlayOrder}
                    onChange={toggleRandomizePlayOrder}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Play Button */}
          <div className="flex justify-end mt-8 mb-16">
            <button
              onClick={handlePlayClick}
              className="bg-gradient-to-r from-cyan-400 to-[#0ff0fc] hover:from-cyan-500 hover:to-cyan-600 text-black font-bold py-2 px-20 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)",
              }}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
