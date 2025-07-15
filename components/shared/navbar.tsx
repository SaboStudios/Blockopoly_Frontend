'use client'
import { useScroll, motion, useSpring } from 'framer-motion';
import Logo from './logo';
import LogoIcon from '@/public/logo.png';
import Link from 'next/link';
import { House, LogOut, Volume2, VolumeOff } from 'lucide-react';
import { useState } from 'react';
import useSound from 'use-sound'
import { useWalletContext } from '@/context/wallet-provider';
import Image from 'next/image';
import WalletConnectModal from './wallet-connect-modal';
import WalletDisconnectModal from './wallet-disconnect-modal';
import { PiUserCircle } from 'react-icons/pi';
import avatar from "@/public/avatar.jpg";

const NavBar = () => {

    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
    const { account, connectWallet, disconnectWallet, connectors } =
        useWalletContext();


    const handleWalletSelect = (walletId: string) => {
        const connector = connectors.find((c) => c.id === walletId);
        if (connector) {
            connectWallet(connector);
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
        disconnectWallet();
        setIsDisconnectModalOpen(false);
    };

    const [isSoundPlaying, setIsSoundPlaying] = useState(false);
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const [play, { pause }] = useSound('/sound/monopoly-theme.mp3', {
        volume: 0.5,
        loop: true,
    })

    const toggleSound = () => {
        if (isSoundPlaying) {
            pause()
            setIsSoundPlaying(false)
        } else {
            play()
            setIsSoundPlaying(true)
        }
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 bg-[#0FF0FC] origin-[0%] h-[2px] z-[42]"
                style={{ scaleX }}
            />

            <header className="w-full h-[87px] flex items-center justify-between px-4 md:px-8 bg-[linear-gradient(180deg,rgba(1,15,16,0.12)_0%,rgba(8,50,52,0.12)_100%)] backdrop-blur-sm">
                {/* Logo */}
                <Logo className="cursor-pointer md:w-[50px] w-[45px]" image={LogoIcon} href="/" />
                {/* Icons */}
                <div className="flex items-center gap-[4px]">
                    {/* status to be shown when connected */}
                    {
                        account && (
                            <button type="button" className="w-[133px] h-[40px] hidden border-[1px] border-[#0E282A] hover:border-[#003B3E] transition-all duration-300 ease-in-out rounded-[12px] md:flex justify-center items-center gap-2 bg-[#011112] text-[#AFBAC0] cursor-pointer">
                                <PiUserCircle className='w-[16px] h-[16px]' />
                                <span className="text-[12px] font-[400] font-dmSans">0 friends online</span>
                            </button>
                        )
                    }

                    {/* home icon */}
                    <Link href="/" className="w-[40px] h-[40px] border-[1px] border-[#0E282A] hover:border-[#003B3E] transition-all duration-300 ease-in-out rounded-[12px] hidden md:flex justify-center items-center bg-[#011112] text-white cursor-pointer">
                        <House className='w-[16px] h-[16px]' />
                    </Link>
                    {/* Sound/Audio icon */}
                    <button type='button' onClick={toggleSound} className="w-[40px] h-[40px] border-[1px] border-[#0E282A] hover:border-[#003B3E] transition-all duration-300 ease-in-out rounded-[12px] hidden md:flex justify-center items-center bg-[#011112] text-white cursor-pointer">
                        {isSoundPlaying ? (
                            <Volume2 className='w-[16px] h-[16px]' />
                        ) : (
                            <VolumeOff className='w-[16px] h-[16px]' />
                        )}
                    </button>

                    {/* Connect Button */}
                    {
                        !account ? (
                            <button
                                type="button"
                                onClick={handleConnectWallet}
                                className="relative group w-[157px] h-[41px] bg-transparent border-none p-0 overflow-hidden cursor-pointer"
                            >
                                <svg
                                    width="157"
                                    height="41"
                                    viewBox="0 0 157 41"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute top-0 left-0 w-full h-full"
                                >
                                    <path
                                        d="M6 1H150.899C155.272 1 157.896 5.85486 155.501 9.5127L137.167 37.5127C136.151 39.0646 134.42 40 132.565 40H6C2.96244 40 0.5 37.5376 0.5 34.5V6.5C0.5 3.46243 2.96243 1 6 1Z"
                                        fill="#011112"
                                        stroke="#0E282A"
                                        strokeWidth={1}
                                        className='group-hover:stroke-[#003B3E] transition-all duration-300 ease-in-out'
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center ml-8 text-[#00F0FF] text-[14px] leading-[24px] font-orbitron font-medium z-10">
                                    Connect
                                </span>
                            </button>
                        ) : (
                            <div className="flex justify-center items-center" >
                                <div
                                    className="w-[180px] h-[41px] relative bg-transparent border-none p-0 overflow-hidden cursor-pointer"
                                >
                                    <svg
                                        width="180"
                                        height="41"
                                        viewBox="0 0 180 41"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 1H174C178.373 1 180.996 5.85486 178.601 9.5127L160.167 37.5127C159.151 39.0646 157.42 40 155.565 40H6C2.96244 40 0.5 37.5376 0.5 34.5V6.5C0.5 3.46243 2.96243 1 6 1Z"
                                            fill="#011112"
                                            stroke="#0E282A"
                                            strokeWidth={1}
                                            className="group-hover:stroke-[#003B3E] transition-all duration-300 ease-in-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center ml-5 text-[#00F0FF] font-orbitron font-medium z-10">
                                        <div className="h-6 w-6 rounded-full border-[1px] border-[#0FF0FC] overflow-hidden">
                                            <Image
                                                src={avatar}
                                                alt="Wallet Avatar"
                                                width={200}
                                                height={200}
                                                quality={100}
                                                priority
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <span className="text-[14px] font-medium ml-2">
                                            {account.slice(0, 4)}…{account.slice(-4)}
                                        </span>
                                    </div>
                                </div>

                                {/* disconnect btn */}
                                <button
                                    type="button"
                                    onClick={handleWalletClick}
                                    className="relative right-3 group w-[62px] h-[41px] bg-transparent border-none p-0 overflow-hidden cursor-pointer"
                                >
                                    <svg width="62" height="41" viewBox="0 0 62 41" fill="none" className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M62 34.5C62 37.8137 59.3137 40.5 56 40.5L6.16273 40.5C1.38034 40.5 -1.47997 35.1785 1.15847 31.1898L19.6798 3.1898C20.7908 1.51023 22.6703 0.5 24.684 0.5H56C59.3137 0.5 62 3.18629 62 6.5V34.5Z" fill="#003B3E"
                                            stroke="#003B3E"
                                            strokeWidth={1}
                                        />
                                    </svg>

                                    <span className="absolute inset-0 flex items-center justify-center text-[#0FF0FC] z-10">
                                        <LogOut className="w-[16px] h-[16px]" />
                                    </span>
                                </button>
                            </div>
                        )
                    }

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
    )
}

export default NavBar