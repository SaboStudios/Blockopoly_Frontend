//src/app/contexts/GameRoomContext.tsx
'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface GameRoomSettings {
  maxPlayers: number;
  privateRoom: boolean;
  auction: boolean;
  rentInPrison: boolean;
  mortgage: boolean;
  evenBuild: boolean;
  startingCash: number;
  randomizePlayOrder: boolean;
}

interface GameRoomState {
  settings: GameRoomSettings;
  isLoading: boolean;
  gameStarted: boolean;
}

type GameRoomAction =
  | { type: 'UPDATE_MAX_PLAYERS'; payload: number }
  | { type: 'TOGGLE_PRIVATE_ROOM' }
  | { type: 'TOGGLE_AUCTION' }
  | { type: 'TOGGLE_RENT_IN_PRISON' }
  | { type: 'TOGGLE_MORTGAGE' }
  | { type: 'TOGGLE_EVEN_BUILD' }
  | { type: 'UPDATE_STARTING_CASH'; payload: number }
  | { type: 'TOGGLE_RANDOMIZE_PLAY_ORDER' }
  | { type: 'START_GAME' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_SETTINGS' };

// Initial state
const initialState: GameRoomState = {
  settings: {
    maxPlayers: 4,
    privateRoom: true,
    auction: true,
    rentInPrison: false,
    mortgage: true,
    evenBuild: false,
    startingCash: 1000,
    randomizePlayOrder: true,
  },
  isLoading: false,
  gameStarted: false,
};

// Reducer
function gameRoomReducer(state: GameRoomState, action: GameRoomAction): GameRoomState {
  switch (action.type) {
    case 'UPDATE_MAX_PLAYERS':
      return {
        ...state,
        settings: {
          ...state.settings,
          maxPlayers: action.payload,
        },
      };
    case 'TOGGLE_PRIVATE_ROOM':
      return {
        ...state,
        settings: {
          ...state.settings,
          privateRoom: !state.settings.privateRoom,
        },
      };
    case 'TOGGLE_AUCTION':
      return {
        ...state,
        settings: {
          ...state.settings,
          auction: !state.settings.auction,
        },
      };
    case 'TOGGLE_RENT_IN_PRISON':
      return {
        ...state,
        settings: {
          ...state.settings,
          rentInPrison: !state.settings.rentInPrison,
        },
      };
    case 'TOGGLE_MORTGAGE':
      return {
        ...state,
        settings: {
          ...state.settings,
          mortgage: !state.settings.mortgage,
        },
      };
    case 'TOGGLE_EVEN_BUILD':
      return {
        ...state,
        settings: {
          ...state.settings,
          evenBuild: !state.settings.evenBuild,
        },
      };
    case 'UPDATE_STARTING_CASH':
      return {
        ...state,
        settings: {
          ...state.settings,
          startingCash: action.payload,
        },
      };
    case 'TOGGLE_RANDOMIZE_PLAY_ORDER':
      return {
        ...state,
        settings: {
          ...state.settings,
          randomizePlayOrder: !state.settings.randomizePlayOrder,
        },
      };
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        isLoading: true,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'RESET_SETTINGS':
      return initialState;
    default:
      return state;
  }
}

// Context
interface GameRoomContextType {
  state: GameRoomState;
  updateMaxPlayers: (players: number) => void;
  togglePrivateRoom: () => void;
  toggleAuction: () => void;
  toggleRentInPrison: () => void;
  toggleMortgage: () => void;
  toggleEvenBuild: () => void;
  updateStartingCash: (cash: number) => void;
  toggleRandomizePlayOrder: () => void;
  startGame: () => void;
  setLoading: (loading: boolean) => void;
  resetSettings: () => void;
}

const GameRoomContext = createContext<GameRoomContextType | undefined>(undefined);

// Provider
interface GameRoomProviderProps {
  children: ReactNode;
}

export function GameRoomProvider({ children }: GameRoomProviderProps) {
  const [state, dispatch] = useReducer(gameRoomReducer, initialState);

  const contextValue: GameRoomContextType = {
    state,
    updateMaxPlayers: (players: number) => dispatch({ type: 'UPDATE_MAX_PLAYERS', payload: players }),
    togglePrivateRoom: () => dispatch({ type: 'TOGGLE_PRIVATE_ROOM' }),
    toggleAuction: () => dispatch({ type: 'TOGGLE_AUCTION' }),
    toggleRentInPrison: () => dispatch({ type: 'TOGGLE_RENT_IN_PRISON' }),
    toggleMortgage: () => dispatch({ type: 'TOGGLE_MORTGAGE' }),
    toggleEvenBuild: () => dispatch({ type: 'TOGGLE_EVEN_BUILD' }),
    updateStartingCash: (cash: number) => dispatch({ type: 'UPDATE_STARTING_CASH', payload: cash }),
    toggleRandomizePlayOrder: () => dispatch({ type: 'TOGGLE_RANDOMIZE_PLAY_ORDER' }),
    startGame: () => dispatch({ type: 'START_GAME' }),
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    resetSettings: () => dispatch({ type: 'RESET_SETTINGS' }),
  };

  return (
    <GameRoomContext.Provider value={contextValue}>
      {children}
    </GameRoomContext.Provider>
  );
}

// Hook
export function useGameRoom() {
  const context = useContext(GameRoomContext);
  if (context === undefined) {
    throw new Error('useGameRoom must be used within a GameRoomProvider');
  }
  return context;
}