'use client'
import { House } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaUser } from 'react-icons/fa6'
import { IoIosAddCircle } from 'react-icons/io'
import { IoKey } from 'react-icons/io5'
import { RxDotFilled } from 'react-icons/rx'

const JoinRoom = () => {

    const router = useRouter()

    return (
        <section className='w-full min-h-screen bg-settings bg-cover bg-fixed bg-center'>
            <main className="w-full min-h-screen py-20 flex flex-col items-center justify-start bg-[#010F101F] backdrop-blur-[12px] px-4">
                <div className='w-full flex flex-col items-center'>
                    <h2 className="text-[#F0F7F7] font-orbitron md:text-[24px] text-[20px] font-[700] text-center">Join Room</h2>
                    <p className='text-[#869298] text-[16px] font-dmSans text-center'>Select the room you would like to join</p>
                </div>
                {/* buttons */}
                <div className='w-full max-w-[792px] mt-10 flex justify-between items-center'>
                    {/* Home button */}
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="relative group w-[227px] h-[40px] bg-transparent border-none p-0 overflow-hidden cursor-pointer"
                    >
                        <svg
                            width="227"
                            height="40"
                            viewBox="0 0 227 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-0 left-0 w-full h-full"
                        >
                            <path
                                d="M6 1H221C225.373 1 227.996 5.85486 225.601 9.5127L207.167 37.5127C206.151 39.0646 204.42 40 202.565 40H6C2.96244 40 0.5 37.5376 0.5 34.5V6.5C0.5 3.46243 2.96243 1 6 1Z"
                                fill="#0E1415"
                                stroke="#003B3E"
                                strokeWidth={1}
                                className="group-hover:stroke-[#00F0FF] transition-all duration-300 ease-in-out"
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[#0FF0FC] capitalize text-[13px] font-dmSans font-medium z-10">
                            <House className="mr-1 w-[14px] h-[14px]" />
                            Go Back Home
                        </span>
                    </button>

                    {/* Create New Room */}
                    <button
                        type="button"
                        className="relative group w-[227px] h-[40px] bg-transparent border-none p-0 overflow-hidden cursor-pointer"
                    >
                        <svg
                            width="227"
                            height="40"
                            viewBox="0 0 227 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-0 left-0 w-full h-full transform scale-x-[-1] scale-y-[-1]"
                        >
                            <path
                                d="M6 1H221C225.373 1 227.996 5.85486 225.601 9.5127L207.167 37.5127C206.151 39.0646 204.42 40 202.565 40H6C2.96244 40 0.5 37.5376 0.5 34.5V6.5C0.5 3.46243 2.96243 1 6 1Z"
                                fill="#003B3E"
                                stroke="#003B3E"
                                strokeWidth={1}
                                className="group-hover:stroke-[#00F0FF] transition-all duration-300 ease-in-out"
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[#00F0FF] capitalize text-[12px] font-dmSans font-medium z-10">
                            <IoIosAddCircle className="mr-1 w-[14px] h-[14px]" />
                            Create New Room
                        </span>
                    </button>
                </div>

                {/* rooms */}
                <div className='w-full max-w-[792px] mt-10 bg-[#010F10] rounded-[12px] border-[1px] border-[#003B3E] md:px-20 px-6 py-12 flex flex-col gap-4'>

                    {/* room */}
                    <div className="w-full p-4 border-[1px] flex flex-col items-start border-[#0E282A] rounded-[12px] cursor-pointer hover:border-[#00F0FF]">
                        <div className="w-full flex justify-between items-center">
                            <h4 className="text-[#F0F7F7] text-[20px] uppercase font-dmSans font-[800]">QVN46A</h4>
                            <span className="flex gap-1.5 text-[#263238]">
                                <RxDotFilled className='w-5 h-5' />
                                <RxDotFilled className='w-5 h-5' />
                                <RxDotFilled className='w-5 h-5' />
                                <FaUser className="text-[#F0F7F7]" />
                            </span>
                        </div>
                        <span className="flex gap-1.5 text-[#263238] mt-2">
                            <IoKey className="text-[#F0F7F7] w-5 h-5" />
                            <RxDotFilled className='w-5 h-5' />
                            <RxDotFilled className='w-5 h-5' />
                            <RxDotFilled className='w-5 h-5' />
                        </span>
                    </div>

                    {/* room */}
                    <div className="w-full p-4 border-[1px] flex flex-col items-start border-[#0E282A] rounded-[12px] cursor-pointer hover:border-[#00F0FF]">
                        <div className="w-full flex justify-between items-center">
                            <h4 className="text-[#F0F7F7] text-[20px] uppercase font-dmSans font-[800]">QKM46C</h4>
                            <span className="flex gap-1.5 text-[#263238]">
                                <RxDotFilled className='w-5 h-5' />
                                <RxDotFilled className='w-5 h-5' />
                                <RxDotFilled className='w-5 h-5' />
                                <FaUser className="text-[#F0F7F7]" />
                            </span>
                        </div>
                        <span className="flex gap-1.5 text-[#263238] mt-2">
                            <IoKey className="text-[#F0F7F7] w-5 h-5" />
                            <RxDotFilled className='w-5 h-5' />
                            <RxDotFilled className='w-5 h-5' />
                            <RxDotFilled className='w-5 h-5' />
                        </span>
                    </div>

                    {/* room */}
                    <div className="w-full p-4 border-[1px] flex flex-col items-start border-[#0E282A] rounded-[12px] cursor-pointer hover:border-[#00F0FF]">
                        <div className="w-full flex justify-between items-center">
                            <h4 className="text-[#F0F7F7] text-[20px] uppercase font-dmSans font-[800]">QYF91U</h4>
                            <span className="flex gap-1.5 text-[#263238]">
                                <RxDotFilled className='w-5 h-5' />
                                <RxDotFilled className='w-5 h-5' />
                                <RxDotFilled className='w-5 h-5' />
                                <FaUser className="text-[#F0F7F7]" />
                            </span>
                        </div>
                        <span className="flex gap-1.5 text-[#263238] mt-2">
                            <IoKey className="text-[#F0F7F7] w-5 h-5" />
                            <RxDotFilled className='w-5 h-5' />
                            <RxDotFilled className='w-5 h-5' />
                            <RxDotFilled className='w-5 h-5' />
                        </span>
                    </div>


                    <div className="w-full h-[52px] flex  mt-8">
                        <input type='text' placeholder='Input room code' className='w-full h-full px-4 text-[#73838B] border-[1px] border-[#0E282A] rounded-[12px] flex-1 outline-none focus:border-[#00F0FF]' />

                        <button
                            type="button"
                            onClick={() => router.push('/game-settings')}
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
                            <span className="absolute inset-0 flex items-center justify-center text-[#010F10] capitalize text-[18px] -tracking-[2%] font-orbitron font-[700] z-10">
                                Join Room
                            </span>
                        </button>
                    </div>

                </div>
            </main>
        </section>
    )
}

export default JoinRoom