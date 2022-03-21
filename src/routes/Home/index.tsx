import {Grid, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import peopleAroundTable from "./peopleAroundTable.gif";
import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import toast from "react-hot-toast";
import ListResponseItem from "../../components/ListResponseItem";
import singleContext from "../../SingleContext";
import {TypingEffect} from "react-typing-text-effect";
import {isMobile} from "react-device-detect";
import {Votebox} from "../../models/Votebox";

const Home = () => {
    const [recentsFlag, setRecentsFlag] = useState(false);
    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);

    const context = useContext(singleContext);

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

    const queryList = async (boxId: number) => {
        setVoteboxList([]);
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
                    get_list: {start_after: boxId - 1},
                }
            );
            console.log(queryResponse);
            if (queryResponse.voteList) {
                queryResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxList((prevState) => [...prevState, votebox])
                );
            }
            if(queryResponse.voteList.length == 0){
                toast.error("No VoteBoxes so far.", { position:"top-right", style: { maxWidth: "none"} });
            }
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
                    {isMobile && (
                        <TypingEffect
                            texts={[
                                "You know what",
                                "the world thinks.",
                                "Now it is time to",
                                "speak up your mind!",
                            ]}
                        />
                    )}
                    {!isMobile && (
                        <TypingEffect
                            texts={[
                                "You know what the world thinks.",
                                "It is time to speak up your mind!",
                            ]}
                        />
                    )}
                </Grid>
                <Typography
                    variant="h5"
                    sx={{color: "whitesmoke", textAlign: "center"}}
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
            {voteboxList.length >0 && (<Grid direction="column" justifyContent="center">
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
            </Grid>)}

            {recentsFlag && voteboxList.length > 0 && (
                <Grid container direction="row" spacing={2} p={3}>
                    {voteboxList.map((item: any, index: number) => {
                        return (
                            <Grid key={index} item xs={12} md={6} lg={6}>
                                <ListResponseItem
                                    key={index}
                                    id={item.id}
                                    topic={item.topic}
                                    yesCount={item.yes_count}
                                    noCount={item.no_count}
                                    owner={item.owner}
                                    deadline={item.deadline.at_height}
                                    deadlineNum={item.deadline.at_time}
                                    abstainCount={item.abstain_count}
                                    nwvCount={item.no_with_veto_count}
                                    description={item.description}
                                    dateCreated={item.create_date}
                                    function={getVBCount}
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
