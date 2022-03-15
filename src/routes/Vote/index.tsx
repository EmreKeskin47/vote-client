import { makeCosmoshubPath } from "@cosmjs/amino";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
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

    const createVB = async (time: number, topic: string) => {
        try {
            setFlag(true);
            console.log("createVB() -> time: ")
            console.log(time)
            client = wallet.getClient();

            const account = wallet.address;
            console.log("account: ");
            console.log(account);

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
                    },
                },
                "auto"
            );
            console.log(executeResponse);
            if (executeResponse === undefined) {
                alert("Something went wrong with the VoteBox creation");
            } else {
                setCreateVoteBoxResponse(
                    "VoteBox ID: " + executeResponse.logs[0].events[2].attributes[2].value + 
                    " | Your TxHash : " + executeResponse.transactionHash
                    );

                setCreateVoteBoxResponseFlag(true);
            }
            setFlag(false);
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
        }
    };

    const vote = async (
        voteId: string,
        voteType: Number,
        decision: string
    ) => {
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
            // toast.error(error.message, { style: { maxWidth: 'none' } });
            toast.error(
                "Something went wrong.\nYou may have tried to vote for an expired contract.",
                { style: { maxWidth: "none" } }
            );
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
                "id : " +
                    queryResponse.id +
                    "\nowner : " +
                    queryResponse.owner +
                    "\ntopic : " +
                    queryResponse.topic +
                    "\nyes count : " +
                    queryResponse.yes_count +
                    "\nno count : " +
                    queryResponse.no_count +
                    "\nabstain count : " +
                    queryResponse.abstain_count +
                    "\nno count : " +
                    queryResponse.no_with_veto_count +
                    "\ndeadline time : " +
                    new Date(parseInt(queryResponse.deadline.at_time)/1000000)
            );
            setQueryResponseFlag(true);
            setFlag3(false);
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
        }
    };

    const [idArray, setIdArray] = useState([]);
    const [yesCountArray, setYesCountArray] = useState([]);
    const [noCountArray, setNoCountArray] = useState([]);
    const [abstainCountArray, setAbstainCountArray] = useState([]);
    const [noWithVetoCountArray, setNoWithVetoCountArray] = useState([]);
    const [ownerArray, setOwnerArray] = useState([]);
    const [deadlineArray, setDeadlineArray] = useState([]);
    const [topicArray, setTopicArray] = useState([]);

 
    let mockClient: CosmWasmClient;
    //Query the VoteBoxes owned by the wallet address
    const queryMyList = async () => {
        try {
            setIdArray([]);
            setYesCountArray([]);
            setNoCountArray([]);
            setAbstainCountArray([]);
            setNoWithVetoCountArray([]);
            setOwnerArray([]);
            setDeadlineArray([]);
            setTopicArray([]);
           // setQueryMyListFlag(true);
            // client = wallet.getClient()
            mockClient = await CosmWasmClient.connect("https://rpc.uni.juno.deuslabs.fi");
            // const account = wallet.address//(await signer.getAccounts())[0];
           
            const queryResponse = await mockClient.queryContractSmart(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.contractAdress,
                {
                    get_voteboxes_by_owner: {owner: wallet.address},
                }
            );
            for (let i = 0; i < queryResponse.voteList.length; i++) {
                let deadlineDate: String = new Date(parseInt(queryResponse.voteList[i].deadline.at_time)/1000000).toString()

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setIdArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].id,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setYesCountArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].yes_count,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setNoCountArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].no_count,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setAbstainCountArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].abstain_count,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setNoWithVetoCountArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].no_with_veto_count,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setOwnerArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].owner,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setDeadlineArray((oldArray) => [
                    ...oldArray,
                    deadlineDate,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTopicArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].topic,
                ]);
               // setQueryMyListFlag(false)
            }
            // return queryResponse
        } catch (error: any) {
            toast.error(error.message, {style: {maxWidth: 'none'}})
        }
    };

    //////////////////////////////// UI ////////////////////////////
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(true);
    const [queryMyListFlag, setQueryMyListFlag] = useState(true);
    const [queryResponseFlag, setQueryResponseFlag] = useState(false);
    const [response, setResponse] = useState("");
    const [createVoteBoxResponseFlag, setCreateVoteBoxResponseFlag] =
        useState(false);
    const [createVoteBoxResponse, setCreateVoteBoxResponse] = useState("");
    const [voteResponse, setVoteResponse] = useState("");
    const [voteResponseFlag, setVoteResponseFlag] = useState(false);

    useEffect(()=> {
        queryMyList();
    },[wallet.initialized, wallet.address, createVoteBoxResponse]);

    const resetFlags = (type: string) => {
        if (type === "create") {
            setCreateVoteBoxResponseFlag(false);
        } else if (type === "vote") {
            setVoteResponseFlag(false);
        } else if (type === "query") {
            setQueryResponseFlag(false);
        }
    };
    // const resetQueryMyListFlag= () =>{
    //     setQueryMyListFlag(true);
    // }

    
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
            {wallet.initialized  && (
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
            {wallet.initialized && queryMyListFlag &&
                <>
                    {idArray.map((item: any, index: number) => {
                        return (
                            <ListResponseItem
                                key={index}
                                id={idArray[index]}
                                topic={topicArray[index]}
                                yesCount={yesCountArray[index]}
                                noCount={noCountArray[index]}
                                owner={ownerArray[index]}
                                deadline={deadlineArray[index]}
                            />
                        );
                    })}
                </>
            }

        </Grid>
    );
};

export default Vote;
