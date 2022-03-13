import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Voting = (props: {
    function: (arg0: string, arg1: boolean, arg2: string) => void;
}) => {
    const [id, setId] = useState("0");
    const [yesVote, setYesVote] = useState(false);
    const [noVote, setNoVote] = useState(false);

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setId(event.target.value);
    };

    const votedYes = () => {
        console.log(Number(id))
        if (Number(id) < 1) {
            alert("Ids start from 1")
        } else if (isNaN(Number(id))) {
            alert("Please enter a number that is bigger than 0")
        }
        else {
            setYesVote(true);
            props.function(id, yesVote, "YES");
        }
    };

    const votedNo = () => {
        if (Number(id) < 1) {
            alert("Ids start from 1")
        } else if (isNaN(Number(id))) {
            alert("Please enter a number that is bigger than 0")
        }
        else {
            setNoVote(false);
            props.function(id, noVote, "NO");
        }
    };

    return (
        <Grid
            sx={{
                border: "2px solid gray",
                borderRadius: "7px 7px 7px 7px",
                backgroundColor: "#1F2123",
                padding: 3,
                margin: 3,
                height: "35%",
                width: "100%",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ color: "whitesmoke" }}
            >
                Vote
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ color: "whitesmoke" }}
            >
                Enter the id of the VoteBox and then enter your choice
            </Typography>
            <br />
            <Grid
                direction="row"
                justifyContent="space-between"
                sx={{ width: "100%" }}
            >
                <Grid
                    container
                    direction="row"
                    xs={12}
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item sm={12} md={8} justifyItems="center">
                        <TextField
                            id="votebox-id"
                            label="VoteBox ID"
                            variant="filled"
                            onChange={handleChange}
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    <Grid item sm={12} md={4} justifyItems="space-between">
                        <Button
                            sx={{
                                border: "1px solid",
                                borderRadius: "5px",
                                color: "whitesmoke",
                            }}
                            onClick={votedNo}
                        >
                            No
                        </Button>
                        <Button
                            sx={{
                                border: "1px solid",
                                borderRadius: "5px",
                                color: "whitesmoke",
                            }}
                            onClick={votedYes}
                        >
                            Yes
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Voting;
