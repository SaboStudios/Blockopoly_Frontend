export interface GameContextProps {
  isAppearanceModalOpen: boolean;
  setAppearanceModalOpen: (isOpen: boolean) => void;
  players: any[]; // Replace 'any' with your Player type
  setPlayers: (players: any[]) => void;
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
