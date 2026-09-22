"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ROOM_CODE_MIN_LENGTH = 4;
const ROOM_CODE_MAX_LENGTH = 12;
const ROOM_CODE_PATTERN = /^[A-Za-z0-9]+$/;

function validateRoomCode(rawCode: string): string | null {
    const code = rawCode.trim();

    if (!code) {
        return "Please enter a room code.";
    }

    if (code.length < ROOM_CODE_MIN_LENGTH) {
        return `Room code must be at least ${ROOM_CODE_MIN_LENGTH} characters.`;
    }

    if (code.length > ROOM_CODE_MAX_LENGTH) {
        return `Room code must be at most ${ROOM_CODE_MAX_LENGTH} characters.`;
    }

    if (!ROOM_CODE_PATTERN.test(code)) {
        return "Room code can only contain letters and numbers.";
    }

    return null;
}

export default function JoinRoom() {
    const router = useRouter();
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const trimmedCode = roomCode.trim();
    const isInvalid = validateRoomCode(trimmedCode) !== null;

    const handleChange = (value: string) => {
        setRoomCode(value);
        if (error) {
            setError(null);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationError = validateRoomCode(roomCode);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        router.push(`/game-room?room=${encodeURIComponent(trimmedCode)}`);
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-full max-w-md flex-col gap-4"
            >
                <h1 className="text-2xl font-bold">Join a Room</h1>

                <div className="flex flex-col gap-2">
                    <label htmlFor="room-code" className="text-sm font-medium">
                        Room Code
                    </label>
                    <Input
                        id="room-code"
                        name="roomCode"
                        value={roomCode}
                        onChange={(event) => handleChange(event.target.value)}
                        placeholder="Enter room code"
                        autoComplete="off"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "room-code-error" : undefined}
                    />
                    {error && (
                        <p
                            id="room-code-error"
                            role="alert"
                            className="text-sm text-red-500"
                        >
                            {error}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={isInvalid}>
                    Join Room
                </Button>
            </form>
        </div>
    );
}
