import React, {useEffect, useCallback, useState, useContext} from "react";
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
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import AddCardIcon from "@mui/icons-material/AddCard";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import {useWallet} from "../contexts/wallet";
import {useKeplr} from "../services/keplr";
import getShortAddress from "../utils/getShortAddress";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import toast from 'react-hot-toast';
import singleContext from "../SingleContext";
import {setEmitFlags} from "typescript";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"

export const drawerWidth = 240;

export function Sidebar(): JSX.Element {
    const context = useContext(singleContext);
    console.log(context);

    const wallet = useWallet();
    const keplr = useKeplr();

    const [mobileOpen, setMobileOpen] = React.useState(false);

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
    }, []);

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
            <Toolbar/>
            <List>
                <ListItem button onClick={walletOnClick}>
                    <ListItemIcon>
                        <AddCardIcon sx={{color: "white"}}/>
                    </ListItemIcon>
                    {keplr.initializing ? (
                        <ListItemText primary={"Connect Wallet"}/>
                    ) : (
                        <ListItemText primary={walletText}/>
                    )}
                </ListItem>
                <Grid sx={{padding: 1}}>
                </Grid>
                <Link href="/" underline="none" sx={{color: "white"}}>
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon sx={{color: "white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                </Link>
                <Link href="/vote" underline="none" sx={{color: "white"}}>
                    <ListItem>
                        <ListItemIcon>
                            <HowToVoteIcon sx={{color: "white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Vote"}/>
                    </ListItem>
                </Link>
              <Link
                    href="/reset-remove"
                    underline="none"
                    sx={{ color: "white" }}
                >
                    <ListItem>
                        <ListItemIcon>
                            <HowToVoteIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Reset/Remove "} />
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: "#1F2123 !important",
            }}
        >
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar sx={{backgroundColor: "#1F2123"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: "none"}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{textAlign: "center", width: "100%"}}
                    >
                        VoteBox
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: {sm: drawerWidth},
                    flexShrink: {sm: 0},
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
                        display: {xs: "block", sm: "none"},
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
                        display: {xs: "none", sm: "block"},
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
    );
}
