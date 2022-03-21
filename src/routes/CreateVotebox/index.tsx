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
import debounce from "lodash.debounce";

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

const CreateVotebox = () => {
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
                        executeResponse.logs[0].events[2].attributes[2].value +
                        " | Your TxHash : " +
                        executeResponse.transactionHash
                );

                setCreateVoteBoxResponseFlag(true);
            }
            setFlag(false);
        } catch (error: any) {
            if (error.message.includes("topic already exists")) {
                toast.error("A VoteBox with the same topic already exists.", {
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
            
            console.log("Wallet: " + wallet.address);
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
                setVoteboxList([]);
                queryResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxList((prevState) => [...prevState, votebox])
                );
            }
            if(queryResponse.voteList == 0 && wallet.initialized){
                toast.error("You haven't created any VoteBoxes yet.", { icon:'🥸', position:"top-right", style: { maxWidth: "none"} });
            }
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
        }
    };

    //////////////////////////////// UI ////////////////////////////
    const [flag, setFlag] = useState(false);
    const [createVoteBoxResponseFlag, setCreateVoteBoxResponseFlag] =
        useState(false);
    const [createVoteBoxResponse, setCreateVoteBoxResponse] = useState("");
    const [resetVoteBoxResponse, setResetVoteBoxResponse] = useState("");
    const [deleteVoteBoxResponse, setDeleteVoteBoxResponse] = useState("");

    useEffect(() => {
        queryMyList();
    }, [
        wallet.initialized,
        wallet.address,
        createVoteBoxResponse,
        resetVoteBoxResponse,
        deleteVoteBoxResponse,
    ]);

    const resetFlags = (type: string) => {
        if (type === "create") {
            setCreateVoteBoxResponseFlag(false);
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
                toast.success("Reset successful", {
                    style: { maxWidth: "none" },
                });
                setResetVoteBoxResponse(res.transactionHash);
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
            
            if (res !== undefined) {
                toast.success("VoteBox deleted.", {
                    style: { maxWidth: "none" },
                });
                setDeleteVoteBoxResponse(res.transactionHash);
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
            
            {wallet.initialized && voteboxList.length > 0 && (
                <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                    sx={{ color: "whitesmoke" }}
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
                                    dateCreated={item.create_date}
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

export default CreateVotebox;
