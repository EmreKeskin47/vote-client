import {Button, Grid, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import Logo from "./logo.png";
import {CosmWasmClient, SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import toast from "react-hot-toast";
import ListResponseItem from "../../components/ListResponseItem";
import singleContext from "../../SingleContext";
import {useWallet} from "../../contexts/wallet";

const Home = () => {
    const [recentsFlag, setRecentsFlag] = useState(false);
    const [idArray, setIdArray] = useState([]);
    const [yesCountArray, setYesCountArray] = useState([]);
    const [noCountArray, setNoCountArray] = useState([]);
    const [ownerArray, setOwnerArray] = useState([]);
    const [deadlineArray, setDeadlineArray] = useState([]);
    const [topicArray, setTopicArray] = useState([]);
    const [abstainArray, setAbstainArray] = useState([]);
    const [nwvArray, setNwvArray] = useState([]);
    const [deadlineNum, setDeadlineNum] = useState(0);

    const context = useContext(singleContext);
    const wallet = useWallet();
    let client: SigningCosmWasmClient;

    useEffect(() => {
        getVBCount();
    }, []);

    let mockClient: CosmWasmClient;

    const getVBCount = async () => {
        let startCount = 1;
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockClient = await CosmWasmClient.connect(context.testUrl);

            const queryResponse = await mockClient.queryContractSmart(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.contractAdress,
                {
                    get_votebox_count: {},
                }
            );
            startCount = queryResponse.count;
            startCount -= 10;
            if (startCount < 1) startCount = 1;
            queryList(startCount);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            context.updateCount(Number(queryResponse.count));
            setRecentsFlag(true);
        } catch (error: any) {
            toast.error(error.message, {style: {maxWidth: "none"}});
        }
    };

    const vote = async (voteId: string, voteType: Number) => {
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
                        option = "no";
                        break;
                    case 1:
                        option = "abstain";
                        break;
                    case 2:
                        option = "yes";
                        break;
                    case 3:
                        option = "no with vote";
                        break;
                    default:
                        break;
                }
                toast.success("You have voted: " + option, {style: {maxWidth: "none"}});
            }
        } catch (error: any) {
            let errMessage: String = error.message;
            if(errMessage.includes("ended")){
                toast.error("The voting period has ended for this VoteBox.", { style: { maxWidth: 'none' } });
            }
            else if(errMessage.includes("already")){
                toast.error("You may only vote once per VoteBox.", { style: { maxWidth: 'none' } });
            }
            else{
                toast.error(error.message, { style: { maxWidth: 'none' } });
            }
            
        }
    };


    const queryList = async (boxId: number) => {
        try {

            mockClient = await CosmWasmClient.connect(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.testUrl
            );

            const queryResponse = await mockClient.queryContractSmart(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                context.contractAdress,
                {
                    get_list: {start_after: boxId},
                }
            );
            for (let i = 0; i < queryResponse.voteList.length; i++) {
                setDeadlineNum(queryResponse.voteList[i].deadline.at_time)
                let deadlineDate: String = new Date(
                    parseInt(queryResponse.voteList[i].deadline.at_time) /
                    1000000
                ).toString();
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
                setDeadlineArray((oldArray) => [...oldArray, deadlineDate]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTopicArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].topic,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setAbstainArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].abstain_count,
                ]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setNwvArray((oldArray) => [
                    ...oldArray,
                    queryResponse.voteList[i].vote_with_veto_count,
                ]);
            }
            // return queryResponse
        } catch (error: any) {
            toast.error(error.message, {style: {maxWidth: "none"}});
        }
    };

    // @ts-ignore
    return (
        <Grid
            container
            sx={{width: "100%"}}
            justifySelf="center"
            justifyItems="center"
        >
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
            <Grid direction="column" justifyContent="center">
                <Typography
                    variant="h4"
                    sx={{
                        color: "whitesmoke",
                    }}
                    marginTop={10}
                >
                    Recent Voteboxes
                </Typography>
                <Typography
                    variant="overline"
                    sx={{
                        color: "whitesmoke",
                    }}
                    marginTop={10}
                >
                    Click on the VoteBoxes for description
                </Typography>
            </Grid>

            {recentsFlag && (
                <Grid container direction="row" spacing={2} p={3}>
                    {idArray.map((item: any, index: number) => {
                        return (
                            <Grid key={index} item xs={12} md={6} lg={6}>
                                <ListResponseItem
                                    key={index}
                                    id={idArray[index]}
                                    topic={topicArray[index]}
                                    yesCount={Number(yesCountArray[index])}
                                    noCount={Number(noCountArray[index])}
                                    owner={ownerArray[index]}
                                    deadline={deadlineArray[index]}
                                    deadlineNum={deadlineNum}
                                    abstainCount={Number(abstainArray[index])}
                                    nwvCount={Number(nwvArray[index])}
                                    function={vote}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Grid>
    );
};

export default Home;
