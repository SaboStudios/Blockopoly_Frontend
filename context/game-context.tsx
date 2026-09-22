'use client';

import { GameContextProps } from '@/types/game';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// --- Chat system v2 (issue #311) -----------------------------------------
// Durable, multiplayer-ready chat module. Persistence is local (localStorage)
// with a capped history; transport hooks are exposed so a real room transport
// can be wired in when multiplayer exists. Moderation is client-enforced and
// documented as needing server-side enforcement for real security.

export interface ChatReaction {
    emoji: string;
    senders: string[];
}

export interface ChatMessage {
    id: string;
    roomId: string;
    sender: string;
    body: string;
    createdAt: number;
    editedAt?: number;
    reactions: ChatReaction[];
    system?: boolean;
    systemKind?: 'joined' | 'left' | 'rolled-doubles';
    pending?: boolean;
    failed?: boolean;
}

const CHAT_HISTORY_CAP = 200;
const CHAT_STORAGE_PREFIX = 'handsoff:chat:';
const DEFAULT_ROOM_ID = 'game-room';

const PROFANITY_LIST = ['damn', 'hell', 'shit', 'fuck', 'bitch', 'asshole'];

function filterProfanity(body: string): string {
    return PROFANITY_LIST.reduce(
        (acc, word) => acc.replace(new RegExp(`\\b${word}\\b`, 'gi'), '*'.repeat(word.length)),
        body
    );
}

function loadPersistedMessages(roomId: string): ChatMessage[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(CHAT_STORAGE_PREFIX + roomId);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.slice(-CHAT_HISTORY_CAP) : [];
    } catch {
        return [];
    }
}

function persistMessages(roomId: string, messages: ChatMessage[]) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(
            CHAT_STORAGE_PREFIX + roomId,
            JSON.stringify(messages.slice(-CHAT_HISTORY_CAP))
        );
    } catch {
        // Storage may be unavailable (private mode / quota); chat still works in-memory.
    }
}

export function GameProvider({ children }: { children: ReactNode }) {
    const [isAppearanceModalOpen, setAppearanceModalOpen] = useState(true); // Open by default
    const [players, setPlayers] = useState<any[]>([]);
    const [selectedColor, setSelectedColor] = useState('');

    // --- Chat state -------------------------------------------------------
    const [roomId] = useState(DEFAULT_ROOM_ID);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [mutedPlayers, setMutedPlayers] = useState<string[]>([]);
    const [profanityFilterEnabled, setProfanityFilterEnabled] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'offline'>('offline');

    // Restore last N messages from persistence on mount / room change.
    useEffect(() => {
        setMessages(loadPersistedMessages(roomId));
    }, [roomId]);

    // Persist capped history whenever it changes.
    useEffect(() => {
        persistMessages(roomId, messages);
    }, [roomId, messages]);

    // TODO: Add useEffect hooks here to fetch initial game state from Dojo

    const sendMessage = useCallback(
        (body: string, sender: string) => {
            const trimmed = body.trim();
            if (!trimmed) return;
            // Host mute is client-enforced; a real deployment must also reject
            // muted sends server-side (see moderation note below).
            if (mutedPlayers.includes(sender)) return;

            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            const optimistic: ChatMessage = {
                id,
                roomId,
                sender,
                body: profanityFilterEnabled ? filterProfanity(trimmed) : trimmed,
                createdAt: Date.now(),
                reactions: [],
                pending: true,
            };
            setMessages((prev) => [...prev, optimistic].slice(-CHAT_HISTORY_CAP));

            // Local fallback transport: resolve the optimistic send on the next tick.
            // When multiplayer exists, replace this with the room transport call and
            // roll back (failed: true) on rejection.
            window.setTimeout(() => {
                setMessages((prev) =>
                    prev.map((m) => (m.id === id ? { ...m, pending: false } : m))
                );
            }, 0);
        },
        [roomId, mutedPlayers, profanityFilterEnabled]
    );

    const editMessage = useCallback((id: string, body: string, sender: string) => {
        const trimmed = body.trim();
        if (!trimmed) return;
        setMessages((prev) =>
            prev.map((m) =>
                m.id === id && m.sender === sender && !m.system
                    ? {
                          ...m,
                          body: profanityFilterEnabled ? filterProfanity(trimmed) : trimmed,
                          editedAt: Date.now(),
                      }
                    : m
            )
        );
    }, [profanityFilterEnabled]);

    const deleteMessage = useCallback((id: string, sender: string) => {
        setMessages((prev) => prev.filter((m) => !(m.id === id && m.sender === sender && !m.system)));
    }, []);

    const toggleReaction = useCallback((id: string, emoji: string, sender: string) => {
        setMessages((prev) =>
            prev.map((m) => {
                if (m.id !== id) return m;
                const existing = m.reactions.find((r) => r.emoji === emoji);
                let reactions: ChatReaction[];
                if (!existing) {
                    reactions = [...m.reactions, { emoji, senders: [sender] }];
                } else if (existing.senders.includes(sender)) {
                    reactions = m.reactions
                        .map((r) =>
                            r.emoji === emoji
                                ? { ...r, senders: r.senders.filter((s) => s !== sender) }
                                : r
                        )
                        .filter((r) => r.senders.length > 0);
                } else {
                    reactions = m.reactions.map((r) =>
                        r.emoji === emoji ? { ...r, senders: [...r.senders, sender] } : r
                    );
                }
                return { ...m, reactions };
            })
        );
    }, []);

    const addSystemMessage = useCallback(
        (kind: ChatMessage['systemKind'], sender: string) => {
            const body =
                kind === 'joined'
                    ? `${sender} joined the room`
                    : kind === 'left'
                    ? `${sender} left the room`
                    : `${sender} rolled doubles`;
            const systemMessage: ChatMessage = {
                id: `sys-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                roomId,
                sender: 'system',
                body,
                createdAt: Date.now(),
                reactions: [],
                system: true,
                systemKind: kind,
            };
            setMessages((prev) => [...prev, systemMessage].slice(-CHAT_HISTORY_CAP));
        },
        [roomId]
    );

    // Moderation: host-only mute. Client-enforced; server must also reject
    // sends from muted players for real enforcement.
    const mutePlayer = useCallback((player: string) => {
        setMutedPlayers((prev) => (prev.includes(player) ? prev : [...prev, player]));
    }, []);

    const unmutePlayer = useCallback((player: string) => {
        setMutedPlayers((prev) => prev.filter((p) => p !== player));
    }, []);

    const reportMessage = useCallback((id: string) => {
        // Report stub: no backend yet. Wire to moderation service when available.
        if (typeof window !== 'undefined') {
            window.console.info('[chat] reported message', id);
        }
    }, []);

    const value = {
        isAppearanceModalOpen,
        setAppearanceModalOpen,
        players,
        setPlayers,
        selectedColor,
        setSelectedColor,
        // Chat system v2
        roomId,
        messages,
        sendMessage,
        editMessage,
        deleteMessage,
        toggleReaction,
        addSystemMessage,
        mutedPlayers,
        mutePlayer,
        unmutePlayer,
        reportMessage,
        profanityFilterEnabled,
        setProfanityFilterEnabled,
        connectionStatus,
        setConnectionStatus,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}


export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}