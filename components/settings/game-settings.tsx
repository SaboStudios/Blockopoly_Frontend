'use client'
import React, { useMemo, useState } from 'react'
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
import { useWallet } from '@/context/wallet-provider';
import { useMatchEscrow } from '@/lib/starknet/use-match-escrow';

const STAKE_OPTIONS = ['0', '10', '25', '50', '100'] as const;

const GameSettings = () => {
    const router = useRouter()
    const { address, isConnected, chainId } = useWallet()
    const [stake, setStake] = useState<string>('0')
    const { status, error, isMock, isConfigured, deposit, reset } = useMatchEscrow(stake)

    const walletReady = isConnected && !!address
    const depositConfirmed = stake === '0' || status === 'confirmed'
    const canStart = walletReady && depositConfirmed && !error

    const startHint = useMemo(() => {
        if (!walletReady) return 'Connect your wallet to start a staked match.'
        if (!isConfigured && !isMock) return 'Contract not configured — set NEXT_PUBLIC_MATCH_CONTRACT.'
        if (error) return error
        if (stake !== '0' && status !== 'confirmed') return 'Confirm your stake deposit to enable Start.'
        return null
    }, [walletReady, isConfigured, isMock, error, stake, status])

    const [roomName, setRoomName] = useState('')
    const [color, setColor] = useState('')

    const trimmedName = roomName.trim()
    const canStart = trimmedName.length > 0 && color.length > 0

    const missingFields: string[] = []
    if (trimmedName.length === 0) missingFields.push('room name')
    if (color.length === 0) missingFields.push('color')

    return (
        <section className={`w-full min-h-screen bg-settings bg-cover bg-fixed bg-center`}>
            <main className="w-full h-auto py-20 flex flex-col items-center justify-start bg-[#010F101F] backdrop-blur-[12px] px-4">
                <div className='w-full flex flex-col items-center mb-4'>
                    <h2 className="text-[#F0F7F7] font-orbitron md:text-[24px] text-[20px] font-[700] text-center">Game Settings</h2>
                    <p className='text-[#869298] text-[16px] font-dmSans text-center'>Since you&apos;re creating a private game room, you get to choose how you want your game to go</p>
                </div>

                {/* First Setting */}
                <div className='w-full max-w-[792px] bg-[#010F10] rounded-[12px] border-[1px] border-[#003B3E] md:p-[40px] p-[20px] flex flex-col gap-4'>
                    {/* room name */}
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="room-name" className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Room Name</label>
                        <input
                            id="room-name"
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="Enter a room name"
                            className="w-full h-[40px] px-3 rounded-[8px] bg-transparent text-[#F0F7F7] font-dmSans text-[16px] border-[1px] border-[#263238] outline-none focus:border-[#00FFFF]"
                        />
                    </div>

                    {/* color */}
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="room-color" className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Color</label>
                        <Select value={color} onValueChange={setColor}>
                            <SelectTrigger id="room-color" className="w-full data-[size=default]:h-[40px] text-[#73838B] border-[1px] border-[#263238]">
                                <SelectValue placeholder="Select a color" className='text-[#F0F7F7]' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="yellow">Yellow</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* maximum players */}
                    <div className='w-full flex justify-between items-center'>
                        <div className="flex items-start md:gap-3 gap-2">
                            <FaUsers className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Maximum Players</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">How many players can join the game.</p>
                            </div>
                        </div>
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
                            <MdPrivateConnectivity className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Private Room</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Private rooms can be accessed using the room URL only.</p>
                            </div>
                        </div>
                        <Switch id="private-room" />
                    </div>
                </div>

                {/* Starknet escrow */}
                <div className='w-full flex flex-col items-center mt-20 mb-4'>
                    <h2 className="text-[#F0F7F7] font-orbitron md:text-[24px] text-[20px] font-[700] text-center">Starknet Escrow</h2>
                    <p className='text-[#869298] text-[16px] font-dmSans text-center'>Stake STRK to lock in your seat. Start unlocks once deposits confirm.</p>
                </div>

                <div className='w-full max-w-[792px] bg-[#010F10] rounded-[12px] border-[1px] border-[#003B3E] md:p-[40px] p-[20px] flex flex-col gap-5'>
                    <div className='w-full flex justify-between items-center'>
                        <div className="flex items-start md:gap-3 gap-2">
                            <AiOutlineDollarCircle className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Stake Amount</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Currency: STRK {isMock ? '(mock chain)' : ''}</p>
                            </div>
                        </div>
                        <Select value={stake} onValueChange={(v) => { reset(); setStake(v) }}>
                            <SelectTrigger className="w-[100px] data-[size=default]:h-[40px] text-[#73838B] border-[1px] border-[#263238]">
                                <SelectValue placeholder="0" className='text-[#F0F7F7]' />
                            </SelectTrigger>
                            <SelectContent>
                                {STAKE_OPTIONS.map((v) => (
                                    <SelectItem key={v} value={v}>{v === '0' ? 'Free' : `${v} STRK`}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='w-full flex justify-between items-center'>
                        <div className="flex items-start md:gap-3 gap-2">
                            <FaHandHoldingDollar className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Deposit Stake</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">
                                    {status === 'confirmed' ? 'Deposit confirmed.' : status === 'pending' ? 'Waiting for confirmation…' : 'Lock your stake before starting.'}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            disabled={!walletReady || stake === '0' || status === 'pending' || status === 'confirmed'}
                            onClick={() => deposit()}
                            className="px-4 h-[40px] rounded-[8px] border-[1px] border-[#00FFF5] text-[#00FFF5] font-dmSans disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {status === 'confirmed' ? 'Deposited' : status === 'pending' ? 'Pending…' : 'Deposit'}
                        </button>
                    </div>

                    {startHint && (
                        <p className="text-[#FF6B6B] font-dmSans text-[14px]">{startHint}</p>
                    )}

                    <button
                        type="button"
                        disabled={!canStart}
                        onClick={() => router.push('/game')}
                        className="w-full h-[48px] rounded-[8px] bg-[#00FFF5] text-[#010F10] font-orbitron font-[700] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Start Game
                    </button>
                </div>

                <div className='w-full flex flex-col items-center mt-20 mb-4'>
                    <h2 className="text-[#F0F7F7] font-orbitron md:text-[24px] text-[20px] font-[700] text-center">Gameplay Rules</h2>
                    <p className='text-[#869298] text-[16px] font-dmSans text-center'>Set the rules for the game in your private game room</p>
                </div>

                {/* 2nd Setting */}
                <div className='w-full max-w-[792px] bg-[#010F10] rounded-[12px] border-[1px] border-[#003B3E] md:p-[40px] p-[20px] flex flex-col gap-5'>
                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            <RiAuctionFill className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Auction</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">If someone skips purchasing a property during auction, it will be sold to the highest bidder.</p>
                            </div>
                        </div>
                        <Switch id="auction" />
                    </div>

                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            <GiPrisoner className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600] capitalize'>Rent In Prison</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Rent will be collected when landing on properties of a player in prison.</p>
                            </div>
                        </div>
                        <Switch id="rent-in-prison" />
                    </div>

                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            <GiBank className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Mortgage</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Mortgage properties to earn 50% of their cost, but you won&apos;t get paid rent when players land on them.</p>
                            </div>
                        </div>
                        <Switch id="mortgage" />
                    </div>

                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            <IoBuild className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Even Build</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Players must build evenly across properties in a color group.</p>
                            </div>
                        </div>
                        <Switch id="even-build" />
                    </div>

                    <div className='w-full flex justify-between items-start'>
                        <div className="flex items-start md:gap-3 gap-2 max-w-[550px]">
                            <FaRandom className='md:w-6 md:h-6 w-5 h-5 mt-1.5 text-[#F0F7F7]' />
                            <div className="flex flex-col flex-1">
                                <h4 className='text-[#F0F7F7] md:text-[22px] text-[20px] font-dmSans font-[600]'>Randomize Order</h4>
                                <p className="text-[#455A64] font-[500] font-dmSans text-[16px]">Randomize the turn order at the start of the game.</p>
                            </div>
                        </div>
                        <Switch id="randomize-order" />
                    </div>

                {/* Primary CTA */}
                <div className='w-full max-w-[792px] flex flex-col items-center gap-2 mt-10'>
                    <button
                        type="button"
                        disabled={!canStart}
                        onClick={() => router.push('/game')}
                        className="w-full md:w-auto md:px-16 h-[48px] rounded-[8px] bg-[#00FFFF] text-[#010F10] font-orbitron font-[700] text-[16px] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Game
                    </button>
                    {!canStart && (
                        <p className='text-[#869298] text-[14px] font-dmSans text-center'>
                            {`Please set the ${missingFields.join(' and ')} to start the game.`}
                        </p>
                    )}
                </div>
            </main>
        </section>
    )
}

export default GameSettings
