import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function JoinRoom() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = roomId.trim();
    if (!trimmed) {
      setError("Enter a room ID to continue.");
      return;
    }
    setError(null);
    router.push(`/rooms/${encodeURIComponent(trimmed)}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a room</CardTitle>
        <CardDescription>
          Enter the room ID you were invited to. If you don&apos;t have one yet, ask the room owner to share it with you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-id">Room ID</Label>
            <Input
              id="room-id"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
              placeholder="e.g. team-standup"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "room-id-error" : undefined}
            />
            {error ? (
              <p id="room-id-error" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>
          <Button type="submit">Join room</Button>
        </form>
      </CardContent>
    </Card>
  );
}
