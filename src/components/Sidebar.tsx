import React, { useEffect, useCallback, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import AddCardIcon from "@mui/icons-material/AddCard";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { useWallet } from "../contexts/wallet";
import { useKeplr } from "../services/keplr";
import getShortAddress from "../utils/getShortAddress";
import singleContext from "../SingleContext";
import Grid from "@mui/material/Grid";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "../routes/Home";
import Vote from "../routes/Vote";
import Reset from "../routes/Reset-Remove";

export const drawerWidth = 240;

export function SidebarLayout(): JSX.Element {
    const wallet = useWallet();
    const keplr = useKeplr();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedPage, setSelectedPage] = React.useState("home");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const walletText = wallet.initialized
        ? wallet.name || getShortAddress(wallet.address)
        : "Connect Wallet";

    useEffect(() => {
        // Used for listening keplr account changes
        window.addEventListener("keplr_keystorechange", () => {
            keplr.connect(true);
        });
    }, [keplr]);

    const connectWallet = useCallback(() => keplr.connect(), [keplr]);

    const walletOnClick = () => {
        if (wallet.initialized) {
            keplr.disconnect();
        } else {
            connectWallet();
        }
    };

    const drawer = (
        <Box>
            <Toolbar />
            <List>
                <ListItem button onClick={walletOnClick}>
                    <ListItemIcon>
                        <AddCardIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    {keplr.initializing ? (
                        <ListItemText primary={"Connect Wallet"} />
                    ) : (
                        <ListItemText primary={walletText} />
                    )}
                </ListItem>
                <Grid sx={{ padding: 1 }}></Grid>
                <Link to="/">
                    <ListItem
                        button
                        onClick={() => setSelectedPage("home")}
                        style={{
                            backgroundColor:
                                selectedPage === "home" ? "#7C4FA6" : "#1F2123",
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Home"}
                            sx={{ color: "white" }}
                        />
                    </ListItem>
                </Link>
                <Link to="/vote">
                    <ListItem
                        button
                        onClick={() => setSelectedPage("vote")}
                        style={{
                            backgroundColor:
                                selectedPage === "vote" ? "#7C4FA6" : "#1F2123",
                        }}
                    >
                        <ListItemIcon>
                            <HowToVoteIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Vote"}
                            sx={{ color: "white" }}
                        />
                    </ListItem>
                </Link>
                <Link to="/reset-remove">
                    <ListItem
                        button
                        onClick={() => setSelectedPage("reset-remove")}
                        style={{
                            backgroundColor:
                                selectedPage === "reset-remove"
                                    ? "#9c27b0"
                                    : "#1F2123",
                        }}
                    >
                        <ListItemIcon>
                            <HowToVoteIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Reset/Remove "}
                            sx={{ color: "white" }}
                        />
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            ml: { sm: `${drawerWidth}px` },
                        }}
                    >
                        <Toolbar sx={{ backgroundColor: "#1F2123" }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: "none" } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h5"
                                noWrap
                                component="div"
                                sx={{ textAlign: "center", width: "100%" }}
                            >
                                VoteBox
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="nav"
                        sx={{
                            width: { sm: drawerWidth },
                            flexShrink: { sm: 0 },
                        }}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            PaperProps={{
                                sx: {
                                    backgroundColor: "#1F2123",
                                    color: "white",
                                },
                            }}
                            sx={{
                                display: { xs: "block", sm: "none" },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: drawerWidth,
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                        <Drawer
                            PaperProps={{
                                sx: {
                                    backgroundColor: "#1F2123",
                                    color: "white",
                                },
                            }}
                            variant="permanent"
                            sx={{
                                display: { xs: "none", sm: "block" },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: drawerWidth,
                                },
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Box marginTop={10}>
                        <Toaster position="top-right" />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/vote" component={Vote} />
                            <Route
                                exact
                                path="/reset-remove"
                                component={Reset}
                            />
                        </Switch>
                    </Box>
                </Box>
            </Box>
        </Router>
    );
}
