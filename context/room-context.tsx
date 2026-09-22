"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ------------------------------------------------------------------ *
 * Room protocol types (#307)
 * ------------------------------------------------------------------ */

export type RoomMemberId = string;

export type RoomMember = {
  id: RoomMemberId;
  name: string;
  avatar?: string;
  isHost: boolean;
  ready: boolean;
  connected: boolean;
  joinedAt: number;
};

export type RoomPhase = "lobby" | "starting" | "in-game";

export type RoomState = {
  code: string;
  hostId: RoomMemberId;
  phase: RoomPhase;
  members: RoomMember[];
  /** Monotonic host sequence; clients reject snapshots with seq <= lastSeq. */
  seq: number;
  /** Shared game seed/state once the host starts the match. */
  seed?: number;
  gameState?: unknown;
};

export type RoomAction =
  | { type: "ready"; ready: boolean }
  | { type: "kick"; targetId: RoomMemberId }
  | { type: "start"; seed: number }
  | { type: "game-action"; payload: unknown };

export type RoomEvent =
  | { kind: "join"; member: RoomMember; seq: number }
  | { kind: "leave"; memberId: RoomMemberId; seq: number }
  | { kind: "ready"; memberId: RoomMemberId; ready: boolean; seq: number }
  | { kind: "kick"; memberId: RoomMemberId; seq: number }
  | { kind: "start"; seed: number; seq: number }
  | { kind: "sync-snapshot"; state: RoomState }
  | { kind: "action"; memberId: RoomMemberId; action: RoomAction; seq: number };

/* ------------------------------------------------------------------ *
 * Transport adapter (#307) — swappable behind RoomTransport.
 * ------------------------------------------------------------------ */

export interface RoomTransport {
  readonly name: string;
  connect(code: string, memberId: RoomMemberId): Promise<void>;
  disconnect(): void;
  send(event: RoomEvent): void;
  onEvent(handler: (event: RoomEvent) => void): () => void;
}

/**
 * DEV_ONLY local-dev fallback. Uses BroadcastChannel so two browser
 * profiles/tabs on the same origin can share a room without a server.
 * NOT for production: no auth, no persistence, same-origin only.
 */
export class BroadcastChannelTransport implements RoomTransport {
  readonly name = "broadcast-channel (DEV_ONLY)";
  private channel: BroadcastChannel | null = null;
  private handlers = new Set<(event: RoomEvent) => void>();

  async connect(code: string): Promise<void> {
    if (typeof BroadcastChannel === "undefined") {
      throw new Error("BroadcastChannel unavailable in this environment");
    }
    this.channel = new BroadcastChannel(`blockopoly-room-${code}`);
    this.channel.onmessage = (msg) => {
      const event = msg.data as RoomEvent;
      this.handlers.forEach((h) => h(event));
    };
  }

  disconnect(): void {
    this.channel?.close();
    this.channel = null;
  }

  send(event: RoomEvent): void {
    this.channel?.postMessage(event);
  }

  onEvent(handler: (event: RoomEvent) => void): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
}

/* ------------------------------------------------------------------ *
 * Security basics (#307)
 * ------------------------------------------------------------------ */

const ROOM_CODE_RE = /^[A-Z0-9]{4,8}$/;
const JOIN_WINDOW_MS = 10_000;
const MAX_JOINS_PER_WINDOW = 5;

export function sanitizeRoomCode(raw: string): string {
  return (raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

export function isValidRoomCode(code: string): boolean {
  return ROOM_CODE_RE.test(code);
}

/* ------------------------------------------------------------------ *
 * Context
 * ------------------------------------------------------------------ */

type RoomContextValue = {
  state: RoomState | null;
  selfId: RoomMemberId | null;
  isHost: boolean;
  transportName: string;
  error: string | null;
  createRoom: (name: string, avatar?: string) => string;
  joinRoom: (code: string, name: string, avatar?: string) => Promise<void>;
  leaveRoom: () => void;
  setReady: (ready: boolean) => void;
  kick: (targetId: RoomMemberId) => void;
  startGame: (seed: number) => void;
  sendAction: (action: RoomAction) => void;
};

const RoomContext = createContext<RoomContextValue | null>(null);

const STORAGE_KEY = "blockopoly.room.session";

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RoomState | null>(null);
  const [selfId, setSelfId] = useState<RoomMemberId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const transportRef = useRef<RoomTransport | null>(null);
  const stateRef = useRef<RoomState | null>(null);
  const selfIdRef = useRef<RoomMemberId | null>(null);
  const joinTimesRef = useRef<number[]>([]);

  stateRef.current = state;
  selfIdRef.current = selfId;

  const isHost = !!state && !!selfId && state.hostId === selfId;

  const applySnapshot = useCallback((incoming: RoomState) => {
    const current = stateRef.current;
    // Reject stale sequence numbers from peers.
    if (current && incoming.code === current.code && incoming.seq <= current.seq) {
      return;
    }
    setState(incoming);
  }, []);

  const handleEvent = useCallback(
    (event: RoomEvent) => {
      const current = stateRef.current;
      const me = selfIdRef.current;
      if (!current || !me) return;

      switch (event.kind) {
        case "sync-snapshot":
          applySnapshot(event.state);
          break;
        case "join": {
          if (event.seq <= current.seq) return;
          const exists = current.members.some((m) => m.id === event.member.id);
          const members = exists
            ? current.members.map((m) =>
                m.id === event.member.id ? { ...m, connected: true } : m,
              )
            : [...current.members, event.member];
          setState({ ...current, members, seq: event.seq });
          break;
        }
        case "leave": {
          if (event.seq <= current.seq) return;
          setState({
            ...current,
            members: current.members.map((m) =>
              m.id === event.memberId ? { ...m, connected: false } : m,
            ),
            seq: event.seq,
          });
          break;
        }
        case "ready": {
          if (event.seq <= current.seq) return;
          setState({
            ...current,
            members: current.members.map((m) =>
              m.id === event.memberId ? { ...m, ready: event.ready } : m,
            ),
            seq: event.seq,
          });
          break;
        }
        case "kick": {
          if (event.seq <= current.seq) return;
          if (event.memberId === me) {
            setError("You were removed from the room by the host.");
            setState(null);
            setSelfId(null);
            transportRef.current?.disconnect();
            return;
          }
          setState({
            ...current,
            members: current.members.filter((m) => m.id !== event.memberId),
            seq: event.seq,
          });
          break;
        }
        case "start": {
          if (event.seq <= current.seq) return;
          setState({ ...current, phase: "in-game", seed: event.seed, seq: event.seq });
          break;
        }
        case "action": {
          // Clients never trust peer actions directly; only the host
          // validates and rebroadcasts an authoritative snapshot.
          if (!isHost) return;
          break;
        }
        default:
          break;
      }
    },
    [applySnapshot, isHost],
  );

  const attachTransport = useCallback(
    async (code: string, memberId: RoomMemberId) => {
      transportRef.current?.disconnect();
      const transport = new BroadcastChannelTransport();
      await transport.connect(code);
      transport.onEvent(handleEvent);
      transportRef.current = transport;
    },
    [handleEvent],
  );

  const broadcast = useCallback((event: RoomEvent) => {
    transportRef.current?.send(event);
  }, []);

  const createRoom = useCallback(
    (name: string, avatar?: string) => {
      const code = makeCode();
      const id = makeId();
      const member: RoomMember = {
        id,
        name: name || "Host",
        avatar,
        isHost: true,
        ready: true,
        connected: true,
        joinedAt: Date.now(),
      };
      const next: RoomState = {
        code,
        hostId: id,
        phase: "lobby",
        members: [member],
        seq: 1,
      };
      setSelfId(id);
      setState(next);
      setError(null);
      void attachTransport(code, id);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, memberId: id }));
      }
      return code;
    },
    [attachTransport],
  );

  const joinRoom = useCallback(
    async (rawCode: string, name: string, avatar?: string) => {
      const code = sanitizeRoomCode(rawCode);
      if (!isValidRoomCode(code)) {
        setError("Invalid room code. Use 4-8 letters or numbers.");
        return;
      }
      // Client-side join rate limiting.
      const now = Date.now();
      joinTimesRef.current = joinTimesRef.current.filter((t) => now - t < JOIN_WINDOW_MS);
      if (joinTimesRef.current.length >= MAX_JOINS_PER_WINDOW) {
        setError("Too many join attempts. Please wait a moment.");
        return;
      }
      joinTimesRef.current.push(now);

      const id = makeId();
      const member: RoomMember = {
        id,
        name: name || "Player",
        avatar,
        isHost: false,
        ready: false,
        connected: true,
        joinedAt: Date.now(),
      };
      setSelfId(id);
      setError(null);
      await attachTransport(code, id);
      // Announce join; host will respond with an authoritative snapshot.
      broadcast({ kind: "join", member, seq: 0 });
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, memberId: id }));
      }
    },
    [attachTransport, broadcast],
  );

  const leaveRoom = useCallback(() => {
    const current = stateRef.current;
    const me = selfIdRef.current;
    if (current && me) {
      broadcast({ kind: "leave", memberId: me, seq: current.seq + 1 });
    }
    transportRef.current?.disconnect();
    transportRef.current = null;
    setState(null);
    setSelfId(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [broadcast]);

  const setReady = useCallback(
    (ready: boolean) => {
      const current = stateRef.current;
      const me = selfIdRef.current;
      if (!current || !me) return;
      const seq = current.seq + 1;
      setState({
        ...current,
        members: current.members.map((m) => (m.id === me ? { ...m, ready } : m)),
        seq,
      });
      broadcast({ kind: "ready", memberId: me, ready, seq });
    },
    [broadcast],
  );

  const kick = useCallback(
    (targetId: RoomMemberId) => {
      const current = stateRef.current;
      if (!current || current.hostId !== selfIdRef.current) return;
      const seq = current.seq + 1;
      setState({
        ...current,
        members: current.members.filter((m) => m.id !== targetId),
        seq,
      });
      broadcast({ kind: "kick", memberId: targetId, seq });
    },
    [broadcast],
  );

  const startGame = useCallback(
    (seed: number) => {
      const current = stateRef.current;
      if (!current || current.hostId !== selfIdRef.current) return;
      const seq = current.seq + 1;
      setState({ ...current, phase: "in-game", seed, seq });
      broadcast({ kind: "start", seed, seq });
    },
    [broadcast],
  );

  const sendAction = useCallback(
    (action: RoomAction) => {
      const current = stateRef.current;
      const me = selfIdRef.current;
      if (!current || !me) return;
      // Only the host mutates authoritative state; peers request via action.
      broadcast({ kind: "action", memberId: me, action, seq: current.seq + 1 });
    },
    [broadcast],
  );

  // Host: respond to joins with an authoritative snapshot.
  useEffect(() => {
    if (!isHost) return;
    const transport = transportRef.current;
    if (!transport) return;
    const off = transport.onEvent((event) => {
      if (event.kind !== "join") return;
      const current = stateRef.current;
      if (!current) return;
      const exists = current.members.some((m) => m.id === event.member.id);
      const members = exists
        ? current.members.map((m) =>
            m.id === event.member.id ? { ...m, connected: true } : m,
          )
        : [...current.members, event.member];
      const seq = current.seq + 1;
      const next: RoomState = { ...current, members, seq };
      setState(next);
      transport.send({ kind: "sync-snapshot", state: next });
    });
    return off;
  }, [isHost, state?.code]);

  // Reconnect on refresh: rejoin with stored code + member id.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as { code: string; memberId: string };
      if (!saved?.code || !saved?.memberId) return;
      const code = sanitizeRoomCode(saved.code);
      if (!isValidRoomCode(code)) return;
      setSelfId(saved.memberId);
      void attachTransport(code, saved.memberId).then(() => {
        transportRef.current?.send({
          kind: "join",
          member: {
            id: saved.memberId,
            name: "Reconnecting",
            isHost: false,
            ready: false,
            connected: true,
            joinedAt: Date.now(),
          },
          seq: 0,
        });
      });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => transportRef.current?.disconnect(), []);

  const value = useMemo<RoomContextValue>(
    () => ({
      state,
      selfId,
      isHost,
      transportName: transportRef.current?.name ?? "broadcast-channel (DEV_ONLY)",
      error,
      createRoom,
      joinRoom,
      leaveRoom,
      setReady,
      kick,
      startGame,
      sendAction,
    }),
    [state, selfId, isHost, error, createRoom, joinRoom, leaveRoom, setReady, kick, startGame, sendAction],
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoom(): RoomContextValue {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoom must be used within a RoomProvider");
  return ctx;
}
