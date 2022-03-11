import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CreateVoteBox = (props: { function: (arg0: number) => void }) => {
    const [height, setHeight] = useState("0");

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setHeight(event.target.value);
    };

    const createVoteBox = () => {
        props.function(Number(height));
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
                Create Your VoteBox
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ color: "whitesmoke" }}
            >
                Enter the deadline height for the votebox and click create
                button
            </Typography>
            <br />
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
                        id="deadline-height"
                        label="Deadline Height"
                        variant="filled"
                        onChange={handleChange}
                        sx={{ backgroundColor: "white" }}
                    />
                </Grid>

                <Grid item sm={12} md={4}>
                    <Button
                        sx={{
                            padding: "10px",
                            border: "1px solid",
                            borderRadius: "5px",
                            color: "whitesmoke",
                        }}
                        onClick={createVoteBox}
                    >
                        Create VoteBox
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreateVoteBox;
