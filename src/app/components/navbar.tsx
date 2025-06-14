"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreVertical, House, Volume2 } from "lucide-react";
import { useWalletContext } from "./walletProvider";
import AnimationWrapper from "../motion/animation-wrapper";
import WalletConnectModal from "./wallet-connect-modal";
import WalletDisconnectModal from "./wallet-disconnect-modal";
import Logo from "./icons/logo";

export default function Navbar() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { account, connectWallet, disconnectWallet, connectors } =
    useWalletContext();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleWalletSelect = (walletId: string) => {
    const connector = connectors.find((c) => c.id === walletId);
    if (connector) {
      connectWallet(connector); // invoke Starknet-React’s useConnect() :contentReference[oaicite:3]{index=3}
    }
    setIsConnectModalOpen(false);
  };
  const handleConnectWallet = () => {
    setIsConnectModalOpen(true);
  };
  const handleWalletClick = () => {
    setIsDisconnectModalOpen(true);
  };
  const handleDisconnect = () => {
    disconnectWallet(); // real Starknet-React disconnect :contentReference[oaicite:4]{index=4}
    setIsDisconnectModalOpen(false);
  };

  return (
    <>
      <header className="fixed w-full z-40 to-[#083234]/50 from-[#010F10] bg-gradient-to-tl py-4 px-5">
        <div className="flex items-center justify-between">
          <AnimationWrapper variant="slideRight">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </AnimationWrapper>

          {/* Wallet Connection Button or Connected Wallet */}

          <div className="hidden md:flex items-center gap-2 ">
            <div className="border border-[#0E282A] p-2 rounded-[12px]">
              <House />
            </div>
            <div className="border border-[#0E282A] p-2 rounded-[12px]">
              <Volume2 />
            </div>
            <AnimationWrapper variant="slideLeft">
              {!account ? (
                <button
                  onClick={handleConnectWallet}
                  className="px-5 py-2  border rounded-md border-[#0E282A]  bg-inherit text-[#0FF0FC] font-medium transition-colors font-orbitron"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={handleWalletClick}
                    className="px-2 flex items-center gap-2 py-2  border rounded-md border-[#0E282A]  bg-inherit text-[#0FF0FC] font-medium transition-colors font-orbitron"
                  >
                    <div className="h-8 w-8 rounded-full border-2 border-teal-500 overflow-hidden">
                      <Image
                        src="/Avater.svg"
                        alt="Wallet Avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>

                    <span className="text-white font-medium">
                      {account.slice(0, 6)}…{account.slice(-4)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        toggleDropdown();
                      }}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Custom Dropdown Menu */}

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#010F10] overflow-hidden border-[#003B3E] border">
                      <div className="py-1">
                        <button
                          onClick={handleWalletClick}
                          className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                        >
                          Disconnect
                        </button>

                        <button
                          className="w-full block text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                        >
                          View Profile
                        </button>

                        <button className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors">
                          Settings
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AnimationWrapper>
          </div>

          {/* Mobile Menu Button */}

          <div className="md:hidden flex items-center">
            <AnimationWrapper variant="slideLeft">
              {!account ? (
                <button
                  onClick={handleConnectWallet}
                  className="px-5 py-2  border rounded-md border-[#0E282A]  bg-inherit text-[#0FF0FC] font-medium transition-colors font-orbitron"
                >
                  Connect Wallet
                </button>
              ) : (
                <div
                  onClick={handleWalletClick}
                  className="px-2 flex items-center gap-2 py-2  border rounded-md border-[#0E282A]  bg-inherit text-[#0FF0FC] font-medium transition-colors font-orbitron"
                >
                  <div className="h-6 w-6 rounded-full border border-teal-500 overflow-hidden">
                    <Image
                      src="/icons/braavos.png"
                      alt="Wallet Avatar"
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>

                  <span className="text-white text-xs font-medium">
                    {account.slice(0, 6)}…{account.slice(-4)}
                  </span>
                </div>
              )}
            </AnimationWrapper>
          </div>
        </div>
      </header>

      <WalletConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSelect={handleWalletSelect}
      />

      <WalletDisconnectModal
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        onDisconnect={handleDisconnect}
      />
    </>
  );
}
