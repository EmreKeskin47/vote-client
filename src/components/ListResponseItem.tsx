import React, {useContext, useEffect, useState, useRef} from "react";
import {Grid, List} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import VotingChart from "./VotingChart";
import VoteDialog from "./VoteDialog";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import {useWallet} from "../contexts/wallet";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import CircularProgress from '@mui/material/CircularProgress';
import singleContext from "../SingleContext";

// @ts-ignore
const ListResponseItem = (props) => {
    const options = ["yes", "no", "no with veto", "abstain"];
    const [ownerText, setOwnerText] = useState("No owner was found.");
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(options[3]);
    const [boxState, setBoxState] = React.useState("");
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [description, setDescription] = React.useState(props.description);
    const [voteFlag, setVoteFlag] = useState(false);

    const wallet = useWallet();
    console.log("wallet address: " + wallet.address);
    let client: SigningCosmWasmClient;

    const context = useContext(singleContext);

    const vote = async (voteId: string, voteType: Number) => {
        setVoteFlag(true);
        try {
            client = wallet.getClient();
            const account = wallet.address; //(await signer.getAccounts())[0];
            console.log("account: ");
            console.log(account);

            const executeResponse = await client.execute(
                wallet.address,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.contractAdress,
                {
                    vote: {
                        id: voteId,
                        vote_type: voteType,
                    },
                },
                "auto"
            );
            let option = "";
            console.log(executeResponse);
            if (executeResponse === undefined) {
                alert("Something went wrong");
            } else {
                switch (voteType) {
                    case 0:
                        option = "No";
                        break;
                    case 1:
                        option = "Abstain";
                        break;
                    case 2:
                        option = "Yes";
                        break;
                    case 3:
                        option = "No with vote";
                        break;
                    default:
                        break;
                }
                toast.success("You have voted: " + option, {
                    style: {maxWidth: "none"},
                });
            }
        } catch (error: any) {
            let errMessage: String = error.message;
            if (errMessage.includes("ended")) {
                toast.error("The voting period has ended for this VoteBox.", {
                    style: {maxWidth: "none"},
                });
            } else if (errMessage.includes("already")) {
                toast.error("You may only vote once per VoteBox.", {
                    style: {maxWidth: "none"},
                });
            } else {
                toast.error(error.message, {style: {maxWidth: "none"}});
            }
        }
        setVoteFlag(false);
    };

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
        vote(props.id, selected).then(() => {
            props.function()
        });
    };

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
    };
    let deadlineDate = new Date(
        parseInt(props.deadlineNum) / 1000000
    ).toString();
    let creationDate = new Date(
        parseInt(props.dateCreated) / 1000000
    ).toString();
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
                position: "relative",
            }}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                p={1}
                //@ts-ignore
                sx={{backgroundColor: context.colors.backgroundColor}}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{color: "whitesmoke"}}
                    align="center"
                >
                    {props.topic}
                </Typography>
                <Badge
                    color={boxState === "Active" ? "success" : "error"}
                    badgeContent={boxState}
                >
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                        sx={{
                            color: "whitesmoke",
                            paddingTop: 1,
                            float: "right",
                        }}
                        align="center"
                    >
                        {props.id}
                    </Typography>
                </Badge>
            </Grid>
            {!isFlipped && (
                <Grid
                    container
                    item
                    direction="column"
                    sx={{padding: 3}}
                    onClick={flip}
                >
                    <Grid
                        item
                        container
                        direction="column"
                        lg={6}
                        md={6}
                        xs={6}
                        p={1}
                    >
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                            sx={{color: "gray"}}
                        >
                            <span style={{fontWeight: "bolder"}}>
                                Date Created:
                            </span>{" "}
                            {creationDate.slice(0, 33)}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                            sx={{color: "gray"}}
                        >
                            <span style={{fontWeight: "bolder"}}>
                                Deadline:
                            </span>{" "}
                            {deadlineDate.slice(0, 33)}
                        </Typography>
                        <Grid item container direction="row" justifyContent="flex-start">
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                                sx={{color: "gray"}}
                            >
                            <span style={{fontWeight: "bolder"}}>
                                Owner Address:
                            </span>{" "}
                            </Typography>
                            <Tooltip title="Copy Owner Address">
                                <Button onClick={ownerClicked} color="success" sx={{width: "30%", paddingLeft: 5}}>
                                    {ownerText}
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item container direction="row" justifyContent="flex-start" sx={{paddingTop: 3, width: "65%"}}>
                            <Grid item container direction="row" justifyContent="flex-start" sx={{width: "22%"}}>
                                <Tooltip title={props.yesCount + " vote(s)"}>
                                    <Grid item container
                                          sx={{
                                              width: "15px",
                                              height: "15px",
                                              // @ts-ignore
                                              backgroundColor: context.colors.yes,
                                              marginRight: 1,
                                          }}
                                    />
                                </Tooltip>
                                <Typography
                                    variant="overline"
                                    gutterBottom
                                    component="div"
                                    sx={{color: "gray", marginTop: -1}}
                                >
                                    Yes
                                </Typography>
                            </Grid>
                            <Grid item container direction="row" justifyContent="flex-start" sx={{width: "22%"}}>
                                <Tooltip title={props.noCount + " vote(s)"}>
                                    <Grid item container
                                          sx={{
                                              width: "15px",
                                              height: "15px",
                                              //@ts-ignore
                                              backgroundColor: context.colors.no,
                                              marginRight: 1,
                                          }}
                                    />
                                </Tooltip>
                                <Typography
                                    variant="overline"
                                    gutterBottom
                                    component="div"
                                    sx={{color: "gray", marginTop: -1}}
                                >
                                    No
                                </Typography>
                            </Grid>
                            <Grid item container direction="row" justifyContent="flex-start" sx={{width: "22%"}}>
                                <Tooltip title={props.nwvCount + " vote(s)"}>
                                    <Grid item container
                                          sx={{
                                              width: "15px",
                                              height: "15px",
                                              //@ts-ignore
                                              backgroundColor: context.colors.nwv,
                                              marginRight: 1,
                                          }}
                                    />
                                </Tooltip>
                                <Typography
                                    variant="overline"
                                    gutterBottom
                                    component="div"
                                    sx={{color: "gray", marginTop: -1}}
                                >
                                    Veto
                                </Typography>
                            </Grid>
                            <Grid item container direction="row" justifyContent="flex-start" sx={{width: "30%"}}>
                                <Tooltip title={props.abstainCount + " vote(s)"}>
                                    <Grid item container
                                          sx={{
                                              width: "15px",
                                              height: "15px",
                                              //@ts-ignore
                                              backgroundColor: context.colors.abstain,
                                              marginRight: 1,
                                          }}
                                    />
                                </Tooltip>
                                <Typography
                                    variant="overline"
                                    gutterBottom
                                    component="div"
                                    sx={{color: "gray", marginTop: -1}}
                                >
                                    Abstain
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <VotingChart
                            yesCount={props.yesCount}
                            noCount={props.noCount}
                            nwvCount={props.nwvCount}
                            abstainCount={props.abstainCount}
                        />
                    </Grid>
                </Grid>
            )}
            {isFlipped && (
                <Grid height={250} onClick={flip} justifyContent="center">
                    <Paper
                        elevation={24}
                        style={{height: 250, overflow: "auto"}}
                    >
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
            )}
            {voteFlag ?
                <Grid direction="row" container justifyContent="center">
                    <CircularProgress color="secondary"/>
                </Grid>
                :
                <Button disabled={boxState === "Expired"} color="success" onClick={handleClickOpen} sx={{marginTop: 3}}>
                    VOTE FOR THIS VOTEBOX
                </Button>
            }
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
