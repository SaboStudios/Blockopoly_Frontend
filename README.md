# 🏛️ Tycoon on Stellar — Frontend

![Tycoon on Stellar Thumbnail](./public/thumbnail.png)

## 📌 Overview

**Tycoon on Stellar** Frontend is the user interface for a decentralized board-game experience on **Stellar / Soroban**. Built with **Next.js**, **Tailwind CSS**, and Stellar wallet tooling, it delivers a modern, responsive UI that connects to on-chain game logic in **Rust (Soroban)**. Players can interact with the board, buy and sell properties, roll dice, and trade digital assets in a trustless, blockchain-powered environment—without leaving the Stellar ecosystem.

This repository contains the Next.js frontend only; the Soroban smart contracts live in a separate repository.

## ✨ Features

- **Responsive Tycoon UI** — Game board, property cards, dice, and modals (Figma-driven), styled with Tailwind CSS.
- **Stellar integration** — Connect wallets, sign transactions, and read game state via Stellar SDK and wallet adapters.
- **On-chain interaction** — Live updates for moves, property purchases, and trades through Soroban smart contracts.
- **Sponsored / smooth UX** — Optional fee sponsorship (e.g. platform-paid fees) so players focus on gameplay, not gas tokens.
- **TypeScript** — Type-safe components and contract interactions, aligned with Soroban backend contracts.
- **Decentralized gameplay** — UI reflects trustless rules enforced on-chain.

## 🔧 Tech Stack

- **Next.js 15** — App Router for fast, server-rendered React pages.
- **Tailwind CSS v4** — Custom styling for the board-game aesthetic.
- **Stellar SDK** — Build, simulate, and submit transactions; read ledger state.
- **Wallet kit** — Freighter (and compatible Stellar wallets) for connect/sign flows.
- **Soroban** — On-chain game logic (Rust contracts; separate repo).
- **TypeScript** — Strong typing across UI and chain calls.
- **ESLint** — Code quality, integrated with Next.js.
- **Figma** — Source for board and component design.

## 🚀 Getting Started

### Prerequisites

- **Node.js >= 18** (Node.js 18 or newer is required)
- **npm** or **yarn**
- **Stellar wallet** (e.g. [Freighter](https://www.freighter.app/))
- Access to **Tycoon on Stellar** Soroban contracts (see Contract repo)
- **Supported browsers** — latest **Chrome**, **Firefox**, and **Safari**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SaboStudios/Blockopoly_Frontend.git
cd Blockopoly_Frontend
```

### 2️⃣ Environment variables

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser — do not put secrets there.

## 🤝 Contributing

Found a bug or have an idea? Please open a GitHub Issue so we can track it.
We welcome contributions via pull requests once an issue is discussed.
