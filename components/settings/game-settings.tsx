'use client'
import React from 'react'
import { FaUsers } from "react-icons/fa6";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/game-switch"
import { MdPrivateConnectivity } from 'react-icons/md';
import { RiAuctionFill } from "react-icons/ri";
import { GiBank, GiPrisoner } from 'react-icons/gi';
import { IoBuild } from 'react-icons/io5';
import { FaHandHoldingDollar } from "react-icons/fa6";
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';
import { useRouter } from 'next/navigation';



const GameSettings = () => {

    const router = useRouter()

    return (
        <section className={`w-full min-h-screen bg-settings bg-cover bg-fixed bg-center`}>
            <main className="w-full h-auto py-20 flex flex-col items-center justify-start bg-[#010F101F] backdrop-blur-[12px] px-4">
                <div className='w-full flex flex-col items-center mb-4'>
                    <h2 className="text-[#F0F7F7] font-orbitron md:text-[24px] text-[20px] font-[700] text-center">Game Settings</h2>
                    <p className='text-[#869298] text-[16px] font-dmSans text-center'>Since you&apos;re creating a private game room, you get to choose how you want your game to go</p>
                </div>

                {/* First Setting */}
                <div className='w-full max-w-[792px] bg-[#010F10] rounded-[12px] border-[1px] border-[#003B3E] md:p-[40px] p-[20px] flex flex-col gap-4'>
                    {/* maximum players */}
                    <div className='w-full flex justify-between items-center'>
                        <div className="flex items-start md:gap-3 gap-2">
                            {/* icon */}
                            <FaUsers className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Maximum Players</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">How many players can join the game.</p>
                            </div>
                        </div>

                        {/* select */}
                        <Select>
                            <SelectTrigger className="w-[80px] data-[size=default]:h-[40px] text-[#73838B] border-[1px] border-[#263238]">
                                <SelectValue placeholder="2" className='text-[#F0F7F7]' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* private room */}
                    <div className='w-full flex justify-between items-center'>
                        <div className="flex items-start md:gap-3 gap-2">
                            {/* icon */}
                            <MdPrivateConnectivity className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Private Room</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Private rooms can be accessed using the room URL only.</p>
                            </div>
                        </div>

                        {/* checkbox - switch */}
                        <Switch id="private-room" />
                    </div>
                </div>


                <div className='w-full flex flex-col items-center mt-20 mb-4'>
                    <h2 className="text-[#F0F7F7] font-orbitron md:text-[24px] text-[20px] font-[700] text-center">Gameplay Rules</h2>
                    <p className='text-[#869298] text-[16px] font-dmSans text-center'>Set the rules for the game in your private game room</p>
                </div>

                {/* 2nd Setting */}
                <div className='w-full max-w-[792px] bg-[#010F10] rounded-[12px] border-[1px] border-[#003B3E] md:p-[40px] p-[20px] flex flex-col gap-5'>

                    {/* Auction */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <RiAuctionFill className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Auction</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">If someone skips purchasing a property during auction, it will be sold to the highest bidder.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="auction" />
                    </div>


                    {/* Rent In Prison */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <GiPrisoner className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600] capitalize'>Rent In Prison</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Rent will be collected when landing on properties of a player in prison.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="rent-in-prison" />
                    </div>

                    {/* Mortgage */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <GiBank className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Mortgage</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Mortgage properties to earn 50% of their cost, but you won&apos;t get paid rent when players land on them.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="mortgage" />
                    </div>

                    {/* Even build */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <IoBuild className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600] capitalize'>Even build</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Houses and hotels must be built up and sold off evenly within a property set.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="even-build" />
                    </div>

                    {/* Starting cash */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <FaHandHoldingDollar className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600] capitalize'>Starting cash</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Adjust how much players can start the game with.</p>
                            </div>
                        </div>
                        {/* select */}
                        <Select>
                            <SelectTrigger className="w-[120px] data-[size=default]:h-[40px] text-[#73838B] border-[1px] border-[#263238]">
                                <AiOutlineDollarCircle className='md:w-3 md:h-3 text-[#73838B]' />
                                <SelectValue placeholder="100" className='text-[#F0F7F7]' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="100">100</SelectItem>
                                <SelectItem value="200">200</SelectItem>
                                <SelectItem value="300">300</SelectItem>
                                <SelectItem value="400">400</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                                <SelectItem value="1000">1000</SelectItem>
                                <SelectItem value="1500">1500</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Randomize Play order */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <FaRandom className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600] capitalize'>Randomize Play order</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Randomly reorder players at the beginning of the game.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="random-play" />
                    </div>
                </div>

                <div className='w-full max-w-[792px] flex justify-end mt-12'>
                    <button
                        type="button"
                        onClick={() => router.push('/game-room-loading')}
                        className="relative group w-[260px] h-[52px] bg-transparent border-none p-0 overflow-hidden cursor-pointer"
                    >
                        <svg
                            width="260"
                            height="52"
                            viewBox="0 0 260 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-0 left-0 w-full h-full transform scale-x-[-1]"
                        >
                            <path
                                d="M10 1H250C254.373 1 256.996 6.85486 254.601 10.5127L236.167 49.5127C235.151 51.0646 233.42 52 231.565 52H10C6.96244 52 4.5 49.5376 4.5 46.5V9.5C4.5 6.46243 6.96243 4 10 4Z"
                                fill="#00F0FF"
                                stroke="#0E282A"
                                strokeWidth={1}
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[#010F10] text-[18px] -tracking-[2%] font-orbitron font-[700] z-10">
                            Play
                        </span>
                    </button>
                </div>
            </main>
        </section>
    )
}

export default GameSettings