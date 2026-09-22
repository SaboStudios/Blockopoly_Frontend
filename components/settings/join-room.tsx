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
                    <p className='text-[#869298] text-[16px] font-dmSans text-center'>Choose a room below to join, or create a new one.</p>
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
            </main>
        </section>
    )
}

export default JoinRoom
