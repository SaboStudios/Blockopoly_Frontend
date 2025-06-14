'use client';

import Image from "next/image";

export default function HowItWorks() {
  return (
    <section>
        <div className="z-0 relative">
           <Image src="/Vector.png" 
            width={1340} 
            height={686}
            alt="vector-image" 
            className="top-[1024px] left-[50px] rounded-[8px] border-[1px] mx-auto"
       />
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
         <div className="absolute top-[21.857rem]">
            <Image src="/Vector 57.png" alt="vector-img" width={1440} height={856}/>
         </div>
         
        </div>
    </section>
  )
}
