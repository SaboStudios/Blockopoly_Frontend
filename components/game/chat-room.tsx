'use client'
import React, { useState } from 'react'
import { Send, Users } from 'lucide-react';

const ChatRoom = () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        const trimmed = message.trim();
        if (!trimmed) return;
        // Send logic placeholder — wire up to backend when available.
        setMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full h-full min-h-[320px] max-h-[685px] border-[1px] border-[#263238] flex flex-col mt-4 rounded-[12px]">
            {/* top */}
            <div className="w-full h-[37px] shrink-0 flex justify-between items-center border-b-[1px] border-[#263238] px-4">
                <h4 className="font-[700] font-dmSans text-[#F0F7F7] text-[14px]">Chat</h4>
                <Users className='w-4 h-4 text-[#F0F7F7]' aria-hidden="true" />
            </div>
            {/* content */}
            <main className="w-full flex-1 min-h-0 overflow-y-auto no-scrollbar flex justify-center items-center">
                <p className="text-[#AFBAC0] text-center text-[14px] font-dmSan font-[500]">No messages yet — start the conversation by sending the first one.</p>
            </main>

            {/* bottom */}
            <div className="w-full border-t-[1px] border-[#263238] h-[52px] shrink-0 flex items-stretch gap-2 p-2">
                <input
                    type="text"
                    className="outline-none flex-1 bg-[#0B191A] rounded-[20px] text-[12px] text-[#AFBAC0] font-dmSans px-3"
                    name="chat"
                    id="chat"
                    placeholder='Type a message...'
                    aria-label="Chat message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {/* send btn */}
                <button
                    type="button"
                    aria-label="Send message"
                    onClick={handleSend}
                    className='size-[36px] rounded-[20px] bg-[#010F10] border-[1px] border-[#263238] flex items-center justify-center text-[#AFBAC0]'
                >
                    <Send className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

export default ChatRoom