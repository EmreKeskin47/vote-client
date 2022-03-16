import React, { useContext } from "react";
import { useCallback } from "react";
import { useKeplr } from "../services/keplr";
import singleContext from "../SingleContext";

const WalletLoader = () => {
    const context = useContext(singleContext);
    const keplr = useKeplr();

    const connectWallet = useCallback(() => {
        keplr.connect();
        
        }, [keplr]);

    return (
        <button onClick={connectWallet}>
            <h2>Connect Wallet &rarr;</h2>
        </button>
    );
};

export default WalletLoader;
