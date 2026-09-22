'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Send, Users, Pencil, Trash2, Smile, Flag, VolumeX, Volume2, ShieldAlert } from 'lucide-react';

// ---------------------------------------------------------------------------
// Message model
// ---------------------------------------------------------------------------
export type ChatReaction = { emoji: string; senders: string[] };

export type ChatMessage = {
    id: string;
    roomId: string;
    sender: string;
    body: string;
    createdAt: number;
    editedAt?: number;
    reactions: ChatReaction[];
    system?: boolean;
    systemKind?: 'joined' | 'left' | 'rolled-doubles';
};

const HISTORY_CAP = 200;
const STORAGE_PREFIX = 'chat:v2:';
const REACTION_EMOJIS = ['👍', '😂', '🔥', '😮'];
const PROFANITY = ['damn', 'hell', 'shit', 'fuck', 'bitch', 'ass'];

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const filterProfanity = (text: string) =>
    PROFANITY.reduce(
        (acc, word) => acc.replace(new RegExp(`\\b${word}\\b`, 'gi'), (m) => m[0] + '*'.repeat(m.length - 1)),
        text,
    );

// ---------------------------------------------------------------------------
// Persistence helpers (local fallback; swap for room transport when available)
// ---------------------------------------------------------------------------
const loadHistory = (roomId: string): ChatMessage[] => {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(STORAGE_PREFIX + roomId);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.slice(-HISTORY_CAP) : [];
    } catch {
        return [];
    }
};

const saveHistory = (roomId: string, messages: ChatMessage[]) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(STORAGE_PREFIX + roomId, JSON.stringify(messages.slice(-HISTORY_CAP)));
    } catch {
        /* storage full / unavailable — non-fatal */
    }
};

// ---------------------------------------------------------------------------
// Store (context + reducer style, persistence + optimistic send/rollback)
// ---------------------------------------------------------------------------
const useChatStore = (roomId: string, currentUser: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [muted, setMuted] = useState<string[]>([]);
    const [filterOn, setFilterOn] = useState(false);
    const [status, setStatus] = useState<'connecting' | 'connected' | 'offline'>('connecting');

    useEffect(() => {
        setMessages(loadHistory(roomId));
        setStatus('connected');
    }, [roomId]);

    useEffect(() => {
        saveHistory(roomId, messages);
    }, [roomId, messages]);

    const push = useCallback((msg: ChatMessage) => {
        setMessages((prev) => [...prev, msg].slice(-HISTORY_CAP));
    }, []);

    const send = useCallback(
        (body: string) => {
            const trimmed = body.trim();
            if (!trimmed) return;
            if (muted.includes(currentUser)) return; // client-enforced mute
            const optimistic: ChatMessage = {
                id: uid(),
                roomId,
                sender: currentUser,
                body: filterOn ? filterProfanity(trimmed) : trimmed,
                createdAt: Date.now(),
                reactions: [],
            };
            push(optimistic);
            // Transport hook: when multiplayer exists, emit here and rollback on failure.
            // Local fallback persists via the effect above; simulate failure rollback path.
            try {
                // no-op local transport
            } catch {
                setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
            }
        },
        [roomId, currentUser, muted, filterOn, push],
    );

    const edit = useCallback((id: string, body: string) => {
        setMessages((prev) =>
            prev.map((m) =>
                m.id === id && m.sender === currentUser
                    ? { ...m, body: filterOn ? filterProfanity(body.trim()) : body.trim(), editedAt: Date.now() }
                    : m,
            ),
        );
    }, [currentUser, filterOn]);

    const remove = useCallback((id: string) => {
        setMessages((prev) => prev.filter((m) => !(m.id === id && m.sender === currentUser)));
    }, [currentUser]);

    const react = useCallback((id: string, emoji: string) => {
        setMessages((prev) =>
            prev.map((m) => {
                if (m.id !== id) return m;
                const existing = m.reactions.find((r) => r.emoji === emoji);
                let reactions: ChatReaction[];
                if (!existing) {
                    reactions = [...m.reactions, { emoji, senders: [currentUser] }];
                } else if (existing.senders.includes(currentUser)) {
                    reactions = m.reactions
                        .map((r) => (r.emoji === emoji ? { ...r, senders: r.senders.filter((s) => s !== currentUser) } : r))
                        .filter((r) => r.senders.length > 0);
                } else {
                    reactions = m.reactions.map((r) =>
                        r.emoji === emoji ? { ...r, senders: [...r.senders, currentUser] } : r,
                    );
                }
                return { ...m, reactions };
            }),
        );
    }, [currentUser]);

    const toggleMute = useCallback((player: string) => {
        setMuted((prev) => (prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]));
    }, []);

    return { messages, send, edit, remove, react, muted, toggleMute, filterOn, setFilterOn, status };
};

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------
const ChatRoom = ({
    roomId = 'local-room',
    currentUser = 'You',
    isHost = false,
    players = [],
}: {
    roomId?: string;
    currentUser?: string;
    isHost?: boolean;
    players?: string[];
}) => {
    const { messages, send, edit, remove, react, muted, toggleMute, filterOn, setFilterOn, status } =
        useChatStore(roomId, currentUser);
    const [draft, setDraft] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editDraft, setEditDraft] = useState('');
    const [reactionFor, setReactionFor] = useState<string | null>(null);
    const [reported, setReported] = useState<string[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    const unreadIndex = useMemo(() => {
        // separator before the first message newer than the last read marker
        const marker = typeof window !== 'undefined' ? Number(window.localStorage.getItem(STORAGE_PREFIX + roomId + ':read') || 0) : 0;
        return messages.findIndex((m) => m.createdAt > marker);
    }, [messages, roomId]);

    useEffect(() => {
        if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_PREFIX + roomId + ':read', String(Date.now()));
        }
    }, [messages, roomId]);

    const handleSend = () => {
        send(draft);
        setDraft('');
    };

    const statusColor =
        status === 'connected' ? 'bg-[#00E5FF]' : status === 'connecting' ? 'bg-[#FFC107]' : 'bg-[#FF5252]';

    return (
        <div className="w-full h-[685px] border-[1px] border-[#263238] flex flex-col mt-4 rounded-[12px]">
            {/* top */}
            <div className="w-full h-[37px] flex justify-between items-center border-b-[1px] border-[#263238] px-4">
                <h4 className="font-[700] font-dmSans text-[#F0F7F7] text-[14px]">Chat</h4>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-dmSans text-[#AFBAC0]">
                        <span className={`size-[6px] rounded-full ${statusColor}`} />
                        {status}
                    </span>
                    <button
                        type="button"
                        title="Toggle profanity filter"
                        onClick={() => setFilterOn((v) => !v)}
                        className={`text-[10px] font-dmSans px-2 py-[2px] rounded-[10px] border-[1px] ${filterOn ? 'border-[#00E5FF] text-[#00E5FF]' : 'border-[#263238] text-[#AFBAC0]'}`}
                    >
                        Filter
                    </button>
                    <Users className='w-4 h-4 text-[#F0F7F7]' />
                </div>
            </div>

            {/* content */}
            <main ref={listRef} className="w-full h-[calc(100%-89px)] overflow-y-auto no-scrollbar flex flex-col px-3 py-2 gap-2">
                {messages.length === 0 ? (
                    <div className="flex-1 flex justify-center items-center">
                        <p className="text-[#AFBAC0] text-center text-[14px] font-dmSans font-[500]">No messages yet</p>
                    </div>
                ) : (
                    messages.map((m, i) => {
                        const isOwn = m.sender === currentUser;
                        const isMuted = muted.includes(m.sender);
                        return (
                            <React.Fragment key={m.id}>
                                {i === unreadIndex && unreadIndex > 0 && (
                                    <div className="flex items-center gap-2 text-[10px] text-[#00E5FF] font-dmSans">
                                        <span className="flex-1 h-[1px] bg-[#00E5FF]/40" />
                                        New messages
                                        <span className="flex-1 h-[1px] bg-[#00E5FF]/40" />
                                    </div>
                                )}
                                {m.system ? (
                                    <p className="text-center text-[11px] text-[#AFBAC0] font-dmSans italic">{m.body}</p>
                                ) : (
                                    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-1 text-[10px] text-[#AFBAC0] font-dmSans">
                                            <span className={isMuted ? 'line-through' : ''}>{m.sender}</span>
                                            {isMuted && <VolumeX className="w-3 h-3 text-[#FF5252]" />}
                                            {m.editedAt && <span className="italic">(edited)</span>}
                                        </div>
                                        {editingId === m.id ? (
                                            <div className="flex items-center gap-1 mt-1">
                                                <input
                                                    value={editDraft}
                                                    onChange={(e) => setEditDraft(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            edit(m.id, editDraft);
                                                            setEditingId(null);
                                                        }
                                                    }}
                                                    className="outline-none bg-[#0B191A] rounded-[12px] text-[12px] text-[#F0F7F7] font-dmSans px-3 py-1 border-[1px] border-[#00E5FF]"
                                                />
                                            </div>
                                        ) : (
                                            <p
                                                className={`max-w-[80%] mt-1 px-3 py-1 rounded-[12px] text-[12px] font-dmSans break-words ${isOwn ? 'bg-[#00E5FF]/15 text-[#F0F7F7]' : 'bg-[#0B191A] text-[#AFBAC0]'}`}
                                            >
                                                {m.body.split(/(\s+)/).map((tok, idx) =>
                                                    tok.startsWith('@') ? (
                                                        <span key={idx} className="text-[#00E5FF] font-[700]">{tok}</span>
                                                    ) : (
                                                        <React.Fragment key={idx}>{tok}</React.Fragment>
                                                    ),
                                                )}
                                            </p>
                                        )}
                                        {m.reactions.length > 0 && (
                                            <div className="flex gap-1 mt-1">
                                                {m.reactions.map((r) => (
                                                    <button
                                                        key={r.emoji}
                                                        type="button"
                                                        onClick={() => react(m.id, r.emoji)}
                                                        className="text-[11px] px-2 py-[1px] rounded-[10px] bg-[#0B191A] border-[1px] border-[#263238] text-[#F0F7F7]"
                                                    >
                                                        {r.emoji} {r.senders.length}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 mt-1 text-[#AFBAC0]">
                                            <button type="button" title="React" onClick={() => setReactionFor(reactionFor === m.id ? null : m.id)}>
                                                <Smile className="w-3 h-3" />
                                            </button>
                                            {isOwn && (
                                                <>
                                                    <button type="button" title="Edit" onClick={() => { setEditingId(m.id); setEditDraft(m.body); }}>
                                                        <Pencil className="w-3 h-3" />
                                                    </button>
                                                    <button type="button" title="Delete" onClick={() => remove(m.id)}>
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </>
                                            )}
                                            {!isOwn && (
                                                <button
                                                    type="button"
                                                    title="Report"
                                                    onClick={() => setReported((prev) => [...prev, m.id])}
                                                >
                                                    <Flag className={`w-3 h-3 ${reported.includes(m.id) ? 'text-[#FF5252]' : ''}`} />
                                                </button>
                                            )}
                                            {isHost && !isOwn && (
                                                <button type="button" title="Mute player" onClick={() => toggleMute(m.sender)}>
                                                    {isMuted ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                                                </button>
                                            )}
                                        </div>
                                        {reactionFor === m.id && (
                                            <div className="flex gap-1 mt-1">
                                                {REACTION_EMOJIS.map((e) => (
                                                    <button
                                                        key={e}
                                                        type="button"
                                                        onClick={() => { react(m.id, e); setReactionFor(null); }}
                                                        className="text-[14px]"
                                                    >
                                                        {e}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })
                )}
            </main>

            {/* bottom */}
            <div className="w-full border-t-[1px] border-[#263238] h-[52px] flex items-stretch gap-2 p-2">
                <input
                    type="text"
                    className="outline-none flex-1 bg-[#0B191A] rounded-[20px] text-[12px] text-[#AFBAC0] font-dmSans px-3"
                    name="chat"
                    id="chat"
                    placeholder={muted.includes(currentUser) ? 'You are muted by the host' : 'Type a message...'}
                    value={draft}
                    disabled={muted.includes(currentUser)}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                />

                {/* send btn */}
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={muted.includes(currentUser)}
                    className='size-[36px] rounded-[20px] bg-[#010F10] border-[1px] border-[#263238] flex items-center justify-center text-[#AFBAC0] disabled:opacity-40'
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default ChatRoom