import GameRoom from "@/components/game/game-room";
import Players from "@/components/game/players";
import { GameProvider } from "@/context/game-context";


export default function RoomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GameProvider>
            <main className="w-full h-screen overflow-x-hidden relative flex flex-row lg:gap-2">
                <Players />
                {children}
                <GameRoom />
            </main>
        </GameProvider>
    );
}