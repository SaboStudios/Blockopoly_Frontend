'use client'
import { Check, ChevronLeft, ChevronRight, CircleAlert, Flag, MoveLeft, MoveRight, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { PiUsersThree } from 'react-icons/pi';

const Players = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="absolute top-0 left-0 bg-[#010F10] z-10 lg:hidden text-[#869298] hover:text-[#F0F7F7] w-[40px] h-[40px] rounded-e-[8px] flex items-center justify-center border-[1px] border-white/10"
                    aria-hidden="true"
                >
                    <PiUsersThree className="w-5 h-5" />
                </button>
            )}
            <aside
                className={`
                    h-full overflow-y-auto no-scrollbar bg-[#010F10] px-4 pb-10 rounded-e-[12px] border-r-[1px] border-white/10
                    transition-all duration-300 ease-in-out
                    fixed z-20 top-0 left-0 
                    transform ${isSidebarOpen ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    lg:static lg:transform-none
                    ${isSidebarOpen ? 'lg:w-[272px] md:w-1/2 w-full' : 'lg:w-[60px] w-full'}
                `}
            >
                <div className="w-full h-full flex flex-col gap-4 ">
                    <div className="w-full sticky top-0 bg-[#010F10] py-4 flex justify-between items-center">
                        {/* Show "Players" title only when the sidebar is open */}
                        <h4 className={`font-[700] font-dmSans md:text-[16px] text-[14px] text-[#F0F7F7] ${!isSidebarOpen && 'hidden'}`}>
                            Players
                        </h4>

                        {/* Toggle button with changing icon */}
                        <button onClick={toggleSidebar} className="text-[#869298] hover:text-[#F0F7F7] lg:hidden">
                            {isSidebarOpen ? <ChevronLeft /> : <PiUsersThree className="size-[25px]" />}
                        </button>
                    </div>

                    {/* Player */}
                    <div className={`
                        w-full flex flex-col gap-3 bg-[#0B191A] p-3 rounded-[12px]
                        transition-opacity duration-200
                        ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}>
                        {/* Example Player Item */}
                        <div className="flex items-center gap-2">
                            <div className="size-[32px] rounded-full bg-[#FFBE04]" />
                            <span className='text-[#F0F7F7] font-medium font-dmSans text-[16px]'>Aji <span className='text-[10px]'>(Me)</span></span>
                        </div>

                        <button type="button" className='w-[118px] h-[29px] border-[1px] border-[#003B3E] rounded-[20px] bg-transparent text-[#869298] hover:text-[#F0F7F7] self-end text-[10px] cursor-pointer'>Change appearance</button>
                    </div>

                    {/* Another player */}
                    <div className={`
                        w-full flex flex-col gap-3 bg-[#0B191A] p-3 rounded-[12px]
                        transition-opacity duration-200
                        ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}>
                        {/* Example Player Item */}
                        <div className="flex items-center gap-2">
                            <div className="size-[32px] rounded-full bg-[#0E8AED]" />
                            <span className='text-[#F0F7F7] font-medium font-dmSans text-[16px]'>Signor </span>
                        </div>
                    </div>


                    {/* Trade */}
                    <div className={`w-full flex flex-col mt-4 gap-3 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-full flex justify-between items-center">
                            <h4 className='font-[700] font-dmSans text-[14px] text-[#F0F7F7]'>Trade</h4>

                            <button className='text-[#869298] hover:text-[#F0F7F7] px-[12px] py-[8px] rounded-[20px] bg-[#131F25] flex justify-center items-center cursor-pointer gap-[4px] text-[9px]'>
                                <Plus className='w-3 h-3' />
                                Create Trade
                            </button>
                        </div>

                        <div className="w-full p-[12px] bg-[#0B191A] rounded-[12px]">
                            <div className="bg-[#131F25] w-full flex flex-col items-center p-[12px] rounded-[8px] gap-4">
                                <p className='text-[#73838B] text-[11px] text-center'>
                                    <CircleAlert className='w-3 h-3 inline mr-1' />Make trades with other players to exchange properties, money, and bonus cards. Use the &quot;Create Trade&quot; button to create a new trade.</p>
                                <button className='text-[#869298] hover:text-[#F0F7F7] px-[10px] py-[6px] rounded-[20px] bg-[#263238] flex justify-center cursor-pointer items-center gap-[6px] text-[10px]'>
                                    <Check className='w-3 h-3' />
                                    Got it
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Properties */}
                    <div className={`w-full flex flex-col my-4 gap-3 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-full flex justify-between items-center">
                            <h4 className='font-[700] font-dmSans text-[14px] text-[#F0F7F7]'>My Properties</h4>

                            <button className='text-[#869298] hover:text-[#F0F7F7] px-[12px] py-[8px] rounded-[20px] bg-[#131F25] flex justify-center items-center cursor-pointer gap-[4px] text-[9px]'>
                                <Flag className='w-3 h-3' />
                                Declare Bankruptcy
                            </button>
                        </div>

                        <div className="w-full p-[12px] bg-[#0B191A] rounded-[12px]">
                            <div className="bg-[#131F25] w-full flex flex-col items-center p-[12px] rounded-[8px] gap-4">
                                <p className='text-[#73838B] text-[11px] text-center'>
                                    <CircleAlert className='w-3 h-3 inline mr-1' />You can start building houses on you property when you have a complete set.</p>
                                <p className='text-[#73838B] text-[11px] text-center'>
                                    Click on a property to upgrade, downgrade or sell it</p>

                                <button className='text-[#869298] hover:text-[#F0F7F7] px-[10px] py-[6px] rounded-[20px] bg-[#263238] flex justify-center cursor-pointer items-center gap-[6px] text-[10px]'>
                                    <Check className='w-3 h-3' />
                                    Got it
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </aside>
        </>
    )
}

export default Players