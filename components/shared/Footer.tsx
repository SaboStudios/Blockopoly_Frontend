import React from 'react'
import logo from "@/public/footerLogo.svg"
import Logo from './logo'
import Link from 'next/link'
import { FiFacebook, FiGithub } from 'react-icons/fi'
import { RiTwitterXFill } from 'react-icons/ri'
import { RxDiscordLogo } from 'react-icons/rx'

const Footer = () => {
    return (
        <footer className="w-full md:pb-12 pb-8 px-4">
            <div className='w-full max-w-[1120px] mx-auto flex flex-col md:flex-row items-center md:justify-between justify-center md:gap-0 gap-4 bg-[#0B191A] rounded-[16px] p-[20px]'>
                <Logo className="md:w-[60px] w-[55px]" image={logo} href="/" />

                <p className='text-[#F0F7F7] text-[12px] font-dmSans font-[400]'>© 2023 All rights reserved. Blockopoly {new Date().getFullYear()}</p>

                <div className='flex items-center gap-5'>
                    <Link href="/" aria-label="Facebook" className='text-[#F0F7F7] hover:text-[#00F0FF] focus-visible:text-[#00F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B191A] rounded transition-colors duration-300 ease-in-out text-[20px]'>
                        <FiFacebook aria-hidden="true" />
                    </Link>
                    <Link href="/" aria-label="X (Twitter)" className='text-[#F0F7F7] hover:text-[#00F0FF] focus-visible:text-[#00F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B191A] rounded transition-colors duration-300 ease-in-out text-[20px]'>
                        <RiTwitterXFill aria-hidden="true" />
                    </Link>
                    <Link href="/" aria-label="GitHub" className='text-[#F0F7F7] hover:text-[#00F0FF] focus-visible:text-[#00F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B191A] rounded transition-colors duration-300 ease-in-out text-[20px]'>
                        <FiGithub aria-hidden="true" />
                    </Link>
                    <Link href="/" aria-label="Discord" className='text-[#F0F7F7] hover:text-[#00F0FF] focus-visible:text-[#00F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B191A] rounded transition-colors duration-300 ease-in-out text-[20px]'>
                        <RxDiscordLogo aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer