"use client";

import { useState } from "react";
import { useWallet } from "@/context/wallet-provider";
import { useStarknetMatch } from "@/lib/starknet/match";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { address, isConnected, connect, disconnect, chainId, expectedChainId, switchNetwork } = useWallet();
  const { isConfigured, pendingTx } = useStarknetMatch();
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const wrongNetwork = isConnected && chainId !== expectedChainId;

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);
    try {
      await connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSwitchNetwork = async () => {
    setError(null);
    try {
      await switchNetwork(expectedChainId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to switch network");
    }
  };

  const handleDisconnect = async () => {
    setError(null);
    try {
      await disconnect();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disconnect wallet");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 text-slate-100 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Wallet</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200" aria-label="Close">
            ×
          </button>
        </div>

        {!isConfigured && (
          <div className="mb-4 rounded border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
            Contract not configured. Set the Starknet match address to enable on-chain play.
          </div>
        )}

        {wrongNetwork && (
          <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            <p className="mb-2">Wrong network. Please switch to the expected chain.</p>
            <button
              onClick={handleSwitchNetwork}
              className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-400"
            >
              Switch network
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {pendingTx && (
          <div className="mb-4 rounded border border-sky-500/40 bg-sky-500/10 p-3 text-sm text-sky-200">
            Pending transaction: {pendingTx.slice(0, 10)}…
          </div>
        )}

        {isConnected ? (
          <div className="space-y-4">
            <div className="rounded bg-slate-800 p-3 text-sm">
              <span className="text-slate-400">Connected: </span>
              <span className="font-mono">{address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "unknown"}</span>
            </div>
            <button
              onClick={handleDisconnect}
              className="w-full rounded bg-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-600"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full rounded bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50"
          >
            {isConnecting ? "Connecting…" : "Connect wallet"}
          </button>
        )}
      </div>
    </div>
  );
}
