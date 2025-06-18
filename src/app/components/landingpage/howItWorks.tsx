'use client';

import Image from "next/image";
import Link from "next/link";
import ConnectPlay from "@/app/components/landingpage/connectPlay";
import Footer from "@/app/components/landingpage/footer";
// import CarouselDemo from "ectAndPlay";

export default function HowItWorks() {
  return (
    <section className="z-0 relative w-[90rem] h-[106.75rem]">
      <div className=" w-[83.75rem] mx-auto">
        <Image src="/Vector.png" width={1340} height={686} alt="vector-image" className="top-[1024px] left-[50px] rounded-[8px] border-[1px] mx-auto"/>
      </div>

      <div className="w-[90rem] border-2 z-3">
         <div className="absolute w-full top-[6rem]">
          <div className="w-[61.9375rem] h-[8rem] flex gap-[8.75rem] mx-auto">
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
              <div className="flex mt-20">
                <div className="w-[1020px] h-[120px] mt-6 mx-auto">
                  <div className="w-[1020px] h-[56px] flex flex-row justify-between items-center mb-[20px]">
                    <h1 className="w-[500px] h-[45px] font-[orbitron] text-4xl font-bold leading-[100%] tracking-[-2%]">
                      Join Our Coummunity
                     </h1>
                     <p className="w-[29rem] h-[3.5rem] text-[DM Sans] font-normal text-[18px] leading-7 tracking-[-2%]">
                      Join our community of players, builders, and dreamers shaping the future of gaming — one block at a time.
                      </p>
                  </div>

                    <div className=" w-[487px] h-[40px] flex mx-auto">
                      <button className="telegram-channel">
                        <Link href="">
                          <h3 className="w-[201px] h-6 top-[8px] left-[15px] gap-[4px] text-[0.875rem] flex font-[DM sans] text-[#0FF0FC] mx-auto">
                            <span>
                              <Image src="/telegram.png" alt="telegram" width={20} height={20}/>
                              </span>
                              Join our telegram Channel</h3>
                        </Link>
                      </button>

                        <button className="discord-channel rounded-[0.375rem]">
                          <Link href="">
                            <h3 className="w-[192px] h-6 left-[270px] gap-[4px] top-[10px] leading-6 font-medium font-[DM sans] text-[0.875rem] text-[#0FF0FC] mx-auto flex">
                              <span><Image src="/discord.png" alt="discord" width={20} height={20} /></span>
                              Join Our Discord Channel
                            </h3>
                          </Link>
                        </button>
                    </div>
                </div>
              </div>

                <div className="w-full mt-32">
                  <Footer />
                </div>
        </div>
    </section>
  )
}
