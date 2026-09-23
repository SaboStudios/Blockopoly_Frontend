/**
 * Starknet match escrow adapter layer.
 *
 * Provides a strongly-typed interface for the on-chain match lifecycle used by
 * Blockopoly rooms. Two implementations are shipped:
 *
 *  - `MockMatchContract`     — in-memory, deterministic, for local demos
 *                              (`NEXT_PUBLIC_USE_MOCK_CHAIN=true`).
 *  - `StarknetMatchContract` — stub wired to env-configured contract
 *                              addresses; surfaces a clear
 *                              "contract not configured" error when the
 *                              addresses are missing.
 *
 * No secrets are ever read here: only public `NEXT_PUBLIC_*` addresses.
 */

/** A Starknet address as a 0x-prefixed hex string. */
export type StarknetAddress = `0x${string}`;

/** Lifecycle status of an on-chain match. */
export type MatchStatus =
  | "none"
  | "created"
  | "joined"
  | "funded"
  | "settled"
  | "withdrawn";

/** A single on-chain match record. */
export interface MatchRecord {
  /** Match id (felt as hex string). */
  id: StarknetAddress;
  /** Address that created the match. */
  creator: StarknetAddress;
  /** Address that joined, if any. */
  opponent: StarknetAddress | null;
  /** Stake per player, in the smallest unit of `currency`. */
  stake: bigint;
  /** Currency symbol, e.g. "STRK" or "ETH". */
  currency: string;
  /** Current lifecycle status. */
  status: MatchStatus;
  /** Winner address once settled, if any. */
  winner: StarknetAddress | null;
}

/** Parameters for creating a match. */
export interface CreateMatchParams {
  creator: StarknetAddress;
  stake: bigint;
  currency: string;
}

/** Parameters for joining a match. */
export interface JoinMatchParams {
  matchId: StarknetAddress;
  opponent: StarknetAddress;
}

/** Parameters for depositing a stake. */
export interface DepositStakeParams {
  matchId: StarknetAddress;
  player: StarknetAddress;
  amount: bigint;
}

/** Parameters for reporting a winner. */
export interface ReportWinnerParams {
  matchId: StarknetAddress;
  winner: StarknetAddress;
}

/** Parameters for withdrawing a settled pot. */
export interface WithdrawParams {
  matchId: StarknetAddress;
  player: StarknetAddress;
}

/** Result of a submitted transaction. */
export interface TxResult {
  /** Transaction hash (felt as hex string). */
  txHash: StarknetAddress;
  /** Match the transaction applies to. */
  matchId: StarknetAddress;
  /** Status at submission time. */
  status: MatchStatus;
}

/**
 * Typed contract adapter for the match escrow lifecycle.
 *
 * All methods are async and reject with a `MatchContractError` on failure
 * (including user rejection and unconfigured contracts).
 */
export interface MatchContract {
  createMatch(params: CreateMatchParams): Promise<TxResult>;
  joinMatch(params: JoinMatchParams): Promise<TxResult>;
  depositStake(params: DepositStakeParams): Promise<TxResult>;
  reportWinner(params: ReportWinnerParams): Promise<TxResult>;
  withdraw(params: WithdrawParams): Promise<TxResult>;
  /** Read the current on-chain record for a match. */
  getMatch(matchId: StarknetAddress): Promise<MatchRecord | null>;
}

/** Error codes surfaced by the adapter layer. */
export type MatchContractErrorCode =
  | "NOT_CONFIGURED"
  | "USER_REJECTED"
  | "INVALID_ADDRESS"
  | "INVALID_STATE"
  | "UNKNOWN";

/** Typed error thrown by match contract adapters. */
export class MatchContractError extends Error {
  readonly code: MatchContractErrorCode;

  constructor(code: MatchContractErrorCode, message: string) {
    super(message);
    this.name = "MatchContractError";
    this.code = code;
  }
}

const ADDRESS_RE = /^0x[0-9a-fA-F]{1,64}$/;

/** Validate a Starknet address, throwing a typed error when malformed. */
export function assertValidAddress(
  value: string,
  label = "address",
): asserts value is StarknetAddress {
  if (!ADDRESS_RE.test(value)) {
    throw new MatchContractError(
      "INVALID_ADDRESS",
      `Invalid Starknet ${label}: ${value}`,
    );
  }
}

/** Normalize a hex string into a `StarknetAddress`. */
export function toAddress(value: string): StarknetAddress {
  assertValidAddress(value);
  return value as StarknetAddress;
}

/** Deterministic pseudo-hash for mock transactions. */
function mockHash(seed: string): StarknetAddress {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `0x${h.toString(16).padStart(8, "0")}` as StarknetAddress;
}

/**
 * In-memory match contract for local demos.
 *
 * Mirrors the real lifecycle (create → join → deposit → report → withdraw)
 * without touching a node. Deterministic tx hashes make receipts testable.
 */
export class MockMatchContract implements MatchContract {
  private readonly matches = new Map<StarknetAddress, MatchRecord>();

  async createMatch(params: CreateMatchParams): Promise<TxResult> {
    assertValidAddress(params.creator, "creator");
    const id = mockHash(`${params.creator}:${params.stake}:${params.currency}`);
    const record: MatchRecord = {
      id,
      creator: params.creator,
      opponent: null,
      stake: params.stake,
      currency: params.currency,
      status: "created",
      winner: null,
    };
    this.matches.set(id, record);
    return { txHash: mockHash(`create:${id}`), matchId: id, status: "created" };
  }

  async joinMatch(params: JoinMatchParams): Promise<TxResult> {
    assertValidAddress(params.opponent, "opponent");
    const record = this.requireMatch(params.matchId);
    if (record.status !== "created") {
      throw new MatchContractError(
        "INVALID_STATE",
        `Cannot join match in status ${record.status}`,
      );
    }
    record.opponent = params.opponent;
    record.status = "joined";
    return {
      txHash: mockHash(`join:${params.matchId}:${params.opponent}`),
      matchId: params.matchId,
      status: "joined",
    };
  }

  async depositStake(params: DepositStakeParams): Promise<TxResult> {
    assertValidAddress(params.player, "player");
    const record = this.requireMatch(params.matchId);
    if (record.status !== "joined" && record.status !== "created") {
      throw new MatchContractError(
        "INVALID_STATE",
        `Cannot deposit for match in status ${record.status}`,
      );
    }
    record.status = "funded";
    return {
      txHash: mockHash(`deposit:${params.matchId}:${params.player}:${params.amount}`),
      matchId: params.matchId,
      status: "funded",
    };
  }

  async reportWinner(params: ReportWinnerParams): Promise<TxResult> {
    assertValidAddress(params.winner, "winner");
    const record = this.requireMatch(params.matchId);
    if (record.status !== "funded") {
      throw new MatchContractError(
        "INVALID_STATE",
        `Cannot report winner for match in status ${record.status}`,
      );
    }
    record.winner = params.winner;
    record.status = "settled";
    return {
      txHash: mockHash(`report:${params.matchId}:${params.winner}`),
      matchId: params.matchId,
      status: "settled",
    };
  }

  async withdraw(params: WithdrawParams): Promise<TxResult> {
    assertValidAddress(params.player, "player");
    const record = this.requireMatch(params.matchId);
    if (record.status !== "settled") {
      throw new MatchContractError(
        "INVALID_STATE",
        `Cannot withdraw for match in status ${record.status}`,
      );
    }
    record.status = "withdrawn";
    return {
      txHash: mockHash(`withdraw:${params.matchId}:${params.player}`),
      matchId: params.matchId,
      status: "withdrawn",
    };
  }

  async getMatch(matchId: StarknetAddress): Promise<MatchRecord | null> {
    return this.matches.get(matchId) ?? null;
  }

  private requireMatch(matchId: StarknetAddress): MatchRecord {
    const record = this.matches.get(matchId);
    if (!record) {
      throw new MatchContractError(
        "INVALID_STATE",
        `Unknown match ${matchId}`,
      );
    }
    return record;
  }
}

/** Env-configured contract addresses (public, never secrets). */
export interface StarknetMatchConfig {
  escrowAddress: StarknetAddress | null;
  currency: string;
}

/** Read the escrow config from public env vars. */
export function readMatchConfig(): StarknetMatchConfig {
  const raw = process.env.NEXT_PUBLIC_MATCH_ESCROW_ADDRESS ?? "";
  const escrowAddress = ADDRESS_RE.test(raw) ? (raw as StarknetAddress) : null;
  return {
    escrowAddress,
    currency: process.env.NEXT_PUBLIC_MATCH_CURRENCY ?? "STRK",
  };
}

/**
 * Starknet match contract stub.
 *
 * Wired to env-configured addresses. Until a real provider is injected it
 * rejects with a typed `NOT_CONFIGURED` error so the UI can render a clear
 * empty state instead of a blank screen.
 */
export class StarknetMatchContract implements MatchContract {
  private readonly config: StarknetMatchConfig;

  constructor(config: StarknetMatchConfig = readMatchConfig()) {
    this.config = config;
  }

  /** Whether the escrow contract address is configured. */
  get isConfigured(): boolean {
    return this.config.escrowAddress !== null;
  }

  private notConfigured(): never {
    throw new MatchContractError(
      "NOT_CONFIGURED",
      "Match escrow contract is not configured. Set NEXT_PUBLIC_MATCH_ESCROW_ADDRESS.",
    );
  }

  async createMatch(_params: CreateMatchParams): Promise<TxResult> {
    if (!this.isConfigured) this.notConfigured();
    return this.notConfigured();
  }

  async joinMatch(_params: JoinMatchParams): Promise<TxResult> {
    if (!this.isConfigured) this.notConfigured();
    return this.notConfigured();
  }

  async depositStake(_params: DepositStakeParams): Promise<TxResult> {
    if (!this.isConfigured) this.notConfigured();
    return this.notConfigured();
  }

  async reportWinner(_params: ReportWinnerParams): Promise<TxResult> {
    if (!this.isConfigured) this.notConfigured();
    return this.notConfigured();
  }

  async withdraw(_params: WithdrawParams): Promise<TxResult> {
    if (!this.isConfigured) this.notConfigured();
    return this.notConfigured();
  }

  async getMatch(_matchId: StarknetAddress): Promise<MatchRecord | null> {
    if (!this.isConfigured) this.notConfigured();
    return null;
  }
}

/** Whether the mock chain is enabled via public env. */
export function isMockChainEnabled(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_CHAIN === "true";
}

/**
 * Resolve the active match contract adapter.
 *
 * Returns the mock adapter when `NEXT_PUBLIC_USE_MOCK_CHAIN=true`, otherwise
 * the env-wired Starknet stub (which surfaces `NOT_CONFIGURED` until set up).
 */
export function getMatchContract(): MatchContract {
  return isMockChainEnabled()
    ? new MockMatchContract()
    : new StarknetMatchContract();
}
