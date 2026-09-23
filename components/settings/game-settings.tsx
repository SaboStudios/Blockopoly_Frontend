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
import { useGameContext } from '@/context/game-context';



const GameSettings = () => {

    const router = useRouter()
    const { setAppearanceModalOpen } = useGameContext()

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
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Even Build</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Players must build evenly across properties in a color group.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="even-build" />
                    </div>

                    {/* Starting Cash */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <FaHandHoldingDollar className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Starting Cash</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">The amount of cash each player starts with.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="starting-cash" />
                    </div>

                    {/* Randomize */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <FaRandom className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Randomize</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Randomize the order of players in the game.</p>
                            </div>
                        </div>
                        {/* checkbox - switch */}
                        <Switch id="randomize" />
                    </div>

                    {/* Appearance */}
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            {/* icon */}
                            <AiOutlineDollarCircle className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Appearance</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Customize your game board appearance.</p>
                            </div>
                        </div>
                        {/* button */}
                        <button
                            type="button"
                            onClick={() => setAppearanceModalOpen(true)}
                            className="text-[#F0F7F7] font-dmSans font-[600] text-[16px] px-4 py-2 rounded-[8px] border-[1px] border-[#003B3E] hover:bg-[#003B3E] transition-colors"
                        >
                            Customize
                        </button>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default GameSettings
