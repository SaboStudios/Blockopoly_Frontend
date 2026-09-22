'use client'
import { ChevronRight, Copy, Settings } from 'lucide-react';
import React, { useState } from 'react'
import ChatRoom from './chat-room';
import { PiChatsCircle } from 'react-icons/pi';
import TradeModal from './trade-modal';
import AuctionOverlay from './auction-overlay';
import { useEconomy } from '@/lib/game/economy/use-economy';

const GameRoom = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTradeOpen, setIsTradeOpen] = useState(false);

    const {
        players,
        proposals,
        auction,
        acceptProposal,
        rejectProposal,
        counterProposal,
        placeBid,
        closeAuction,
    } = useEconomy();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="absolute top-0 right-0 bg-[#010F10] z-10 lg:hidden text-[#869298] hover:text-[#F0F7F7] w-[40px] h-[40px] rounded-s-[8px] flex items-center justify-center border-[1px] border-white/10"
                    aria-hidden="true"
                >
                    <PiChatsCircle className="w-5 h-5" />
                </button>
            )}
            <aside
                className={`
                            h-full overflow-y-auto no-scrollbar bg-[#010F10] p-4 rounded-s-[12px] border-l-[1px] border-white/10
                            transition-all duration-300 ease-in-out
                            fixed z-20 top-0 right-0 
                            transform ${isSidebarOpen ? 'translate-x-0 lg:translate-x-0' : 'translate-x-full lg:translate-x-0'}
                            lg:static lg:transform-none
                            ${isSidebarOpen ? 'lg:w-[272px] md:w-1/2 w-full' : 'lg:w-[60px] w-full'}
                        `}
            >
                <div className="w-full h-full flex flex-col gap-3">
                    {/* Toggle button with changing icon */}
                    <button onClick={toggleSidebar} className="text-[#869298] hover:text-[#F0F7F7] lg:hidden">
                        {isSidebarOpen ? <ChevronRight /> : <PiChatsCircle className="size-[25px]" />}
                    </button>
                    <div className={`w-full flex justify-between items-center ${!isSidebarOpen && 'hidden'}`}>
                        {/* Show only when the sidebar is open */}
                        <h4 className={`font-[700] font-dmSans md:text-[16px] text-[#F0F7F7]`}>
                            Game Room
                        </h4>

                        {/* Toggle buttons  */}
                        <button onClick={toggleSidebar} className="text-[#869298] hover:text-[#F0F7F7] bg-[#0B191A] size-[32px] rounded-full flex justify-center items-center cursor-pointer">
                            <Settings className='w-5 h-5' />
                        </button>

                    </div>

                    {/* game room link */}
                    <div className={`
                                w-full flex
                                transition-opacity duration-200
                                ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                            `}>
                        <div className='flex-1 overflow-x-auto no-scrollbar bg-[#0B191A] px-[12px] py-[8px] pointer-events-none rounded-s-[12px] text-[#AFBAC0] text-[12px] font-dmSans font-medium'>
                            https://gameroom10qd.io/rok
                        </div>
                        <button className="bg-[#0E282A] w-[81px] py-[8px] rounded-e-[12px] text-[#AFBAC0] text-[12px] font-dmSans font-medium flex justify-center items-center gap-[6px] cursor-pointer">
                            <Copy className='w-4 h-4' />
                            Copy
                        </button>
                    </div>

                    {/* trade + auction actions */}
                    <div className={`w-full flex gap-2 ${!isSidebarOpen && 'hidden'}`}>
                        <button
                            onClick={() => setIsTradeOpen(true)}
                            className="flex-1 bg-[#0E282A] text-[#F0F7F7] text-[12px] font-dmSans font-medium py-[8px] rounded-[8px] hover:bg-[#123638]"
                        >
                            Propose Trade
                        </button>
                    </div>

                    {/* pending proposals inbox */}
                    {isSidebarOpen && proposals.length > 0 && (
                        <div className="w-full flex flex-col gap-2" aria-live="polite">
                            <h5 className="text-[#AFBAC0] text-[12px] font-dmSans font-medium">Pending Proposals</h5>
                            {proposals.map((p) => (
                                <div key={p.id} className="bg-[#0B191A] rounded-[8px] p-2 flex flex-col gap-1">
                                    <span className="text-[#F0F7F7] text-[12px] font-dmSans">
                                        {p.fromPlayer} → {p.toPlayer}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => acceptProposal(p.id)}
                                            className="flex-1 bg-[#0E282A] text-[#F0F7F7] text-[11px] rounded-[6px] py-[4px]"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => rejectProposal(p.id)}
                                            className="flex-1 bg-[#1A0E0E] text-[#F0F7F7] text-[11px] rounded-[6px] py-[4px]"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => counterProposal(p.id)}
                                            className="flex-1 bg-[#0B191A] text-[#AFBAC0] text-[11px] rounded-[6px] py-[4px]"
                                        >
                                            Counter
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* chat room */}
                    {isSidebarOpen && <ChatRoom />}

                </div>
            </aside>

            {isTradeOpen && (
                <TradeModal
                    players={players}
                    onClose={() => setIsTradeOpen(false)}
                />
            )}

            {auction && (
                <AuctionOverlay
                    auction={auction}
                    onBid={placeBid}
                    onClose={closeAuction}
                />
            )}
        </>
    )
}

export default GameRoom