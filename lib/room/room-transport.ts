/**
 * Room protocol + transport layer for Blockopoly realtime multiplayer.
 *
 * Issue #307: multiple browsers share one session via a room code.
 *
 * Design notes:
 * - `RoomTransport` is the pluggable boundary. UI code only talks to this
 *   interface, so swapping BroadcastChannel (DEV_ONLY) for a WebSocket or
 *   Firebase/Supabase realtime backend does not require UI changes.
 * - Host authority: the host is the single writer of authoritative state.
 *   Clients send `action` events; the host validates them and broadcasts a
 *   `sync-snapshot` with a monotonically increasing `seq`. Clients reject
 *   snapshots whose `seq` is not newer than the last applied one.
 * - Reconnect: a member persists `{ roomCode, memberId }` and, on refresh,
 *   rejoins and requests a snapshot from the host.
 */

/* -------------------------------------------------------------------------- */
/* Protocol types                                                             */
/* -------------------------------------------------------------------------- */

export type RoomMemberId = string;

export type RoomMember = {
  id: RoomMemberId;
  name: string;
  /** Deterministic avatar seed so every client renders the same avatar. */
  avatarSeed: string;
  isHost: boolean;
  ready: boolean;
  /** Epoch ms of last heartbeat; used to render disconnect banners. */
  lastSeen: number;
  connected: boolean;
};

export type RoomPhase = "lobby" | "starting" | "in-game" | "ended";

export type RoomState = {
  roomCode: string;
  hostId: RoomMemberId;
  phase: RoomPhase;
  members: RoomMember[];
  /** Shared game seed so every client derives identical initial state. */
  seed: number | null;
  /** Authoritative snapshot payload (opaque to the transport layer). */
  snapshot: unknown | null;
  /** Monotonic sequence number; clients reject stale snapshots. */
  seq: number;
  updatedAt: number;
};

export type RoomAction =
  | { type: "roll-dice" }
  | { type: "buy-property"; tileId: number }
  | { type: "end-turn" }
  | { type: "pay-rent"; tileId: number; amount: number }
  | { type: "chat"; text: string };

export type RoomEvent =
  | { type: "join"; member: RoomMember }
  | { type: "leave"; memberId: RoomMemberId }
  | { type: "ready"; memberId: RoomMemberId; ready: boolean }
  | { type: "kick"; memberId: RoomMemberId; by: RoomMemberId }
  | { type: "start"; seed: number; by: RoomMemberId }
  | { type: "sync-snapshot"; state: RoomState }
  | { type: "action"; memberId: RoomMemberId; action: RoomAction; seq: number }
  | { type: "request-snapshot"; memberId: RoomMemberId };

export type RoomEventEnvelope = {
  /** Sender member id; used to ignore our own echoed events. */
  from: RoomMemberId;
  /** Monotonic per-sender sequence; used to drop stale/duplicate events. */
  seq: number;
  event: RoomEvent;
};

/* -------------------------------------------------------------------------- */
/* Transport interface                                                        */
/* -------------------------------------------------------------------------- */

export type RoomTransportStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export type RoomTransportHandlers = {
  onEvent: (envelope: RoomEventEnvelope) => void;
  onStatus?: (status: RoomTransportStatus, detail?: string) => void;
};

/**
 * Pluggable transport. Implementations must be safe to call `send` before
 * `connect` resolves (they may buffer) and must not throw on `disconnect`.
 */
export interface RoomTransport {
  readonly kind: string;
  connect(roomCode: string, memberId: RoomMemberId): Promise<void>;
  send(event: RoomEvent): void;
  disconnect(): void;
  isConnected(): boolean;
}

/* -------------------------------------------------------------------------- */
/* Security helpers                                                           */
/* -------------------------------------------------------------------------- */

/** Room codes are uppercase alphanumeric, 4-8 chars. */
export const ROOM_CODE_PATTERN = /^[A-Z0-9]{4,8}$/;

/** Normalize + validate a user-entered room code. Returns null if invalid. */
export function sanitizeRoomCode(raw: string): string | null {
  const code = (raw ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  return ROOM_CODE_PATTERN.test(code) ? code : null;
}

/** Generate a fresh room code (host side). */
export function generateRoomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

/**
 * Client-side join rate limiter. Prevents a single client from spamming
 * join attempts (e.g. brute-forcing room codes).
 */
export class JoinRateLimiter {
  private attempts: number[] = [];

  constructor(
    private readonly maxAttempts = 5,
    private readonly windowMs = 10_000,
  ) {}

  /** Returns true if the attempt is allowed, false if rate-limited. */
  tryAcquire(now = Date.now()): boolean {
    this.attempts = this.attempts.filter((t) => now - t < this.windowMs);
    if (this.attempts.length >= this.maxAttempts) return false;
    this.attempts.push(now);
    return true;
  }

  reset(): void {
    this.attempts = [];
  }
}

/* -------------------------------------------------------------------------- */
/* Host authority helpers                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Returns true when `incoming` is a newer authoritative snapshot than
 * `current`. Stale or duplicate sequence numbers are rejected.
 */
export function isNewerSnapshot(
  current: RoomState | null,
  incoming: RoomState,
): boolean {
  if (!current) return true;
  if (incoming.roomCode !== current.roomCode) return true;
  return incoming.seq > current.seq;
}

/**
 * Host-side validation of a client action. The host is the only authority
 * that may mutate cash/board state; clients never apply peer cash without
 * a host ack (i.e. a subsequent `sync-snapshot`).
 */
export function validateAction(
  state: RoomState,
  memberId: RoomMemberId,
  action: RoomAction,
): { ok: true } | { ok: false; reason: string } {
  const member = state.members.find((m) => m.id === memberId);
  if (!member) return { ok: false, reason: "unknown-member" };
  if (!member.connected) return { ok: false, reason: "member-disconnected" };
  if (state.phase !== "in-game") return { ok: false, reason: "not-in-game" };
  if (action.type === "chat") {
    if (!action.text || action.text.length > 280) {
      return { ok: false, reason: "invalid-chat" };
    }
  }
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/* BroadcastChannel transport (DEV_ONLY)                                      */
/* -------------------------------------------------------------------------- */

/**
 * DEV_ONLY: BroadcastChannel only works across tabs of the same origin on the
 * same machine. It is a local-dev fallback for exercising the room protocol
 * without a backend. Production must use a WebSocket / Firebase / Supabase
 * transport implementing the same `RoomTransport` interface.
 */
export class BroadcastChannelRoomTransport implements RoomTransport {
  readonly kind = "broadcast-channel";
  static readonly DEV_ONLY = true;

  private channel: BroadcastChannel | null = null;
  private roomCode = "";
  private memberId = "";
  private seq = 0;
  private handlers: RoomTransportHandlers | null = null;
  private connected = false;

  constructor(handlers: RoomTransportHandlers) {
    this.handlers = handlers;
  }

  async connect(roomCode: string, memberId: RoomMemberId): Promise<void> {
    const code = sanitizeRoomCode(roomCode);
    if (!code) throw new Error("invalid-room-code");
    if (typeof BroadcastChannel === "undefined") {
      this.handlers?.onStatus?.("error", "broadcast-channel-unavailable");
      throw new Error("broadcast-channel-unavailable");
    }

    this.disconnect();
    this.roomCode = code;
    this.memberId = memberId;
    this.seq = 0;
    this.handlers?.onStatus?.("connecting");

    const channel = new BroadcastChannel(`blockopoly-room-${code}`);
    channel.onmessage = (msg: MessageEvent<RoomEventEnvelope>) => {
      const envelope = msg.data;
      if (!envelope || envelope.from === this.memberId) return;
      this.handlers?.onEvent?.(envelope);
    };
    this.channel = channel;
    this.connected = true;
    this.handlers?.onStatus?.("connected");
  }

  send(event: RoomEvent): void {
    if (!this.channel) return;
    this.seq += 1;
    const envelope: RoomEventEnvelope = {
      from: this.memberId,
      seq: this.seq,
      event,
    };
    this.channel.postMessage(envelope);
  }

  disconnect(): void {
    if (this.channel) {
      this.channel.onmessage = null;
      this.channel.close();
      this.channel = null;
    }
    if (this.connected) {
      this.connected = false;
      this.handlers?.onStatus?.("disconnected");
    }
  }

  isConnected(): boolean {
    return this.connected;
  }
}

/* -------------------------------------------------------------------------- */
/* Reconnect persistence                                                      */
/* -------------------------------------------------------------------------- */

export type RoomSession = { roomCode: string; memberId: RoomMemberId };

const SESSION_KEY = "blockopoly.room.session";

/** Persist the current room session so a refresh can rejoin. */
export function saveRoomSession(session: RoomSession): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  } catch {
    /* storage unavailable; reconnect will fall back to manual rejoin */
  }
}

export function loadRoomSession(): RoomSession | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RoomSession;
    const code = sanitizeRoomCode(parsed.roomCode);
    if (!code || !parsed.memberId) return null;
    return { roomCode: code, memberId: parsed.memberId };
  } catch {
    return null;
  }
}

export function clearRoomSession(): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    /* ignore */
  }
}

/**
 * Reconnect flow: rejoin the room with the persisted member id and ask the
 * host for a fresh snapshot so we can resume mid-turn. Returns the session
 * that was used, or null when there is nothing to resume.
 */
export async function reconnectRoom(
  transport: RoomTransport,
): Promise<RoomSession | null> {
  const session = loadRoomSession();
  if (!session) return null;
  await transport.connect(session.roomCode, session.memberId);
  transport.send({ type: "request-snapshot", memberId: session.memberId });
  return session;
}
