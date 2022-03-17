import { makeCosmoshubPath } from "@cosmjs/amino";
import {
    CosmWasmClient,
    SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import React, { useEffect, useContext, useState } from "react";
import { useWallet } from "../../contexts/wallet";
import { Grid } from "@mui/material";
import CreateVoteBox from "../../components/CreateVoteBox";
import QueryBox from "../../components/QueryBox";
import Voting from "../../components/Voting";
import Typography from "@mui/material/Typography";
import ListResponseItem from "../../components/ListResponseItem";
import toast from "react-hot-toast";
import CustomAlert from "../../components/CustomAlert";
import singleContext from "../../SingleContext";
import { Votebox } from "../../models/Votebox";

////////////////////////Wallet//////////////////////////////////
const walletOptions = {
    hdPaths: [makeCosmoshubPath(0)],
    prefix: "juno",
};

export const getSigner = async (mnemonic: string) => {
    const signer = await DirectSecp256k1HdWallet.fromMnemonic(
        mnemonic,
        walletOptions
    );
    return signer;
};
////////////////////////Wallet//////////////////////////////////

const Vote = () => {
    const context = useContext(singleContext);
    const wallet = useWallet();
    let client: SigningCosmWasmClient;

    const createVB = async (
        time: number,
        topic: string,
        description: string
    ) => {
        try {
            setFlag(true);
            console.log("createVB() -> time: ");
            console.log(time);
            client = wallet.getClient();

            const account = wallet.address;
            console.log("account: ");
            console.log(account);

            let currentTimeInNanoSeconds = (
                new Date().getTime() * 1000000
            ).toString();
            // const executeResponse = await client.execute(
            //     wallet.address,
            //     "juno1x2fa4h4wpvh7mu3a99txsyshgprrwx0f73jngseuydcfhw4hanwsuetldp",
            //     {
            //         create_vote_box: {
            //             deadline: { at_time: time.toString() },
            //             owner: wallet.address,
            //             topic: topic,
            //         },
            //     },
            //     "auto"
            // );
            const executeResponse = await client.execute(
                wallet.address,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.contractAdress,
                {
                    create_vote_box: {
                        deadline: { at_time: time.toString() },
                        owner: wallet.address,
                        topic: topic,
                        description: description,
                        create_date: currentTimeInNanoSeconds,
                    },
                },
                "auto"
            );
            console.log(executeResponse);
            if (executeResponse === undefined) {
                alert("Something went wrong with the VoteBox creation");
            } else {
                setCreateVoteBoxResponse(
                    "VoteBox ID: " +
                        executeResponse.logs[0].events[2].attributes[5].value +
                        " | Your TxHash : " +
                        executeResponse.transactionHash
                );

                setCreateVoteBoxResponseFlag(true);
            }
            setFlag(false);
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
        }
    };

    const vote = async (voteId: string, voteType: Number, decision: string) => {
        try {
            setFlag2(true);
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
            console.log(executeResponse);
            if (executeResponse === undefined) {
                alert("Something went wrong");
            } else {
                setVoteResponse("You have voted " + decision);
                setVoteResponseFlag(true);
            }
            setFlag2(false);
        } catch (error: any) {
            let errMessage: String = error.message;
            if (errMessage.includes("ended")) {
                toast.error("The voting period has ended for this VoteBox.", {
                    style: { maxWidth: "none" },
                });
            } else if (errMessage.includes("already")) {
                toast.error("You may only vote once per VoteBox.", {
                    style: { maxWidth: "none" },
                });
            } else {
                toast.error(error.message, { style: { maxWidth: "none" } });
            }
            // toast.error(
            //     "Something went wrong.\nYou have tried to vote for an expired contract.",
            //     { style: { maxWidth: "none" } }
            // );
            setFlag2(false);
        }
    };

    const query = async (boxId: string) => {
        try {
            setFlag3(true);
            client = wallet.getClient();

            const account = wallet.address; //(await signer.getAccounts())[0];
            console.log("account: ");
            console.log(account);

            const id = Number(boxId) + 1;

            const queryResponse = await client.queryContractSmart(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.contractAdress,
                {
                    query_vote: { id: id.toString() },
                }
            );
            console.log(queryResponse);
            setResponse(
                "ID : " +
                    queryResponse.id +
                    "\nOwner : " +
                    queryResponse.owner +
                    "\nTopic : " +
                    queryResponse.topic +
                    "\nYes Count : " +
                    queryResponse.yes_count +
                    "\nNo Count : " +
                    queryResponse.no_count +
                    "\nAbstain Count : " +
                    queryResponse.abstain_count +
                    "\nNo with Veto Count : " +
                    queryResponse.no_with_veto_count +
                    "\nDeadline Time : " +
                    new Date(parseInt(queryResponse.deadline.at_time) / 1000000)
            );
            setQueryResponseFlag(true);
            setFlag3(false);
        } catch (error: any) {
            if (error.message.includes("Vote not found")) {
                toast.error("No VoteBox found with the specified ID.", {
                    style: { maxWidth: "none" },
                });
            } else {
                toast.error(error.message, { style: { maxWidth: "none" } });
            }
        }
    };

    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);
    
    let mockClient: CosmWasmClient;
    //Query the VoteBoxes owned by the wallet address
    const queryMyList = async () => {
        try {
            setVoteboxList([]);
           
            mockClient = await CosmWasmClient.connect(
                "https://rpc.uni.juno.deuslabs.fi"
            );
            // const account = wallet.address//(await signer.getAccounts())[0];

            const queryResponse = await mockClient.queryContractSmart(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.contractAdress,
                {
                    get_voteboxes_by_owner: { owner: wallet.address },
                }
            );
            if (queryResponse.voteList) {
                queryResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxList((prevState) => [...prevState, votebox])
                );
            }
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
        }
    };

    //////////////////////////////// UI ////////////////////////////
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(true);
    const [queryResponseFlag, setQueryResponseFlag] = useState(false);
    const [response, setResponse] = useState("");
    const [createVoteBoxResponseFlag, setCreateVoteBoxResponseFlag] =
        useState(false);
    const [createVoteBoxResponse, setCreateVoteBoxResponse] = useState("");
    const [resetVoteBoxResponse, setResetVoteBoxResponse] = useState("");
    const [deleteVoteBoxResponse, setDeleteVoteBoxResponse] = useState("");
    const [voteResponse, setVoteResponse] = useState("");
    const [voteResponseFlag, setVoteResponseFlag] = useState(false);

    useEffect(() => {
        queryMyList();
    }, [
        wallet.initialized,
        wallet.address,
        createVoteBoxResponse,
        voteResponse,
        resetVoteBoxResponse,
        deleteVoteBoxResponse,

    ]);

    const resetFlags = (type: string) => {
        if (type === "create") {
            setCreateVoteBoxResponseFlag(false);
        } else if (type === "vote") {
            setVoteResponseFlag(false);
        } else if (type === "query") {
            setQueryResponseFlag(false);
        }
    };
    const resetVote = async (id: string) => {
        try {
            client = wallet.getClient();
            const res = await client.execute(
                wallet.address,
                // @ts-ignore
                context.contractAdress,
                {
                    vote_reset: {
                        id: id,
                    },
                },
                "auto"
            );
            if (res !== undefined) {
                setResetVoteBoxResponse(res.transactionHash);
                alert("Reset Successfully");
            }
        } catch (err: any) {
            toast.error(err.message, { style: { maxWidth: "none" } });
        }
    };

    const deleteVoteBox = async (id: string) => {
        try {
            client = wallet.getClient();
            const res = await client.execute(
                wallet.address,
                // @ts-ignore
                context.contractAdress,
                {
                    vote_remove: {
                        id: id,
                    },
                },
                "auto"
            );
            console.log("delete response", res);
            if (res !== undefined) {
                setDeleteVoteBoxResponse(res.transactionHash);
                alert("Deleted successfully ");
            }
        } catch (err: any) {
            toast.error(err.message, { style: { maxWidth: "none" } });
        }
    };

    return (
        <Grid container>
            {/*@ts-ignore*/}
            <CreateVoteBox function={createVB} />
            {createVoteBoxResponseFlag && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <CustomAlert
                    severity="success"
                    text={createVoteBoxResponse}
                    function={() => resetFlags("create")}
                />
            )}
            {flag && (
                <Typography
                    variant="overline"
                    gutterBottom
                    component="div"
                    sx={{ color: "gray" }}
                >
                    Creating the votebox...
                </Typography>
            )}
            <br />
            <Voting function={vote} />
            {voteResponseFlag && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <CustomAlert
                    severity="success"
                    text={voteResponse}
                    function={() => resetFlags("vote")}
                />
            )}
            {flag2 && (
                <Typography
                    variant="overline"
                    gutterBottom
                    component="div"
                    sx={{ color: "gray" }}
                >
                    Voting...
                </Typography>
            )}
            <br />
            <QueryBox
                function={query}
                heading="Query VoteBox"
                subHeading="Enter the id of the box"
                idText="VoteBox ID"
                buttonText="Query VoteBox"
            />
            {queryResponseFlag && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <CustomAlert
                    severity="success"
                    text={response}
                    function={() => resetFlags("query")}
                />
            )}
            {wallet.initialized && (
                <Typography
                    variant="overline"
                    gutterBottom
                    component="div"
                    sx={{ color: "gray" }}
                >
                    Your VoteBoxes:
                </Typography>
            )}
            <br />
            {/*@ts-ignore*/}
            {wallet.initialized && voteboxList.length > 0 && (
                <Grid container direction="row" spacing={2} p={3}>
                    {voteboxList.map((item: any, index: number) => {
                    return (
                            <Grid key={index} item xs={12} md={6} lg={6}>
                                <ListResponseItem
                                   key={index}
                                   id={item.id}
                                   topic={item.topic}
                                   yesCount={item.yesCount}
                                   noCount={item.noCount}
                                   abstainCount={item.abstain_count}
                                   nwvCount={item.no_with_vote_count}
                                   description={item.description}
                                   owner={item.owner}
                                   deadline={item.deadline.at_height}
                                   deadlineNum={item.deadline.at_time}
                                   reset={resetVote}
                                   delete={deleteVoteBox}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Grid>
    );
};

export default Vote;
