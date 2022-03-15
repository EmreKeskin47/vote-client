import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomAlert from "./CustomAlert";

const Voting = (props: {
    function: (arg0: string, arg1: Number, arg2: string) => void;
}) => {
    const [id, setId] = useState("0");
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);

    const resetFlags = () => {
        setFlag(false);
        setFlag2(false);
    }

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setId(event.target.value);
    };

    const votedNo = () => {
        if (Number(id) < 1) {
            setFlag(true);
            setTimeout(resetFlags, 3000);
        } else if (isNaN(Number(id))) {
            setFlag2(true);
            setTimeout(resetFlags, 3000);
        }
        else {
            props.function(id, 0, "NO");
        }
    };
    const votedAbstain = () => {
        if (Number(id) < 1) {
            setFlag(true);
            setTimeout(resetFlags, 3000);
        } else if (isNaN(Number(id))) {
            setFlag2(true);
            setTimeout(resetFlags, 3000);
        }
        else {
            props.function(id, 1, "NO");
        }
    };
    const votedYes = () => {
        console.log(Number(id))
        if (Number(id) < 1) {
            setFlag(true);
            setTimeout(resetFlags, 3000);
        } else if (isNaN(Number(id))) {
            setFlag2(true);
            setTimeout(resetFlags, 3000);
        }
        else {
            props.function(id, 2, "YES");
        }
    };
    const votedNoWithVeto = () => {
        if (Number(id) < 1) {
            setFlag(true);
            setTimeout(resetFlags, 3000);
        } else if (isNaN(Number(id))) {
            setFlag2(true);
            setTimeout(resetFlags, 3000);
        }
        else {
            props.function(id, 3, "NO");
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

                    <Grid item sm={12} md={8} justifyItems="space-between">
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
                        <Button
                            sx={{
                                border: "1px solid",
                                borderRadius: "5px",
                                color: "whitesmoke",
                            }}
                            onClick={votedAbstain}
                        >
                            No
                        </Button>
                        <Button
                            sx={{
                                border: "1px solid",
                                borderRadius: "5px",
                                color: "whitesmoke",
                            }}
                            onClick={votedNoWithVeto}
                        >
                            No
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <br/>
            {flag &&
                <CustomAlert severity="error" text="Deadline height starts from 1" function={resetFlags} />
            }
            {flag2 &&
                <CustomAlert severity="error" text="Please enter a number that is bigger than 0" function={resetFlags} />
            }
        </Grid>
    );
};

export default Voting;
