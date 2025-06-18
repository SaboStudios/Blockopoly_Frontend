"user client";

import Image from "next/image";
import Link from "next/link";
import { InputField } from "@/app/components/input-field";
import ButtonBg from "@/app/components/button";


export default function Home() {
  return (
    <section className="relative w-[90rem] h-[64rem]">
      <div>
        <Image src="/bg gradient.png" alt="bg-color" width={1440} height={1024} className="z-1 absolute top-0"/><Image src="/board.png" alt="bg-color" width={1440} height={1024} className="z-0" />
      </div>

        <div className="absolute w-full z-2 top-[10.8125rem]">
          <div className="max-w-[47.875rem]  h-[28.1875rem] gap-6 z-2 mx-auto">
           <div className="w-[47.875rem] h-[14.75rem]">
            <div className="w-[47.875rem] h-[11.5rem]">
              <ul className="font-[700] w-[47.875rem] h-[4rem] text-4xl leading-[4rem] tracking-normal capitalize font-orbitron flex justify-between ">
                <Link href="#"><li className="w-[11.625rem] h-[4rem]">Conquer</li></Link>
                <Link href="#"><li className="w-[7rem] h-[4rem]">Build</li></Link>
                <Link href="#"><li className="w-[12.9375rem] h-[4rem]">Trade on</li></Link>
              </ul>

              <div className="">
                  <h1 className="relative w-[47.875rem] font-black text-[7rem] font-orbitron leading-[7.5rem] tracking-[-2%] capitalize m-0 bloc-color text-shadow">THE BLOCK</h1>
                <Link href="#">
                  <Image src="/questionmark.png" 
                    alt="block-image" width={27} height={27} 
                    className="absolute top-[7.00125rem] left-[53.2rem] pt-[2.5px]
                    pr-[5.8px] pb-[0.83px] pl-[5.8px] gap-[2.76px] font-[24.87px] rotate-[12deg]"
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
                <div className=" w-[21.6875rem] h-[2.5rem] flex">
                  <button className="join-room w-[8.75rem] h-[2.5rem]">
                    <Link href="">
                      <h3 className="w-[5.8125rem] h-6 top-[8px] left-[15px] gap-[4px] text-[0.875rem] flex font-[DM sans] text-[#0FF0FC] mx-auto"><span></span>Join Room</h3>
                      </Link>
                      </button>
                      <button className="private-game w-[14.1875rem] h-[2.5rem] rounded-[0.375rem]">
                        <Link href="">
                          <h3 className="w-[10.875rem] h-6 left-[9.6875rem] gap-[4px] top-[10px] leading-[2rem] font-medium font-[DM sans] text-[0.875rem] text-[#0FF0FC] mx-auto pb-[30px]"><span></span>Create A Private Game</h3>
                        </Link>
                      </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}