'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const GameRoomLoading = () => {
    const [dots, setDots] = useState("");

    const router = useRouter();

    useEffect(() => {
        const dotInterval = setInterval(() => {
            setDots((prev) => (prev.length < 5 ? prev + "A" : ""));
        }, 300);

        return () => clearInterval(dotInterval);
    }, []);

    useEffect(() => {
        const navigationTimer = setTimeout(() => {
            router.push('/game-play');
        }, 5000); // 5-second delay

        return () => clearTimeout(navigationTimer);
    }, [router]);

    return (
        <section className='w-full h-[calc(100dvh-87px)] bg-settings bg-cover bg-fixed bg-center'>
            <main className="w-full h-[calc(100dvh-87px)] flex flex-col items-center justify-center bg-gradient-to-b from-[#010F10] to-[#010F1033] px-4">

                <div className="w-full max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-6 text-[#F0F7F7] text-center">Loading Game</h2>
                    <p className="text-[12px] md:text-[14px] text-center text-[#869298] font-[500]">
                        Always remember to strategize properly and...
                        <br />
                        <span className="font-semibold text-center uppercase">show no mercy!</span>
                    </p>
                    <p className="mt-6 text-[12px] text-center md:text-[14px] text-[#869298] font-[500] animate-pulse">
                        😈MUAHAHAHAHAHA{dots}😈
                    </p>
                </div>

            </main>
        </section>
    )
}

export default GameRoomLoading