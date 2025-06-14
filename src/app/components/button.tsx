"use Client"

import Link from "next/link";

export default function ButtonBg() {
  return (
    <div className="relative w-[16.25rem] h-[7.4375rem]mx-auto">
      <div className="butt-bg text-center">
        
          <button className="mt-4.5">
            <Link href="">
              <h3 className="w-[8.0625rem] h-[1.875rem] font-orbitron font-[700] text-2xl leading-[100%] tracking-[-10%] text-[#010F10] p-0">Let’s Go!</h3>
            </Link>
          </button>  
      </div>
    </div>
  )
}
