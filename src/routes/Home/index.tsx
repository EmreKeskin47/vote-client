import {Grid, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import Logo from "./logo.png";
import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListResponseItem from "../../components/ListResponseItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import singleContext from "../../SingleContext";
import CubeItem from "../../components/Cube";


const Home = () => {
    const [recentsFlag, setRecentsFlag] = useState(false);
    const [idArray, setIdArray] = useState([]);
    const [yesCountArray, setYesCountArray] = useState([]);
    const [noCountArray, setNoCountArray] = useState([]);
    const [ownerArray, setOwnerArray] = useState([]);
    const [deadlineArray, setDeadlineArray] = useState([]);
    const [topicArray, setTopicArray] = useState([]);

    const context = useContext(singleContext);

    const CONTRACT_ADDRESS =
        "juno1asxh2ydzpujch7l7hguzejfjlfadxjydnpqcf4vdve90x2frqh3s8f9hmx";

    useEffect(() => {
        getVBCount();
    }, []);

    let mockClient: CosmWasmClient;

    const getVBCount = async () => {
        let startCount = 1;
        try {
            // client = wallet.getClient()
            mockClient = await CosmWasmClient.connect("https://rpc.uni.juno.deuslabs.fi");

            const queryResponse = await mockClient.queryContractSmart(
                CONTRACT_ADDRESS,
                {
                    get_votebox_count: {},
                }
            );
            startCount = queryResponse.count;
            startCount -= 10;
            if (startCount < 1)
                startCount = 1;
            queryList(startCount);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            context.updateCount(Number(queryResponse.count));
            setRecentsFlag(true);
        } catch (error: any) {
            toast.error(error.message, {style: {maxWidth: 'none'}})
        }
    };

    const queryList = async (boxId: number) => {
        try {
            // client = wallet.getClient()
            mockClient = await CosmWasmClient.connect("https://rpc.uni.juno.deuslabs.fi");
            // const account = wallet.address//(await signer.getAccounts())[0];
            // console.log("account: ");
            // console.log(account);

            const queryResponse = await mockClient.queryContractSmart(
                CONTRACT_ADDRESS,
                {
                    get_list: {start_after: boxId},
                }
            );
            for (let i = 0; i < queryResponse.voteList.length; i++) {

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
                setOwnerArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].owner,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setDeadlineArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].deadline.at_height,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTopicArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].topic,
                ]);
            }
            // return queryResponse
        } catch (error: any) {
            toast.error(error.message, {style: {maxWidth: 'none'}})
        }
    };

    const showRecentsClicked = () => {
        setRecentsFlag(true);
    }

    const hideRecentsClicked = () => {
        setRecentsFlag(false);
    }

    return (
        <Grid container sm={12} justifySelf="center" justifyItems="center">
            <Grid
                item
                xs={12}
                sx={{
                    justifyContent: "center !important",
                    display: "inline-grid",
                }}
            >
                <img
                    src={Logo}
                    alt="logo"
                    width={400}
                    height={400}
                    style={{
                        border: "3px solid gray",
                        borderRadius: "7px 7px 7px 7px",
                    }}
                />
            </Grid>

            <Grid>
                <Typography
                    variant="h3"
                    sx={{
                        color: "whitesmoke",
                        paddingTop: "30px",
                        textAlign: "center",
                    }}
                >
                    Welcome to VoteBox!
                </Typography>

                <Typography
                    variant="h5"
                    sx={{color: "whitesmoke", textAlign: "center"}}
                    marginTop={5}
                >
                    With VoteBox, you can create your own vote boxes and people
                    from all around the world can participate in the voting
                    process with total anonymity.
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: "whitesmoke",
                        textAlign: "center",
                    }}
                    marginTop={5}
                >
                    Let&apos;s start with your first VoteBox!
                </Typography>
            </Grid>
            <Button color="secondary" onClick={showRecentsClicked} sx={{marginBottom: "30px"}}>
                <KeyboardArrowDownIcon/>
                {/*@ts-ignore*/}
                Show Recent VoteBoxes
            </Button>
            {/*@ts-ignore*/}
            {recentsFlag &&
                <>
                    {/*{idArray.map((item: any, index: number) => {*/}
                    {/*    return (*/}
                    {/*        <ListResponseItem*/}
                    {/*            key={index}*/}
                    {/*            id={idArray[index]}*/}
                    {/*            topic={topicArray[index]}*/}
                    {/*            yesCount={yesCountArray[index]}*/}
                    {/*            noCount={noCountArray[index]}*/}
                    {/*            owner={ownerArray[index]}*/}
                    {/*            deadline={deadlineArray[index]}*/}
                    {/*        />*/}
                    {/*    );*/}
                    {/*})}*/}
                    {idArray.map((item: any, index: number) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <Grid container direction="row" justifyContent="space-between" p={5}>
                                <CubeItem
                                    key={index}
                                    id={idArray[index]}
                                    topic={topicArray[index]}
                                    yesCount={yesCountArray[index]}
                                    noCount={noCountArray[index]}
                                    owner={ownerArray[index]}
                                    deadline={deadlineArray[index]}
                                />
                            </Grid>
                        );
                    })}
                    <Button color="secondary" onClick={hideRecentsClicked}>
                        <KeyboardArrowUpIcon/>
                        Hide Recent VoteBoxes
                    </Button>
                </>
            }
        </Grid>
    );
};

export default Home;
