'use client'
import { useState } from 'react';

export function InputField() {
  const [value, setValue] = useState('')

  return (
     <div className="w-[16.25rem] h-[2.8125rem]  rounded-[0.75rem] border-2 border-[#003B3E] p-3 mx-auto">
        <input type="text" value={value}
            onChange={(e) => setValue(e.target.value)}
                placeholder="input your name"
                className="w-[12.25rem] h-[1.3125rem] font-medium text-base leading-0 tracking-[-2%] text-center ml-5 mx-auto"
        />
    </div>
  )
}