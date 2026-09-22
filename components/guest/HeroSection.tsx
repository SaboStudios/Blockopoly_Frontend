'use client'
import React, { useState } from 'react'
import herobg from "@/public/heroBg.png"
import Image from 'next/image'
import { Dices, KeyRound } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation';
import { useRouter } from 'next/navigation'

const HeroSection = () => {
    const [gamerName, setGamerName] = useState('');

    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGamerName(e.target.value);
    };

    const handleRouteToPrivateRoom = () => {
        router.push('/game-settings')
    }

    const handleRouteToJoinRoom = () => {
        router.push('/join-room')
    }

    return (
        <section className="w-full lg:h-screen md:h-[calc(100vh-87px)] h-screen relative overflow-x-hidden md:mb-20 mb-10">
            {/* herobg */}
            <div className="w-full h-full overflow-hidden">
                <Image
                    src={herobg}
                    alt="Hero Background"
                    className="w-full h-full object-cover hero-bg-zoom"
                    width={1440}
                    height={1024}
                    priority
                    quality={100}
                />
            </div>

            {/* Blockopoly */}
            <div className="w-full h-auto absolute top-0 left-0 flex items-center justify-center">
                <h1
                    className="text-center uppercase font-kronaOne font-normal text-transparent big-hero-text w-full text-[40px] sm:text-[40px] md:text-[80px] lg:text-[135px] relative before:absolute before:content-[''] before:w-full before:h-full before:bg-gradient-to-b before:from-transparent lg:before:via-[#010F10]/80 before:to-[#010F10] before:top-0 before:left-0 before:z-10"
                >
                    BLOCKOPOLY
                </h1>
            </div>

            {/* overlay */}
            <main className='w-full h-full absolute top-0 left-0 z-20 bg-transparent flex flex-col lg:justify-center items-center gap-1'>

                <div className='flex justify-center items-center md:gap-6 gap-3 mt-20 md:mt-28 lg:mt-0'>
                    <TypeAnimation
                        sequence={[
                            'Conquer',
                            1200,
                            'Conquer • Build',
                            1200,
                            'Conquer • Build • Trade On',
                            1800,
                            'Conquer • Build',
                            1000,
                            'Conquer',
                            1000,
                            '',
                            500,
                        ]}
                        wrapper="span"
                        speed={40}
                        repeat={Infinity}
                        className="font-orbitron lg:text-[40px] md:text-[30px] text-[20px] font-[700] text-[#F0F7F7] text-center block"
                    />
                </div>

                <h1 className="block-text font-[900] font-orbitron lg:text-[116px] md:text-[98px] text-[54px] lg:leading-[120px] md:leading-[100px] leading-[60px] tracking-[-0.02em] uppercase text-[#17ffff] relative">
                    THE BLOCK
                    <span className='absolute top-0 left-[69%] text-[#0FF0FC] font-dmSans font-[700] md:text-[27px] text-[18px] rotate-12 animate-pulse'>?</span>
                </h1>

                <p className="w-full px-4 md:w-[70%] lg:w-[55%] text-center font-[400] md:text-[18px] text-[14px] font-dmSans text-[#F0F7F7] -tracking-[2%]">Step into Blockopoly — the Web3 twist on the classic game of strategy, ownership, and fortune. Collect tokens, complete quests, and become the ultimate blockchain tycoon.</p>

                <div className="w-full flex flex-col justify-center items-center mt-3 gap-3">

                    <input type="text" name="name" id="name" value={gamerName}
                        onChange={handleInputChange} require

/* … truncated 5199 chars — edit only what you need near the top … */
