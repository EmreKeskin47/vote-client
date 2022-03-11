import { makeCosmoshubPath } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import CreateVoteBox from "../../components/CreateVoteBox";
import QueryBox from "../../components/QueryBox";
import Voting from "../../components/Voting";
import ListResponseItem from "../../components/ListResponseItem";
import Typography from "@mui/material/Typography";

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
    const IS_TESTNET = !process.argv.includes("--mainnet");

    const JUNO_MAINNET_RPC = "https://rpc.juno-1.deuslabs.fi";
    const JUNO_TESTNET_RPC = "https://rpc.uni.juno.deuslabs.fi";

    //Transaction signlamak icin
    const MNEMONIC =
        "term kangaroo lonely pact dove kiwi attitude swim deliver giggle resist pride similar turtle chicken sport phone foam mail wall account large settle firm";

    const CONTRACT_ADDRESS =
        //Votebox contract adress
        "juno13qcfy3tlrs20430cx28w76c4fjlzsmhj9d0decyy30m5jsh70cps22vc06";
    //Serkan Abi Lockbox contract adress
    // "juno16u4knekeyqqs45ywxejm4x9v0m6rsy0xp5vlahrc5a0gp7sm78ks87gqw9"

    let signer: DirectSecp256k1HdWallet;
    let client: SigningCosmWasmClient;

    // const querySmartContract = async (message: Record<string, unknown>) => {
    //     client.queryContractSmart(CONTRACT_ADDRESS, message)
    // }

    const createVB = async (height: Number) => {
        setFlag(true);
        signer = await getSigner(MNEMONIC);

        client = await SigningCosmWasmClient.connectWithSigner(
            IS_TESTNET ? JUNO_TESTNET_RPC : JUNO_MAINNET_RPC,
            signer,
            {
                prefix: "juno",
                gasPrice: GasPrice.fromString("0.0025ujunox"),
            }
        );

        const account = (await signer.getAccounts())[0];
        console.log("account: ");
        console.log(account);

        const executeResponse = await client.execute(
            account.address,
            CONTRACT_ADDRESS,
            {
                create_vote_box: {
                    deadline: { at_height: height },
                    owner: account.address,
                },
            },
            "auto"
        );
        console.log(executeResponse);
        if (executeResponse === undefined) {
            alert("Something went wrong with the VoteBox creation");
        } else {
            alert("Your txhash : " + executeResponse.transactionHash);
        }
        setFlag(false);
    };

    const vote = async (
        voteId: string,
        voteFlag: boolean,
        decision: string
    ) => {
        setFlag2(true);
        signer = await getSigner(MNEMONIC);

        client = await SigningCosmWasmClient.connectWithSigner(
            IS_TESTNET ? JUNO_TESTNET_RPC : JUNO_MAINNET_RPC,
            signer,
            {
                prefix: "juno",
                gasPrice: GasPrice.fromString("0.0025ujunox"),
            }
        );

        const account = (await signer.getAccounts())[0];
        console.log("account: ");
        console.log(account);

        const executeResponse = await client.execute(
            account.address,
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
            alert("You have voted " + decision);
        }
        setFlag2(false);
    };

    const query = async (boxId: string) => {
        setFlag3(true);

        signer = await getSigner(MNEMONIC);

        client = await SigningCosmWasmClient.connectWithSigner(
            IS_TESTNET ? JUNO_TESTNET_RPC : JUNO_MAINNET_RPC,
            signer,
            {
                prefix: "juno",
                gasPrice: GasPrice.fromString("0.0025ujunox"),
            }
        );

        const account = (await signer.getAccounts())[0];
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
        alert(
            "id : " +
                queryResponse.id +
                "\nowner : " +
                queryResponse.owner +
                "\nyes count : " +
                queryResponse.yes_count +
                "\nno count : " +
                queryResponse.no_count +
                "\ndeadline block : " +
                queryResponse.deadline.at_height
        );
        setFlag3(false);
    };

    const queryList = async (boxId: string) => {
        setFlag4(true);

        signer = await getSigner(MNEMONIC);

        client = await SigningCosmWasmClient.connectWithSigner(
            IS_TESTNET ? JUNO_TESTNET_RPC : JUNO_MAINNET_RPC,
            signer,
            {
                prefix: "juno",
                gasPrice: GasPrice.fromString("0.0025ujunox"),
            }
        );

        const account = (await signer.getAccounts())[0];
        console.log("account: ");
        console.log(account);

        const queryResponse = await client.queryContractSmart(
            CONTRACT_ADDRESS,
            {
                get_list: { start_after: Number(boxId) },
            }
        );
        for (let i = 0; i < 10; i++) {
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
        }
        setFlag4(false);
        setFlag5(true);
        // return queryResponse
    };

    //////////////////////////////// UI ////////////////////////////
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(false);
    const [flag4, setFlag4] = useState(false);
    // eslint-disable-next-line
    const [flag5, setFlag5] = useState(false);
    const [idArray, setIdArray] = useState([]);
    const [yesCountArray, setYesCountArray] = useState([]);
    const [noCountArray, setNoCountArray] = useState([]);
    const [ownerArray, setOwnerArray] = useState([]);
    const [deadlineArray, setDeadlineArray] = useState([]);

    return (
        <Grid container>
            <CreateVoteBox function={createVB} />
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