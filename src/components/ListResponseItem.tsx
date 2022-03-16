import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import VotingChart from "./VotingChart";

// @ts-ignore
const ListResponseItem = (props) => {
    const [ownerText, setOwnerText] = useState("No owner has found.");

    useEffect(() => {
        const createOwnerText = () => {
            if (props.owner) {
                let text = props.owner;
                let len = text.length;
                let first = text.slice(0, 5);
                let last = text.slice(len - 5, len);
                return first + "....." + last;
            } else {
                return "No owner has found.";
            }
        };

        setOwnerText(createOwnerText());
    }, [setOwnerText, props.owner]);

    const ownerClicked = () => {
        navigator.clipboard.writeText(props.owner);
        toast.success("Copied to clipboard", { style: { maxWidth: "none" } });
    };

    // @ts-ignore
    return (
        <Grid
            container
            direction="column"
            sx={{
                border: "2px solid white",
                borderRadius: "7px 7px 7px 7px",
                backgroundColor: "whitesmoke",
                margin: 2,
            }}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                p={2}
                sx={{ backgroundColor: "#1F2123" }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                    sx={{ color: "whitesmoke", paddingTop: 1 }}
                    align="center"
                >
                    {props.topic}
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ color: "whitesmoke", paddingTop: 1, float: "right" }}
                    align="center"
                >
                    {props.id}
                </Typography>
            </Grid>
            <Grid
                container
                direction="row"
                alignItems="left"
                sx={{ align: "center", padding: "10%" }}
            >
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ color: "gray" }}
                >
                    <span style={{ fontWeight: "bolder" }}>Deadline:</span>{" "}
                    {props.deadline}
                </Typography>
                <Tooltip title="copy owner address">
                    <Button onClick={ownerClicked} color="success">
                        Owner: {ownerText}
                    </Button>
                </Tooltip>
                <br />
            </Grid>
            <Grid sx={{ padding: 5 }}>
                <VotingChart
                    yesCount={props.yesCount}
                    noCount={props.noCount}
                    nwvCount={props.nwvCount}
                    abstainCount={props.abstainCount}
                />
            </Grid>
            {/*//////////////////////////////////////////////////////////////////////////////*/}
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
