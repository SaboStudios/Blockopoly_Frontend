'use client'
import { useScroll, motion, useSpring } from 'framer-motion';
import Logo from './logo';
import LogoIcon from '@/public/logo.png';
import Link from 'next/link';
import { House, LogOut, Volume2, VolumeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
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

    useEffect(() => {
        return () => {
            pause()
            setIsSoundPlaying(false)
        }
    }, [pause])

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
                    <button type='button' onClick={toggleSound} className="w-[40px] h-[40px] border-[1px] border-[#0E282A] hover:border-[#003B3E] transition-all duration-300 ease-in-out rounded-[12px] flex justify-center items-center bg-[#011112] text-white cursor-pointer">
                        {isSoundPlaying ? <Volume2 className='w-[16px] h-[16px]' /> : <VolumeOff className='w-[16px] h-[16px]' />}
                    </button>
                    {/* Connect/Disconnect */}
                    {account ? (
                        <button type="button" onClick={handleWalletClick} className="h-[40px] px-4 border-[1px] border-[#0E282A] hover:border-[#003B3E] transition-all duration-300 ease-in-out rounded-[12px] flex justify-center items-center gap-2 bg-[#011112] text-white cursor-pointer">
                            <Image src={avatar} alt="avatar" width={20} height={20} className="rounded-full" />
                            <span className="text-[12px] font-[400] font-dmSans">{account.slice(0, 6)}...{account.slice(-4)}</span>
                        </button>
                    ) : (
                        <button type="button" onClick={handleConnectWallet} className="h-[40px] px-4 border-[1px] border-[#0E282A] hover:border-[#003B3E] transition-all duration-300 ease-in-out rounded-[12px] flex justify-center items-center bg-[#011112] text-white cursor-pointer">
                            <span className="text-[12px] font-[400] font-dmSans">Connect Wallet</span>
                        </button>
                    )}
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
};

export default NavBar;
