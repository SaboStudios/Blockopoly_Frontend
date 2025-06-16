'use client';

import Image from "next/image";
import ConnectPlay from "@/app/components/landingpage/connectPlay"
// import CarouselDemo from "ectAndPlay";

export default function HowItWorks() {
  return (
    <section className="z-0 relative">
        <div className=" w-[83.75rem] ml-[3.125rem]">
          <Image src="/Vector.png" 
            width={1340} 
            height={686}
            alt="vector-image" 
            className="top-[1024px] left-[50px] rounded-[8px] border-[1px] mx-auto"
            />
            </div>
        <div className="absolute w-full top-[6rem]">
          <div className="w-[61.9375rem] h-[8rem] flex gap-[8.75rem] z-2 mx-auto">
            <div className="w-96 h-32">
                <h1 className="font-[Orbitron] font-bold text-6xl leading-16 tracking-[-2%]">What is Blockopoly</h1>
            </div>
              <div className="w-[29rem] h-[5.25rem] my-auto">
                <p>Blockopoly is a fun digital board game where you collect tokens,
                    trade with others, and complete challenges to win, all powered by blockchain.
                </p>
              </div>
          </div>
        </div>
         
         <div className="absolute w-[90rem] h-[53.5rem] top-[21.857rem]">
            <Image src="/Vector 57.png" alt="vector-img" width={1440} height={856} className="z-0"/>
            <div className="absolute w-[83.75rem] h-[47.4375rem] left-[3.125rem] top-[3rem] z-1">
              <div className="w-[655px] h-[135px] gap-[16px] flex flex-col mx-auto text-center justify-center max-lg:flex-col whitespace-wrap">
                <h1 className="font-orbitron font-black text-[3rem] text-[#F0F7F7] leading-[100%] tracking-[0%]">
                  How it works
                  </h1>
                <p className="font-[DM Sans] font-400 text-[20px] leading-[30px] tracking-[0%] text-center align-middle text-[#F0F7F7]">
                  It’s super simple how Blockopoly works. The flow has been designed to help you not to stress too much.
                  </p>
              </div>
                 <ConnectPlay />
            </div>
         </div>
         
       
    </section>
  )
}
