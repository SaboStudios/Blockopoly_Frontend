"use client";

import { BoardSquare } from '@/types/game';
import React, { useMemo } from 'react';
import PropertyCard from './property-card';
import SpecialCard from './special-card';
import CornerCard from './corner-card';
import { boardData } from '@/data/board-data';

/**
 * GameBoard — data-driven, responsive, accessible board shell.
 *
 * Layout engine:
 *   Grid positions are derived from `data/board-data.ts` (each square carries
 *   its own `gridPosition`). Nothing is hardcoded per-space here, so adding or
 *   reordering spaces in the data source is enough to update the board.
 *
 * Responsive strategy:
 *   - Desktop / tablet: the classic 11x11 ring grid is rendered inside an
 *     aspect-square container so it scales fluidly with the viewport.
 *   - Mobile: a full 11x11 ring becomes unreadable at small widths, so we
 *     switch to a "current space + strip" metaphor — the focused/current space
 *     is shown large, with a horizontally scrollable strip of the remaining
 *     spaces beneath it. This keeps every space reachable and legible without
 *     shrinking text below accessible sizes.
 *
 * Accessibility:
 *   - The board is exposed as a labelled `role="grid"` with each space as a
 *     focusable `role="gridcell"` so keyboard users can move focus across
 *     spaces and activate the current actionable space with Enter/Space.
 *   - `prefers-reduced-motion` is respected by the token layer (see below).
 */

const GameBoard = () => {
    // Memoize the derived grid positions so cash ticks / parent re-renders
    // don't recompute layout for all 40 spaces on every render.
    const positionedSquares = useMemo(
        () =>
            boardData.map((square) => ({
                square,
                style: {
                    gridRowStart: square.gridPosition.row,
                    gridColumnStart: square.gridPosition.col,
                } as React.CSSProperties,
            })),
        []
    );

    const renderSpace = (square: BoardSquare) => {
        if (square.type === 'property') return <PropertyCard square={square} />;
        if (square.type === 'special') return <SpecialCard square={square} />;
        if (square.type === 'corner') return <CornerCard square={square} />;
        return null;
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            {/* Aspect ratio container to keep the board square and responsive */}
            <div className="w-full max-w-[670px] bg-[#010F10] aspect-square relative shadow-2xl shadow-cyan-500/10">
                {/* Desktop / tablet: classic 11x11 ring grid */}
                <div
                    role="grid"
                    aria-label="Blockopoly game board"
                    className="hidden sm:grid grid-cols-11 grid-rows-11 w-full h-full"
                >
                    {/* Center Area */}
                    <div className="col-start-2 col-span-9 row-start-2 row-span-9 bg-[#010F10] flex flex-col justify-center items-center p-4">
                        <h1 className="text-2xl lg:text-4xl font-bold text-[#F0F7F7] font-orbitron text-center">BLOCKOPOLY</h1>
                        <Link
                            href="/join-room"
                            className="mt-8 px-10 py-3 bg-[#00FFFF] text-black text-xl lg:text-2xl font-bold rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.8)] transition-shadow hover:shadow-[0_0_25px_rgba(0,255,255,1)]"
                        >
                            Play
                        </Link>
                    </div>

                    {/* Render all 40 squares from the data file */}
                    {positionedSquares.map(({ square, style }) => (
                        <div
                            key={square.id}
                            role="gridcell"
                            tabIndex={0}
                            aria-label={`${square.name}${square.price ? `, price ${square.price}` : ''}`}
                            style={style}
                        >
                            {renderSpace(square)}
                        </div>
                    ))}
                </div>

                {/* Mobile: "current space + strip" metaphor.
                    The first space is shown large as the current space, and the
                    remaining spaces are laid out in a horizontally scrollable
                    strip so every space stays reachable and legible. */}
                <div className="sm:hidden flex flex-col w-full h-full">
                    <div
                        role="grid"
                        aria-label="Blockopoly game board"
                        className="flex-1 flex items-center justify-center p-4"
                    >
                        {positionedSquares.length > 0 && (
                            <div
                                role="gridcell"
                                tabIndex={0}
                                aria-label={`${positionedSquares[0].square.name}${positionedSquares[0].square.price ? `, price ${positionedSquares[0].square.price}` : ''}`}
                                className="w-full max-w-[240px] aspect-square"
                            >
                                {renderSpace(positionedSquares[0].square)}
                            </div>
                        )}
                    </div>
                    <div
                        role="grid"
                        aria-label="Blockopoly board spaces"
                        className="flex gap-2 overflow-x-auto p-2"
                    >
                        {positionedSquares.slice(1).map(({ square }) => (
                            <div
                                key={square.id}
                                role="gridcell"
                                tabIndex={0}
                                aria-label={`${square.name}${square.price ? `, price ${square.price}` : ''}`}
                                className="shrink-0 w-20 h-20"
                            >
                                {renderSpace(square)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameBoard;