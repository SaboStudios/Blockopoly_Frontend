"use client";

import React, {
    createContext,
    useContext,
    ReactNode,
    useCallback,
    useState,
} from "react";

import {
    useConnect,
    useAccount,
    useDisconnect,
    Connector,
    ConnectVariables,
} from "@starknet-react/core";

interface WalletContextProps {
    account: string | null;
    connectors: Connector[]; // ← Exposed connectors
    connectWallet: (connector: Connector) => void; // ← Takes connector arg
    disconnectWallet: () => void;
    connectAsync: (args?: ConnectVariables) => Promise<void>;
    isDisconnecting: boolean;
}

const WalletContext = createContext<WalletContextProps>({
    account: null,
    connectors: [], // ← Default empty
    connectWallet: () => { },
    disconnectWallet: () => { },
    connectAsync: () => Promise.resolve(),
    isDisconnecting: false,
});

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { connect, connectors, connectAsync } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const [isDisconnecting, setIsDisconnecting] = useState(false);

    // Accept a specific connector when connecting
    const connectWallet = useCallback(
        (connector: Connector) => {
            connect({ connector });
        },
        [connect]
    );

    // Guard against double-submit: only the first call while idle disconnects.
    const disconnectWallet = useCallback(() => {
        setIsDisconnecting((pending) => {
            if (pending) return pending;
            disconnect();
            return true;
        });
    }, [disconnect]);

    return (
        <WalletContext.Provider
            value={{
                account: address ?? null,
                connectors, // ← Now available to consumers
                connectWallet, // ← Can specify which connector
                disconnectWallet,
                connectAsync,
                isDisconnecting,
            }}
        >
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
