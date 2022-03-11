import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { WalletProvider } from "./contexts/wallet";
import { ThemeProvider } from "./contexts/theme";
import { Toaster } from "react-hot-toast";
import Vote from "./routes/Vote";
import { NETWORK } from "./utils/constants";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./routes/Home";
import { drawerWidth, Sidebar } from "./components/Sidebar";

export function App(): JSX.Element {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [network, setNetwork] = useState(NETWORK);

    return (
        <ThemeProvider
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
        >
            <WalletProvider network={network} setNetwork={setNetwork}>
                <Box
                    sx={{
                        display: "flex",
                        backgroundColor: "#1F2123 !important",
                    }}
                >
                    <Sidebar />

                    <CssBaseline />

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                        }}
                    >
                        <Router basename={process.env.PUBLIC_URL}>
                            <Box marginTop={10}>
                                <Toaster position="top-right" />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route
                                        exact
                                        path="/vote"
                                        component={Vote}
                                    />
                                </Switch>
                            </Box>
                        </Router>
                    </Box>
                </Box>
            </WalletProvider>
        </ThemeProvider>
    );
}
