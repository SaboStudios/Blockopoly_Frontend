'use client'
import { useState } from 'react';

export function InputField() {
  const [value, setValue] = useState('')

  return (
     <div className="w-[16.25rem] h-[2.8125rem]  rounded-[0.75rem] border-2 border-[#003B3E] mx-auto">
      <div className='mx-auto my-2 w-[7.500rem] h-[1.3125rem]'>
        <input type="text" value={value}
            onChange={(e) => setValue(e.target.value)}
                placeholder="input your name"
                className="w-[7.4375rem] h-[1.3125rem] border-none focus:outline-none  text-[#455A64] font-medium text-base leading-0 tracking-[-2%] text-center"
        />
      </div>
    </div>
  )
}