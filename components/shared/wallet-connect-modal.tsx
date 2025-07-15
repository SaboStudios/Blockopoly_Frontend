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
}: WalletConnectModalProps) {
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const { connectors, connectAsync } = useWalletContext();

    const handleSelect = (walletId: string) => {
        setSelectedWallet(walletId);
    };

    const handleConfirm = async () => {
        if (!selectedWallet) return;
        const connector = connectors.find((c) => c.id === selectedWallet);
        if (!connector) {
            console.error("Connector not found:", selectedWallet);
            return;
        }

        try {
            await connectAsync({ connector }); // ■ await the wallet prompt
            //router.push("/dashboard"); // ■ now safe to navigate
            onClose();
        } catch (err) {
            console.error("Wallet connection failed:", err); // ■ handle rejections
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
                        className="relative w-full max-w-md rounded-[12px] bg-[#010F10] p-[32px] border-[#003B3E] border-[1px]"
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
                                    Choose your preferred wallet
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white absolute top-2 right-2 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>


                        {/* Wallet options */}
                        <div className="space-y-3 mb-6">
                            {connectors.map((wallet, index) => (
                                <AnimationWrapper
                                    key={wallet?.id}
                                    variant="slideRight"
                                    delay={index * 0.1}
                                >
                                    <button
                                        className={`w-full flex justify-center items-center gap-3 p-3 rounded-[12px] bg-[#0D191B] border-[1px] border-[#0D191B] cursor-pointer hover:border-[#0FF0FC] transition-all ${selectedWallet === wallet.id
                                            ? "border-[#0FF0FC]"
                                            : ""
                                            }`}
                                        onClick={() => handleSelect(wallet.id)}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center`}
                                        >
                                            <div className="">
                                                <Image
                                                    src={getIconSource(wallet.icon)}
                                                    alt={wallet.name}
                                                    width={30}
                                                    height={30}
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        <span className="text-white">{wallet.name}</span>
                                    </button>
                                </AnimationWrapper>
                            ))}
                        </div>

                        {/* Confirmation button */}
                        <AnimationWrapper variant="slideUp" delay={0.3}>
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedWallet}
                                className={`w-full py-3 rounded-[12px] font-medium transition-colors ${selectedWallet
                                    ? "bg-[#0FF0FC]/80 hover:bg-[#0FF0FC]/40 text-[#0D191B]"
                                    : "bg-gray-700 cursor-not-allowed text-white"
                                    }`}
                            >
                                Connect
                            </button>
                        </AnimationWrapper>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
