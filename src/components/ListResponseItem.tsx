import React, {useEffect, useState} from "react";
import {Grid, List} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import VotingChart from "./VotingChart";
import VoteDialog from "./VoteDialog";
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';

// @ts-ignore
const ListResponseItem = (props) => {
    const options = ["yes", "no", "no with veto", "abstain"];
    const [ownerText, setOwnerText] = useState("No owner was found.");
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(options[3]);
    const [boxState, setBoxState] = React.useState("");
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [description, setDescription] = React.useState("");

    const voteOptionClicked = (option: string) => {
        let selected: number = 1;
        switch (option) {
            case "yes":
                selected = 2;
                break;
            case "no":
                selected = 0;
                break;
            case "abstain":
                selected = 1;
                break;
            case "no with veto":
                selected = 3;
                break;
            default:
                break;
        }
        props.function(props.id, selected);
    }

    useEffect(() => {
        const createOwnerText = () => {
            if (props.owner) {
                let text = props.owner;
                let len = text.length;
                let first = text.slice(0, 5);
                let last = text.slice(len - 5, len);
                return first + "....." + last;
            } else {
                return "No owner was found.";
            }
        };
        if (props.deadlineNum > Date.now() * 1000000) {
            setBoxState("Active");
        } else {
            setBoxState("Expired");
        }
        if (props.description === undefined) {
            setDescription("No description was provided.");
        }
        console.log("Type of the description is " + typeof description);
        console.log("Description is " + description);
        setOwnerText(createOwnerText());
    }, [setOwnerText, props.owner]);

    const ownerClicked = () => {
        navigator.clipboard.writeText(props.owner);
        toast.success("Copied to clipboard", {style: {maxWidth: "none"}});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        console.log(value);
        setSelectedValue(value);
    };

    const flip = () => {
        if (!isFlipped) {
            setIsFlipped(true);
        } else {
            setIsFlipped(false);
        }
    }

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
                p={1}
                sx={{backgroundColor: "#1F2123"}}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{color: "whitesmoke", paddingTop: 1}}
                    align="center"
                >
                    {props.topic}
                </Typography>
                <Badge color={boxState === "Active" ? "success" : "error"} badgeContent={boxState}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                        sx={{color: "whitesmoke", paddingTop: 1, float: "right"}}
                        align="center"
                    >
                        {props.id}
                    </Typography>
                </Badge>
            </Grid>
            {!isFlipped &&
                <Grid container item direction="row" sx={{padding: 5}} onClick={flip}>
                    <Grid item lg={6} md={6} xs={6}>
                        <VotingChart
                            yesCount={props.yesCount}
                            noCount={props.noCount}
                            nwvCount={props.nwvCount}
                            abstainCount={props.abstainCount}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        direction="column"
                        lg={6} md={6} xs={6}
                        p={3}
                    >
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                            sx={{color: "gray"}}
                        >
                            <span style={{fontWeight: "bolder"}}>Deadline:</span>{" "}
                            {props.deadline}
                        </Typography>
                        <Tooltip title="copy owner address">
                            <Button onClick={ownerClicked} color="success">
                                {ownerText}
                            </Button>
                        </Tooltip>
                        <br/>
                    </Grid>
                </Grid>
            }
            {isFlipped &&
                <Grid height={334} onClick={flip} justifyContent="center">
                    <Paper elevation={24} style={{height: 320, overflow: 'auto'}}>
                        <List>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                                sx={{color: "gray"}}
                                p={2}
                            >
                                {description}
                            </Typography>
                        </List>
                    </Paper>
                </Grid>
            }
            <Button color="success" onClick={handleClickOpen}>
                VOTE FOR THIS VOTEBOX
            </Button>
            <VoteDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                function={voteOptionClicked}
            />
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
