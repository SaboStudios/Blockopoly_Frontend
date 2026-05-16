📌 Overview
Tycoon on Stellar Frontend is the user interface for a decentralized board-game experience on Stellar / Soroban. Built with Next.js, Tailwind CSS, and Stellar wallet tooling, it delivers a modern, responsive UI that connects to on-chain game logic in Rust (Soroban). Players can interact with the board, buy and sell properties, roll dice, and trade digital assets in a trustless, blockchain-powered environment—without leaving the Stellar ecosystem.

✨ Features
Responsive Tycoon UI — Game board, property cards, dice, and modals (Figma-driven), styled with Tailwind CSS.
Stellar integration — Connect wallets, sign transactions, and read game state via Stellar SDK and wallet adapters.
On-chain interaction — Live updates for moves, property purchases, and trades through Soroban smart contracts.
Sponsored / smooth UX — Optional fee sponsorship (e.g. platform-paid fees) so players focus on gameplay, not gas tokens.
TypeScript — Type-safe components and contract interactions, aligned with Soroban backend contracts.
Decentralized gameplay — UI reflects trustless rules enforced on-chain.
🔧 Tech Stack
Next.js 15 — App Router for fast, server-rendered React pages.
Tailwind CSS v4 — Custom styling for the board-game aesthetic.
Stellar SDK — Build, simulate, and submit transactions; read ledger state.
Wallet kit — Freighter (and compatible Stellar wallets) for connect/sign flows.
Soroban — On-chain game logic (Rust contracts; separate repo).
TypeScript — Strong typing across UI and chain calls.
ESLint — Code quality, integrated with Next.js.
Figma — Source for board and component design.
🚀 Getting Started
Prerequisites
Node.js ≥ 18.0.0
npm or yarn
Stellar wallet (e.g. Freighter)
Access to Tycoon on Stellar Soroban contracts (see Contract repo)
1️⃣ Clone the repository
git clone https://github.com/YOUR_ORG/tycoon-on-stellar-frontend.git
cd tycoon-on-stellar-frontend
2️⃣ Install dependencies
npm install
3️⃣ Environment variables
cp .env.example .env.local
Variable	Description
NEXT_PUBLIC_STELLAR_NETWORK	testnet or mainnet
NEXT_PUBLIC_SOROBAN_RPC_URL	Soroban-capable RPC URL
NEXT_PUBLIC_GAME_CONTRACT_ID	Deployed Tycoon game contract ID
NEXT_PUBLIC_API_URL	Optional backend API (if used)
4️⃣ Run locally
npm run dev
Open http://localhost:3000.

5️⃣ Build for production
npm run build
npm run start
📁 Project structure (typical)
app/                 # Next.js App Router pages
components/          # Board, cards, dice, modals
lib/                 # Stellar client, contract helpers, types
public/              # Assets (thumbnail, icons, board art)
🔗 Related repos
Repo	Role
Contract	Soroban game logic (Rust)
Backend	Optional API: matchmaking, indexing, sponsorship (NestJS)
📜 License
See repository license file. Contact the team for commercial use.

