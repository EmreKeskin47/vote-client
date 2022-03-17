import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import peopleAroundTable from "./peopleAroundTable.gif";
import {
    CosmWasmClient,
    SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import toast from "react-hot-toast";
import ListResponseItem from "../../components/ListResponseItem";
import singleContext from "../../SingleContext";
import { useWallet } from "../../contexts/wallet";
import { TypingEffect } from "react-typing-text-effect";
import {isMobile} from 'react-device-detect';
import { Votebox } from "../../models/Votebox";

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
    const [descriptionArray, setDescriptionArray] = useState([]);
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
            console.log("Query List Start Count " + startCount);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            context.updateCount(Number(queryResponse.count));
            setRecentsFlag(true);
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
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
                toast.success("You have voted: " + option, {
                    style: { maxWidth: "none" },
                });
            }
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
        }
    };

    const [listEnd, setListEnd] = useState(0);
    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);
    const [loadMoreBtn, setLoadMoreBtn] = useState(false);

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
                    get_list: { start_after: boxId - 1 },
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

    // @ts-ignore
    return (
        <Grid
            container
            sx={{ width: "100%" }}
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
                    src={peopleAroundTable}
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
                <Grid direction="column" justifyContent="center">
                    <Typography
                        variant="h3"
                        sx={{
                            color: "whitesmoke",
                            paddingTop: "30px",
                            textAlign: "center",
                            paddingBottom: 10,
                        }}
                    >
                        Welcome to VoteBox!
                    </Typography>
                    {isMobile &&
                        <TypingEffect
                            texts={[
                                "You know what",
                                "the world thinks.",
                                "Now it is time to",
                                "speak up your mind!",
                            ]}
                        />
                    }
                    {!isMobile &&
                        <TypingEffect
                            texts={[
                                "You know what the world thinks.",
                                "It is time to speak up your mind!",
                            ]}
                        />
                    }
                </Grid>
                <Typography
                    variant="h5"
                    sx={{ color: "whitesmoke", textAlign: "center" }}
                    paddingTop={10}
                >
                    With VoteBox, you can create your own VoteBoxes and people
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
                    Time to speak up your mind!
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

            {recentsFlag && voteboxList.length > 0 && (
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
                                    owner={item.owner}
                                    deadline={item.deadline.at_height}
                                    deadlineNum={item.deadline.at_time}
                                    abstainCount={item.abstain_count}
                                    nwvCount={item.no_with_vote_count}
                                    function={vote}
                                    description={item.description}
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
