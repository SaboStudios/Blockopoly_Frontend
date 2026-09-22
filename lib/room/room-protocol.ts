/**
 * Room protocol types + pluggable transport for real-time multiplayer sync.
 *
 * Issue #307: multiple browsers share one Blockopoly session via a room code.
 * The host is authoritative: it validates actions and broadcasts snapshots.
 * Clients apply host snapshots and reject stale sequence numbers.
 *
 * The transport is swappable behind `RoomTransport`. A `BroadcastChannel`
 * implementation is provided as a clearly marked DEV_ONLY local-dev fallback
 * (same-origin tabs only). Swap in a WebSocket/Firebase/Supabase impl without
 * touching the UI.
 */

// ---------------------------------------------------------------------------
// Protocol types
// ---------------------------------------------------------------------------

export type RoomMemberId = string;

export type RoomRole = 'host' | 'player';

export interface RoomMember {
  id: RoomMemberId;
  name: string;
  /** Deterministic avatar key (e.g. token id) so all clients render the same. */
  avatar: string;
  role: RoomRole;
  ready: boolean;
  /** Last sequence number this member has acknowledged. */
  lastSeq: number;
  /** Epoch ms of last heartbeat; used to render disconnect banners. */
  lastSeen: number;
  connected: boolean;
}

export interface RoomState {
  /** Sanitized room code shared by all members. */
  code: string;
  hostId: RoomMemberId;
  members: RoomMember[];
  /** Monotonic sequence number; host increments on every authoritative change. */
  seq: number;
  /** Game seed chosen by the host at start; identical across clients. */
  seed: number | null;
  /** Lobby until the host starts; then gameplay. */
  phase: 'lobby' | 'starting' | 'playing';
}

/** Actions a client may request; only the host applies them. */
export type RoomAction =
  | { type: 'ready'; ready: boolean }
  | { type: 'kick'; targetId: RoomMemberId }
  | { type: 'start'; seed: number }
  | { type: 'game-action'; payload: unknown };

export type RoomEvent =
  | { kind: 'join'; member: RoomMember; seq: number }
  | { kind: 'leave'; memberId: RoomMemberId; seq: number }
  | { kind: 'ready'; memberId: RoomMemberId; ready: boolean; seq: number }
  | { kind: 'kick'; memberId: RoomMemberId; seq: number }
  | { kind: 'start'; seed: number; seq: number }
  | { kind: 'sync-snapshot'; state: RoomState }
  | { kind: 'action'; from: RoomMemberId; action: RoomAction; seq: number };

// ---------------------------------------------------------------------------
// Transport adapter
// ---------------------------------------------------------------------------

export interface RoomTransport {
  /** Join a room; resolves with the initial snapshot (or null if none yet). */
  join(code: string, member: RoomMember): Promise<RoomState | null>;
  /** Leave the room and release resources. */
  leave(): void;
  /** Broadcast an event to all peers in the room. */
  send(event: RoomEvent): void;
  /** Subscribe to inbound events. Returns an unsubscribe function. */
  onEvent(handler: (event: RoomEvent) => void): () => void;
  /** Whether this transport is a local-dev-only fallback. */
  readonly devOnly: boolean;
}

// ---------------------------------------------------------------------------
// Security helpers
// ---------------------------------------------------------------------------

/** Room codes are uppercase alphanumeric, 4-8 chars. */
export const ROOM_CODE_PATTERN = /^[A-Z0-9]{4,8}$/;

/** Sanitize user input into a valid room code, or null if invalid. */
export function sanitizeRoomCode(raw: string): string | null {
  const cleaned = (raw ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return ROOM_CODE_PATTERN.test(cleaned) ? cleaned : null;
}

/**
 * Client-side join rate limiter. Prevents hammering the transport with
 * repeated join attempts (e.g. reconnect loops).
 */
export function createJoinRateLimiter(maxAttempts = 5, windowMs = 10_000) {
  const attempts: number[] = [];
  return function allow(now = Date.now()): boolean {
    while (attempts.length && now - attempts[0] > windowMs) attempts.shift();
    if (attempts.length >= maxAttempts) return false;
    attempts.push(now);
    return true;
  };
}

/**
 * Reject stale sequence numbers. Returns true when `incoming` is newer than
 * `current` and should be applied.
 */
export function isNewerSeq(incoming: number, current: number): boolean {
  return Number.isFinite(incoming) && incoming > current;
}

// ---------------------------------------------------------------------------
// DEV_ONLY BroadcastChannel transport (same-origin tabs)
// ---------------------------------------------------------------------------

/**
 * DEV_ONLY local-dev fallback. Works only between tabs of the same origin and
 * is NOT a production transport. Replace with a WebSocket/Firebase/Supabase
 * `RoomTransport` implementation for real deployments.
 */
export class BroadcastChannelTransport implements RoomTransport {
  readonly devOnly = true;
  private channel: BroadcastChannel | null = null;
  private handlers = new Set<(event: RoomEvent) => void>();
  private selfId: RoomMemberId | null = null;

  async join(code: string, member: RoomMember): Promise<RoomState | null> {
    this.leave();
    this.selfId = member.id;
    this.channel = new BroadcastChannel(`blockopoly-room-${code}`);
    this.channel.onmessage = (msg: MessageEvent<RoomEvent>) => {
      for (const handler of this.handlers) handler(msg.data);
    };
    // Ask peers for a snapshot so a reconnecting client can resume mid-turn.
    this.send({ kind: 'action', from: member.id, action: { type: 'ready', ready: member.ready }, seq: 0 });
    return null;
  }

  leave(): void {
    if (this.channel) {
      this.channel.onmessage = null;
      this.channel.close();
      this.channel = null;
    }
    this.selfId = null;
  }

  send(event: RoomEvent): void {
    this.channel?.postMessage(event);
  }

  onEvent(handler: (event: RoomEvent) => void): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
}
