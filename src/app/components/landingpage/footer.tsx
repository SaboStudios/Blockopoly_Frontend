'use client'

import Image from "next/image";
import Link from "next/link";

export default function footer() {
  return (
     <footer className="w-[70rem] h-[6.5rem] mt-10 rounded-2xl p-5 bg-[#0B191A] mx-auto flex flex-row items-center justify-between">
      <div className="w-[24.718rem] h-16 gap-2.5">
        <div className="w-16 h-16 gap-2.5 flex rounded-xl p-2.5 bg-[#0FF0FC]">
         <Image src="/footer-logo.png" alt="" width={44} height={37.71428680419922}/>
        </div>
      </div>

       <div className="w-[13.0625rem] h-[2.25rem] gap-1.5 p-2.5 flex">
        <Image src="/copyright.png" alt="" width={16} height={16} className="w-4 h-4"/>
        <h1 className="w-[10.4375rem] h-[13px] font-normal font-[Dm Sans] text-[10px]">All Rights Reserved - CorePoly 2025</h1>
       </div>
        
        <div className="w-[24.7185rem] h-5 gap-6 flex items-end justify-end">
          <Link href="#"> <Image src="/facebook.png" alt="facebook" width={20} height={20}/></Link>  
            <Link href="#"> <Image src="/new-twitter.png" alt="twitter" width={20} height={20}/></Link>
              <Link href="#"> <Image src="/github.png" alt="github" width={20} height={20}/></Link>
                <Link href="#"> <Image src="/footer-discord.png" alt="discord" width={20} height={20}/></Link>
        </div>
    </footer>
  )
}


