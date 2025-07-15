'use client'
import React from 'react'
import { Send, Users } from 'lucide-react';

const ChatRoom = () => {
    return (
        <div className="w-full h-[685px] border-[1px] border-[#263238] flex flex-col mt-4 rounded-[12px]">
            {/* top */}
            <div className="w-full h-[37px] flex justify-between items-center border-b-[1px] border-[#263238] px-4">
                <h4 className="font-[700] font-dmSans text-[#F0F7F7] text-[14px]">Chat</h4>
                <Users className='w-4 h-4 text-[#F0F7F7]' />
            </div>
            {/* content */}
            <main className="w-full h-[calc(100%-89px)] overflow-y-auto no-scrollbar flex justify-center items-center">
                <p className="text-[#AFBAC0] text-center text-[14px] font-dmSan font-[500]">No messages yet</p>
            </main>

            {/* bottom */}
            <div className="w-full border-t-[1px] border-[#263238] h-[52px] flex items-stretch gap-2 p-2">
                <input type="text" className="outline-none flex-1 bg-[#0B191A] rounded-[20px] text-[12px] text-[#AFBAC0] font-dmSans px-3" name="chat" id="chat" placeholder='Type a message...' />

                {/* send btn */}
                <button className='size-[36px] rounded-[20px] bg-[#010F10] border-[1px] border-[#263238] flex items-center justify-center text-[#AFBAC0]'>
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default ChatRoom