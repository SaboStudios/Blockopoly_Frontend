"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useWalletContext } from "@/context/wallet-provider";
import AnimationWrapper from "@/animation/animation-wrapper";

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (wallet: string) => void;
}

export default function WalletConnectModal({
    isOpen,
    onClose,
    onSelect,
}: WalletConnectModalProps) {
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { connectors, connectAsync } = useWalletContext();

    const handleSelect = (walletId: string) => {
        setSelectedWallet(walletId);
        setError(null);
        onSelect(walletId);
    };

    const handleConfirm = async () => {
        if (!selectedWallet) return;
        const connector = connectors.find((c) => c.id === selectedWallet);
        if (!connector) {
            console.error("Connector not found:", selectedWallet);
            setError("Wallet connector not found. Please try another wallet.");
            return;
        }

        try {
            setError(null);
            await connectAsync({ connector }); // ■ await the wallet prompt
            //router.push("/dashboard"); // ■ now safe to navigate
            onClose();
        } catch (err) {
            console.error("Wallet connection failed:", err); // ■ handle rejections
            setError("Wallet connection failed. Please try again.");
        }
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },

        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.2,
                ease: [0.42, 0, 1, 1],
            },
        },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    // helper to get icon source
    function getIconSource(
        icon: string | { dark: string; light: string }
    ): string {
        if (typeof icon === "string") {
            // If it's a string, use it directly
            return icon;
        } else {
            // If it's an object, use the dark variant (or light, as needed)
            return icon.dark; // Or icon.light, depending on your theme
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative w-full max-w-md rounded-[12px] bg-[#010F3E] p-[32px] border-[#003B3E] border-[1px]"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="w-full flex items-center justify-center relative mb-8">
                            <div className="w-full flex flex-col items-center">
                                <h2 className="text-[24px] font-[600] text-[#F0F7F7] text-center font-orbitron">
                                    Connect Wallet
                                </h2>
                                <p className="text-[#F0F7F7] text-[14px] text-center">
                                    Choose your preferred wallet to connect
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute right-0 top-0 text-[#F0F7F7] hover:text-[#00F0FF] transition-colors"
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {connectors.map((connector) => (
                                <button
                                    key={connector.id}
                                    onClick={() => handleSelect(connector.id)}
                                    className={`w-full flex items-center gap-3 p-4 rounded-[8px] border transition-colors ${
                                        selectedWallet === connector.id
                                            ? "border-[#00F0FF] bg-[#003B3E]"
                                            : "border-[#003B3E] hover:border-[#00F0FF]"
                                    }`}
                                >
                                    {connector.icon && (
                                        <Image
                                            src={getIconSource(connector.icon)}
                                            alt={connector.name}
                                            width={32}
                                            height={32}
                                            className="rounded"
                                        />
                                    )}
                                    <span className="text-[#F0F7F7] font-[500]">
                                        {connector.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="mt-4 text-[#FF4D4D] text-[14px] text-center">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleConfirm}
                            disabled={!selectedWallet}
                            className="mt-6 w-full py-3 rounded-[8px] bg-[#00F0FF] text-[#010F3E] font-[600] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Connect
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
