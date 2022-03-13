import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const QueryBox = (props: {
    function: (arg0: string) => void;
    heading:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    subHeading:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    idText: {} | null | undefined;
    buttonText:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
}) => {
    const [id, setId] = useState("0");

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setId(event.target.value);
    };

    const queryVoteBox = () => {
        if (Number(id) < 1) {
            alert("Ids start from 1");
        } else if (isNaN(Number(id))) {
            alert("Please enter a number that is bigger than 0")
        }
        else {
            props.function((Number(id) - 1).toString());
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
                {props.heading}
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ color: "whitesmoke" }}
            >
                {props.subHeading}
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
                        id="Query ID"
                        label={props.idText}
                        variant="filled"
                        onChange={handleChange}
                        sx={{ backgroundColor: "white" }}
                    />
                </Grid>

                <Grid item sm={12} md={4} justifyItems="space-between">
                    <Button
                        sx={{
                            padding: "10px",
                            border: "1px solid",
                            borderRadius: "5px",
                            color: "whitesmoke",
                        }}
                        onClick={queryVoteBox}
                    >
                        {props.buttonText}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default QueryBox;
