import { Grid, Typography } from "@mui/material";
import React from "react";
import Logo from "./logo.png";
const Home = () => {
    return (
        <Grid container sm={12} justifySelf="center" justifyItems="center">
            <Grid
                item
                xs={12}
                sx={{
                    justifyContent: "center !important",
                    display: "inline-grid",
                }}
            >
                <img
                    src={Logo}
                    alt="logo"
                    width={400}
                    height={400}
                    style={{
                        border: "3px solid gray",
                        borderRadius: "7px 7px 7px 7px",
                    }}
                />
            </Grid>

            <Grid>
                <Typography
                    variant="h3"
                    sx={{
                        color: "whitesmoke",
                        paddingTop: "30px",
                        textAlign: "center",
                    }}
                >
                    Welcome to VoteBox!
                </Typography>

                <Typography
                    variant="h5"
                    sx={{ color: "whitesmoke", textAlign: "center" }}
                    marginTop={5}
                >
                    With VoteBox, you can create your own vote boxes and people
                    from all around the world can participate in the voting
                    process with total anonymity.
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: "whitesmoke",
                        textAlign: "center",
                    }}
                    marginTop={5}
                >
                    Let&apos;s start with your first VoteBox!
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Home;
