"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import AnimationWrapper from "@/animation/animation-wrapper";


interface WalletDisconnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDisconnect: () => void;
}

export default function WalletDisconnectModal({
    isOpen,
    onClose,
    onDisconnect,
}: WalletDisconnectModalProps) {

    //router
    const router = useRouter();

    const [isDisconnecting, setIsDisconnecting] = useState(false);

    const handleDisconnect = () => {
        if (isDisconnecting) return;
        setIsDisconnecting(true);
        router.push("/"); // ■ now safe to navigate
        onDisconnect();
    };

    const handleCancel = () => {
        if (isDisconnecting) return;
        onClose();
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut",
            },
        },

        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.2,
                ease: "easeIn",
            },
        },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

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
                        onClick={handleCancel}
                    />

                    <motion.div
                        className="relative w-full max-w-md rounded-[12px] bg-[#010F10] p-[32px] border-[#003B3E] border-[1px]"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="relative flex items-center justify-center mb-8">
                            <h2 className="text-[24px] font-[600] text-[#F0F7F7] text-center font-orbitron">
                                Disconnect Wallet
                            </h2>
                            <button
                                onClick={handleCancel}
                                disabled={isDisconnecting}
                                className="text-gray-400 hover:text-white absolute -top-2 -right-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <AnimationWrapper variant="fadeIn" delay={0.1}>
                            <p className="text-[#F0F7F7] mb-6 text-center">
                                Are you sure you want to disconnect your wallet?
                            </p>
                        </AnimationWrapper>

                        <div className="w-full flex justify-between gap-4 mt-8">
                            <button
                                className="w-full py-3 rounded-[12px] text-center border-[1px] border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleCancel}
                                disabled={isDisconnecting}
                            >
                                Cancel
                            </button>

                            <button
                                className="py-3 w-full text-center rounded-[12px] bg-[#0FF0FC]/80 hover:bg-[#0FF0FC]/40 text-[#0D191B] font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleDisconnect}
                                disabled={isDisconnecting}
                            >
                                {isDisconnecting ? "Disconnecting..." : "Confirm Disconnect"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
