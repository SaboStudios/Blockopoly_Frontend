export interface GameContextProps {
  isAppearanceModalOpen: boolean;
  setAppearanceModalOpen: (isOpen: boolean) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  // Add other game states and functions here (e.g., currentTurn, properties, etc.)
}

export interface BoardSquare {
  id: number;
  type: "property" | "corner" | "special";
  name: string;
  position: "bottom" | "left" | "top" | "right";
  gridPosition: { row: number; col: number };
  price?: number;
  color?: string;
  icon?: string; // For special squares like '?', jail, etc.
}

/**
 * Domain model for the turn-based game engine.
 * These types are framework-agnostic and shared between the pure engine
 * (lib/game/engine) and the React layer (context/game-context.tsx).
 */

export type SquareKind =
  | "go"
  | "property"
  | "railroad"
  | "utility"
  | "tax"
  | "chance"
  | "community"
  | "jail"
  | "free-parking"
  | "go-to-jail";

export type PropertyGroup =
  | "brown"
  | "light-blue"
  | "pink"
  | "orange"
  | "red"
  | "yellow"
  | "green"
  | "dark-blue"
  | "railroad"
  | "utility";

export interface OwnedProperty {
  squareId: number;
  ownerId: string;
  houses: number;
  hasHotel: boolean;
  mortgaged: boolean;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  cash: number;
  position: number;
  inJail: boolean;
  jailTurns: number;
  bankrupt: boolean;
  getOutOfJailCards: number;
}

export type TurnPhase =
  | "awaiting-roll"
  | "awaiting-action"
  | "awaiting-end-turn"
  | "game-over";

export interface DiceRoll {
  die1: number;
  die2: number;
  total: number;
  isDouble: boolean;
}

export interface GameState {
  players: Player[];
  properties: OwnedProperty[];
  currentPlayerIndex: number;
  phase: TurnPhase;
  dice: DiceRoll | null;
  doublesCount: number;
  chanceDeck: number[];
  communityDeck: number[];
  chanceDiscard: number[];
  communityDiscard: number[];
  log: GameEvent[];
  winnerId: string | null;
}

export type GameAction =
  | { type: "ROLL_DICE" }
  | { type: "BUY_PROPERTY"; squareId: number }
  | { type: "PAY_RENT"; squareId: number }
  | { type: "MORTGAGE"; squareId: number }
  | { type: "UNMORTGAGE"; squareId: number }
  | { type: "BUILD_HOUSE"; squareId: number }
  | { type: "PAY_JAIL_FINE" }
  | { type: "USE_JAIL_CARD" }
  | { type: "DRAW_CHANCE" }
  | { type: "DRAW_COMMUNITY" }
  | { type: "END_TURN" }
  | { type: "REHYDRATE"; state: GameState };

export type GameEventType =
  | "roll"
  | "move"
  | "buy"
  | "rent"
  | "tax"
  | "jail"
  | "card"
  | "bankrupt"
  | "turn-end"
  | "game-over";

export interface GameEvent {
  id: string;
  type: GameEventType;
  playerId: string;
  message: string;
  amount?: number;
  squareId?: number;
  timestamp: number;
}
