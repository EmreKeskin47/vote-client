import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// @ts-ignore
const ListResponseItem = (props) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
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
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{ color: "white" }}
                >
                    ID: {props.id}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    Topic: {props.topic}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    Yes: {props.yesCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    No: {props.noCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    Abstain: {props.abstainCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    No with Veto: {props.noWithVetoCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    Deadline: {props.deadline}
                </Typography>
            </Grid>
            <hr />
            <br />
            <Grid>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{ color: "white" }}
                >
                    Owner: <br />
                    {props.owner}
                </Typography>
            </Grid>
            {props.delete && (
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={4}
                >
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => props.reset(props.id)}
                    >
                        Reset Votes
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => props.delete(props.id)}
                    >
                        Delete Votebox
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default ListResponseItem;
