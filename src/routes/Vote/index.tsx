import { makeCosmoshubPath } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import React, { useState } from "react";
import { useWallet } from '../../contexts/wallet'
import { Grid } from "@mui/material";
import CreateVoteBox from "../../components/CreateVoteBox";
import QueryBox from "../../components/QueryBox";
import Voting from "../../components/Voting";
import ListResponseItem from "../../components/ListResponseItem";
import Typography from "@mui/material/Typography";
import toast from 'react-hot-toast'
import CustomAlert from "../../components/CustomAlert";

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
    const wallet = useWallet()

    const CONTRACT_ADDRESS =
        "juno1vknw4cnp6g2eh8mzthdlgr759prhtypa3r6pgmgj4naxtcakqkes5zxuuk";

    let client: SigningCosmWasmClient;


    const createVB = async (height: Number, topic: string) => {
        try{
        setFlag(true);

        client = wallet.getClient()
        
        const account = wallet.address
        console.log("account: ");
        console.log(account);

        const executeResponse = await client.execute(
            wallet.address,
            CONTRACT_ADDRESS,
            {
                create_vote_box: {
                    deadline: { at_height: height },
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
            setCreateVoteBoxResponse("Your txhash : " + executeResponse.transactionHash);
            setCreateVoteBoxResponseFlag(true);
        }
        setFlag(false);
    }
    catch(error: any) {
        toast.error(error.message, { style: { maxWidth: 'none' } })
      }
    };

    const vote = async (
        voteId: string,
        voteFlag: boolean,
        decision: string
    ) => {
        try{

        setFlag2(true);
        client = wallet.getClient()
        const account = wallet.address//(await signer.getAccounts())[0];
        console.log("account: ");
        console.log(account);

        const executeResponse = await client.execute(
            wallet.address,
            CONTRACT_ADDRESS,
            {
                vote: {
                    id: voteId,
                    vote: voteFlag,
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
    }
    catch(error: any) {
        // toast.error(error.message, { style: { maxWidth: 'none' } });
        toast.error("Something went wrong.\nYou may have tried to vote for an expired contract.", {style: {maxWidth: 'none'}});
        setFlag2(false);
      }
    };

    const query = async (boxId: string) => {
        try{
        setFlag3(true);
        client = wallet.getClient()

        const account = wallet.address//(await signer.getAccounts())[0];
        console.log("account: ");
        console.log(account);

        let id = Number(boxId) + 1;

        const queryResponse = await client.queryContractSmart(
            CONTRACT_ADDRESS,
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
            "\ndeadline block : " +
            queryResponse.deadline.at_height
        );
        setQueryResponseFlag(true);
        setFlag3(false);
        }
        catch(error: any) {
            toast.error(error.message, { style: { maxWidth: 'none' } })
          }
    };

    const queryList = async (boxId: string) => {
        try{
        setFlag4(true);

        client = wallet.getClient()
        const account = wallet.address//(await signer.getAccounts())[0];
        console.log("account: ");
        console.log(account);

        const queryResponse = await client.queryContractSmart(
            CONTRACT_ADDRESS,
            {
                get_list: { start_after: Number(boxId) },
            }
        );
        for (let i = 0; i < queryResponse.voteList.length; i++) {
            // @ts-ignore
            setIdArray((oldArray) => [
                ...oldArray,
                queryResponse.voteList[i].id,
            ]);
            // @ts-ignore
            setYesCountArray((oldArray) => [
                ...oldArray,
                queryResponse.voteList[i].yes_count,
            ]);
            // @ts-ignore
            setNoCountArray((oldArray) => [
                ...oldArray,
                queryResponse.voteList[i].no_count,
            ]);
            // @ts-ignore
            setOwnerArray((oldArray) => [
                ...oldArray,
                queryResponse.voteList[i].owner,
            ]);
            // @ts-ignore
            setDeadlineArray((oldArray) => [
                ...oldArray,
                queryResponse.voteList[i].deadline.at_height,
            ]);
            // @ts-ignore
            setTopicArray((oldArray) => [
                ...oldArray,
                queryResponse.voteList[i].topic,
            ]);
        }
        setFlag4(false);
        setFlag5(true);
        // return queryResponse
    }catch(error: any) {
        toast.error(error.message, { style: { maxWidth: 'none' } })
    }
    };

    //////////////////////////////// UI ////////////////////////////
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(false);
    const [flag4, setFlag4] = useState(false);
    const [queryResponseFlag, setQueryResponseFlag] = useState(false);
    const [response, setResponse] = useState("");
    const [createVoteBoxResponseFlag, setCreateVoteBoxResponseFlag] = useState(false);
    const [createVoteBoxResponse, setCreateVoteBoxResponse] = useState("");
    const [voteResponse, setVoteResponse] = useState("");
    const [voteResponseFlag, setVoteResponseFlag] = useState(false);
    // eslint-disable-next-line
    const [flag5, setFlag5] = useState(false);
    const [idArray, setIdArray] = useState([]);
    const [yesCountArray, setYesCountArray] = useState([]);
    const [noCountArray, setNoCountArray] = useState([]);
    const [ownerArray, setOwnerArray] = useState([]);
    const [deadlineArray, setDeadlineArray] = useState([]);
    const [topicArray, setTopicArray] = useState([]);

    const resetFlags = (type: string) => {
        if (type === "create") {
            setCreateVoteBoxResponseFlag(false);
        } else if (type === "vote") {
            setVoteResponseFlag(false);
        } else if (type === "query") {
            setQueryResponseFlag(false);
        }
    }

    return (
        <Grid container>
            {/*@ts-ignore*/}
            <CreateVoteBox function={createVB} />
            {createVoteBoxResponseFlag &&
                // @ts-ignore
                <CustomAlert severity="success" text={createVoteBoxResponse} function={resetFlags} type="create" />
            }
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
            {voteResponseFlag &&
                // @ts-ignore
                <CustomAlert severity="success" text={voteResponse} function={resetFlags} type="vote"/>
            }
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
            {queryResponseFlag &&
                // @ts-ignore
                <CustomAlert severity="success" text={response} function={resetFlags} type="query"/>
            }
            {flag3 && (
                <Typography
                    variant="overline"
                    gutterBottom
                    component="div"
                    sx={{ color: "gray" }}
                >
                    Getting results...
                </Typography>
            )}
            <br />
            <QueryBox
                function={queryList}
                heading="Query VoteBox List"
                subHeading="Enter the id that the list of VoteBoxes will start from"
                idText="Starting VoteBox ID"
                buttonText="Query VoteBox List"
            />
            {flag4 && (
                <Typography
                    variant="overline"
                    gutterBottom
                    component="div"
                    sx={{ color: "gray" }}
                >
                    Getting the list of results...
                </Typography>
            )}
            {idArray.map((item, index) => {
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
        </Grid>
    );
};

export default Vote;
