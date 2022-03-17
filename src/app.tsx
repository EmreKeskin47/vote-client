import React, { useState } from "react";
import { WalletProvider } from "./contexts/wallet";
import { ThemeProvider } from "./contexts/theme";
import { NETWORK } from "./utils/constants";
import { SidebarLayout } from "./components/Sidebar";
import SingleProvider from "./SingleProvider";

export function App(): JSX.Element {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [network, setNetwork] = useState(NETWORK);

    return (
        <ThemeProvider
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
        >
            <SingleProvider>
                <WalletProvider network={network} setNetwork={setNetwork}>
                    <SidebarLayout />
                </WalletProvider>
            </SingleProvider>
        </ThemeProvider>
    );
}
