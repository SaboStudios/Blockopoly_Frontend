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
                    <Link href="/" className='text-[#F0F7F7] hover:text-[#00F0FF] transition-colors duration-300 ease-in-out text-[20px]'>
                        <FiFacebook />
                    </Link>
                    <Link href="/" className='text-[#F0F7F7] hover:text-[#00F0FF] transition-colors duration-300 ease-in-out text-[20px]'>
                        <RiTwitterXFill />
                    </Link>
                    <Link href="/" className='text-[#F0F7F7] hover:text-[#00F0FF] transition-colors duration-300 ease-in-out text-[20px]'>
                        <FiGithub />
                    </Link>
                    <Link href="/" className='text-[#F0F7F7] hover:text-[#00F0FF] transition-colors duration-300 ease-in-out text-[20px]'>
                        <RxDiscordLogo />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer