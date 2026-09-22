"use client";

import React, {
    createContext,
    useContext,
    ReactNode,
    useCallback,
    useMemo,
} from "react";

import {
    useConnect,
    useAccount,
    useDisconnect,
    Connector,
    ConnectVariables,
} from "@starknet-react/core";

/**
 * Normalized wallet error surfaced to the UI so wrong-network / rejected /
 * account-switch states render a recoverable message instead of a blank screen.
 */
export type WalletErrorCode =
    | "wrong_network"
    | "user_rejected"
    | "account_switch"
    | "not_connected"
    | "unknown";

export interface WalletError {
    code: WalletErrorCode;
    message: string;
    recoverable: boolean;
}

interface WalletContextProps {
    account: string | null;
    connectors: Connector[]; // ← Exposed connectors
    connectWallet: (connector: Connector) => void; // ← Takes connector arg
    disconnectWallet: () => void;
    connectAsync: (args?: ConnectVariables) => Promise<void>;
    /** Last normalized wallet error, or null when healthy. */
    error: WalletError | null;
    /** Clear the current error (e.g. after the user retries). */
    clearError: () => void;
    /** True while a connect request is in flight. */
    isConnecting: boolean;
}

const WalletContext = createContext<WalletContextProps>({
    account: null,
    connectors: [], // ← Default empty
    connectWallet: () => { },
    disconnectWallet: () => { },
    connectAsync: () => Promise.resolve(),
    error: null,
    clearError: () => { },
    isConnecting: false,
});

/**
 * Map raw wallet/connector failures to a typed, recoverable error. Keeps the
 * public API strongly typed (no `any`) and lets modals branch on `code`.
 */
export function normalizeWalletError(err: unknown): WalletError {
    const raw =
        err instanceof Error
            ? err.message
            : typeof err === "string"
                ? err
                : "";
    const lower = raw.toLowerCase();

    if (
        lower.includes("chain") ||
        lower.includes("network") ||
        lower.includes("wrong") ||
        lower.includes("unsupported")
    ) {
        return {
            code: "wrong_network",
            message:
                "Wrong network. Switch your wallet to the configured Starknet network and retry.",
            recoverable: true,
        };
    }

    if (
        lower.includes("reject") ||
        lower.includes("denied") ||
        lower.includes("cancel")
    ) {
        return {
            code: "user_rejected",
            message: "Request rejected in wallet. You can try again anytime.",
            recoverable: true,
        };
    }

    if (lower.includes("account") || lower.includes("switch")) {
        return {
            code: "account_switch",
            message:
                "Account changed. Reconnect your wallet to continue the match.",
            recoverable: true,
        };
    }

    return {
        code: "unknown",
        message: raw || "Wallet request failed. Please retry.",
        recoverable: true,
    };
}

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { connect, connectors, connectAsync } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const [error, setError] = React.useState<WalletError | null>(null);
    const [isConnecting, setIsConnecting] = React.useState(false);

    const clearError = useCallback(() => setError(null), []);

    // Accept a specific connector when connecting
    const connectWallet = useCallback(
        (connector: Connector) => {
            setError(null);
            setIsConnecting(true);
            try {
                connect({ connector });
            } catch (err) {
                setError(normalizeWalletError(err));
            } finally {
                setIsConnecting(false);
            }
        },
        [connect]
    );

    const connectAsyncSafe = useCallback(
        async (args?: ConnectVariables) => {
            setError(null);
            setIsConnecting(true);
            try {
                await connectAsync(args);
            } catch (err) {
                setError(normalizeWalletError(err));
                throw err;
            } finally {
                setIsConnecting(false);
            }
        },
        [connectAsync]
    );

    const disconnectWallet = useCallback(() => {
        setError(null);
        disconnect();
    }, [disconnect]);

    const value = useMemo<WalletContextProps>(
        () => ({
            account: address ?? null,
            connectors, // ← Now available to consumers
            connectWallet, // ← Can specify which connector
            disconnectWallet,
            connectAsync: connectAsyncSafe,
            error,
            clearError,
            isConnecting,
        }),
        [
            address,
            connectors,
            connectWallet,
            disconnectWallet,
            connectAsyncSafe,
            error,
            clearError,
            isConnecting,
        ]
    );

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWalletContext = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) {
        throw new Error("useWalletContext must be inside WalletProvider");
    }
    return ctx;
};
