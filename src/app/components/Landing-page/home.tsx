"user client";

import Image from "next/image";
import Link from "next/link";
import { InputField } from "@/app/components/input-field";
import ButtonBg from "@/app/components/button"


export default function Home() {
  
  return (
    <section className="relative">
      <div>
          <Image src="/bg gradient.png" alt="bg-color" width={1440} height={1024} className="z-1 absolute top-0"/>
           <Image src="/board.png" alt="bg-color" width={1440} height={1024} className="z-0" />
           {/* <div className="max-w-[766px] h-[451px] mx-auto gap-[24px] border-2 border-yellow-400">
        container
      </div> */}
      </div>

      <div className="max-w-[47.875rem] absolute top-[14.8125rem] left-[21.0625rem] h-[28.1875rem] mx-auto gap-6 z-2">
        <div className="w-[47.875rem] h-[14.75rem]">
          <div className="w-[47.875rem] h-[11.5rem]">
            <ul className="font-[700] w-[47.875rem] h-[4rem] text-4xl leading-[4rem] tracking-normal capitalize font-[Orbitron] flex justify-between ">
              <Link href="#"><li className="w-[11.625rem] h-[4rem]">Conquer</li></Link>
              <Link href="#"><li className="w-[7rem] h-[4rem]">Build</li></Link>
              <Link href="#"><li className="w-[12.9375rem] h-[4rem]">Trade on</li></Link>
            </ul>

            <div className="relative">
              {/* <Image src="/the Block.png" alt="block-image" width={766} height={120}/> */}
              <h1 className="w-[47.875rem] font-[900] text-[7.25rem] font-[Orbitron] leading-[7.5rem] tracking-tight capitalize m-0 bloc-color text-shadow">THE BLOCK</h1>
              <Link href="#">
                <Image src="/QuestionMark.png" 
                  alt="block-image" width={27} height={27} 
                  className="absolute top-[112.02px] left-[522.51px] pt-[0.83px]
                  pr-[5.8px] pb-[0.83px] pl-[5.8px] gap-[2.76px] rotate-[12deg]"
                />
              </Link>

            </div>
          </div>
            <div className="w-[37.875rem] h-12 mx-auto">
              <p className="font-normal text-sm leading-6 tracking-wilder text-center font-[DM Sans]">Step into Blockopoly — the Web3 twist on the classic game of strategy,
                   ownership, and fortune. Collect tokens, complete quests, and become the ultimate blockchain tycoon.
              </p>
            </div>
        </div>

          <div className="w-[21.6875rem] h-[11.9375rem] mt-[2rem] mx-auto gap-[2rem] flex flex-col">
            <div className="w-[16.25rem] h-[7.4375rem] gap-[1rem] flex flex-col mx-auto">
              <InputField />
                <ButtonBg />
            </div>
          
          <div className="w-[21.6875rem] h-[2.5rem] flex gap-4">
            <button className="w-[8.75rem] h-[2.5rem]">
              <h3 className="w-[5.8125rem] h-6 top-[8px] left-[15px] gap-[4px] flex font-[DM sans] text-[#0FF0FC]"><span></span>Join Room</h3>
            </button>
              <button className="w-[14.1875rem] h-[2.5rem] rounded-[0.375rem] border-2 border-blue-600 bg-[#003B3E]">
                  <h3 className="w-[10.875rem] h-6 left-[9.6875rem] gap-[4px] top-[10px] font-[DM sans] rounded-[6px] text-[#0FF0FC]"><span></span>Create A Private Game</h3>
              </button>
          </div>

          </div>

        {/* container */}
      </div>
 
        create-user
    </section>
  )
}