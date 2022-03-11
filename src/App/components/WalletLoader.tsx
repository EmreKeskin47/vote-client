import React from "react";
import { useCallback } from "react";
import { useKeplr } from "../services/keplr";

const WalletLoader = () => {
    const keplr = useKeplr();

    const connectWallet = useCallback(() => keplr.connect(), [keplr]);

    return (
        <button onClick={connectWallet}>
            <h2>Connect Wallet &rarr;</h2>
        </button>
    );
};

export default WalletLoader;
