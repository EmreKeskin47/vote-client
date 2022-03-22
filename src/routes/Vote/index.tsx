import React, {useContext, useEffect, useState} from "react";
import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {Box, Button, Grid, TextField, List} from "@mui/material";
import toast from "react-hot-toast";
import {Votebox} from "../../models/Votebox";
import singleContext from "../../SingleContext";
// import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListResponseItem from "../../components/ListResponseItem";
import SearchByTopic from "../../components/SearchByTopic";
import {FlashOnRounded} from "@mui/icons-material";
import VotingChart from "../../components/VotingChart";

const Vote = () => {
    const context = useContext(singleContext);
    let mockClient: CosmWasmClient;

    const [listEnd, setListEnd] = useState(0);
    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);
    const [loadMoreBtn, setLoadMoreBtn] = useState(false);
    const [voteboxListByTopicOrId, setVoteboxListByTopicOrId] = useState<Votebox[]>([]);

    const getYesRatio = (item: Votebox) => {
        let yes = Number(item.yes_count);
        let no = Number(item.no_count) + Number(item.no_with_veto_count);

        if (!no || no === 0) {
            return "No votes yet ";
        } else if (yes > no) {
            return "Passed";
        } else if (yes == no) {
            return "Neutral";
        } else {
            return "Rejected";
        }
    };

    const queryListByTopicOrId = async (boxTopicOrId: String) => {
        try {
            //@ts-ignore
            mockClient = await CosmWasmClient.connect(context.testUrl);

            const queryByTopicResponse = await mockClient.queryContractSmart(
                // @ts-ignore
                context.contractAdress,
                {
                    get_voteboxes_by_topic: {topic: boxTopicOrId.toLowerCase()},
                }
            );

            if (queryByTopicResponse.voteList) {
                setVoteboxListByTopicOrId([]);
                queryByTopicResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxListByTopicOrId((prevState) => [...prevState, votebox])
                );
            }

            let queryByIdResponse;
            if (!isNaN(Number(boxTopicOrId)) && Number(boxTopicOrId) > 0) {
                queryByIdResponse = await mockClient.queryContractSmart(
                    // @ts-ignore
                    context.contractAdress,
                    {
                        query_vote: {id: boxTopicOrId},
                    }
                );

                if (Number(queryByIdResponse.id) > 0) {
                    let queryResult = new Votebox(
                        queryByIdResponse.id, queryByIdResponse.yes_count, queryByIdResponse.no_count,
                        queryByIdResponse.abstain_count, queryByIdResponse.no_with_veto_count,
                        queryByIdResponse.deadline, queryByIdResponse.owner, queryByIdResponse.topic,
                        queryByIdResponse.description, queryByIdResponse.create_date, queryByIdResponse.total_amount,
                        queryByIdResponse.native_denom, queryByIdResponse.voters, queryByIdResponse.voter_count);

                    setVoteboxListByTopicOrId((prevState) => [...prevState, queryResult])
                }
            }
            if (queryByTopicResponse.voteList.length == 0 && !queryByIdResponse) {
                toast.error("No VoteBoxes found with the specified ID or topic.", {
                    position: "top-right",
                    style: {maxWidth: "none"}
                });
            }

        } catch (error: any) {
            if (error.message.includes("Vote not found")) {
                toast.error("No VoteBoxes found with the specified ID or topic.", {
                    style: {maxWidth: "none"},
                });
            } else {
                toast.error(error.message, {style: {maxWidth: "none"}});
            }
        }
    };

    const queryList = async () => {
        setLoadMoreBtn(true);
        try {
            //@ts-ignore
            mockClient = await CosmWasmClient.connect(context.testUrl);

            const queryResponse = await mockClient.queryContractSmart(
                // @ts-ignore
                context.contractAdress,
                {
                    get_list: {start_after: listEnd},
                }
            );
            if (queryResponse.voteList) {
                queryResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxList((prevState) => [...prevState, votebox])
                );
            }
            setListEnd(listEnd + queryResponse.voteList.length);
            if (listEnd % 10 !== 0) {
                setLoadMoreBtn(false);
            }
            if (queryResponse.voteList.length == 0) {
                toast.error("No VoteBoxes so far.", {position: "top-right", style: {maxWidth: "none"}});
            }
        } catch (error: any) {
            toast.error(error.message, {style: {maxWidth: "none"}});
        }
    };

    useEffect(() => {
        queryList();
    }, []);

    return (
        <Grid container>

            <Grid

                sx={{
                    border: "2px solid gray",
                    borderRadius: "7px 7px 7px 7px",
                    backgroundColor: "#1F2123",
                    padding: 1,
                    margin: 1,
                    width: "100%",
                }}
            >
                <SearchByTopic function={queryListByTopicOrId}/>

                {voteboxListByTopicOrId.length > 0 && (
                    <Grid container direction="row" spacing={2} p={1}>
                        {voteboxListByTopicOrId.map((item: any, index: number) => {
                            return (
                                <Grid key={index} item xs={12} md={6} lg={6}>
                                    <ListResponseItem
                                        key={index}
                                        id={item.id}
                                        topic={item.topic}
                                        yesCount={item.yes_count}
                                        noCount={item.no_count}
                                        owner={item.owner}
                                        dateCreated={item.create_date}
                                        deadline={item.deadline.at_height}
                                        deadlineNum={item.deadline.at_time}
                                        abstainCount={item.abstain_count}
                                        nwvCount={item.no_with_veto_count}
                                        description={item.description}
                                        function={queryListByTopicOrId}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Grid>


            <List
                sx={{
                    width: "100%",
                }}
            >
                {voteboxList.length > 0 &&
                    voteboxList.map((item: any, index: number) => {
                        return (
                            <Box key={index} sx={{color: "white"}}>
                                <ListItem
                                    alignItems="center"
                                    sx={{justifyContent: "space-between"}}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={item.id}
                                            src="/static/images/avatar/1.jpg"
                                            sx={{
                                                marginX: 3,
                                                height: 60,
                                                width: 60,
                                            }}
                                        />
                                    </ListItemAvatar>

                                    <Grid container direction="row" justifyContent="space-between">
                                        <ListItemText
                                            primary={item.topic}
                                            secondary={
                                                <Grid
                                                    container
                                                    direction={"column"}
                                                    lg={8} md={8} xs={8}
                                                >
                                                    <Typography
                                                        sx={{
                                                            zIndex: 1,
                                                            width: "90%",
                                                            display: "inline",
                                                            color: "white",
                                                            wrap: "break-word",
                                                            height: (item.description.length > 400) ? "150px" : "",
                                                            overflow: "auto",
                                                            marginRight: 5,
                                                        }}
                                                        component={"div"}
                                                        variant="body1"
                                                        marginY={1}
                                                        
                                                    >
                                                        {item.description}
                                                    </Typography>

                                                </Grid>
                                            }
                                        />
                                        <Grid container item direction={"column"}
                                              justifyContent={"space-evenly"}
                                              sx={{position: "absolute", paddingLeft: "50%"}}
                                              marginX="20%">


                                            <Grid item lg={6} md={4} xs={4} 
                                                  sx={{position: "relative", width: "50%",}}
                                                 
                                                  justifyContent="center"
                                                  marginX="-10%">
                                                {((item.yes_count + item.no_count + item.no_with_veto_count + item.abstain_count) != 0) ? 
                                                (<VotingChart
                                                    yesCount={item.yes_count}
                                                    noCount={item.no_count}
                                                    nwvCount={item.no_with_veto_count}
                                                    abstainCount={item.abstain_count}
                                                />): 
                                                <Typography
                                                sx={{
                                                    display: "inline",
                                                    color: "white",
                                                    marginRight: 5,
                                                    float: "right",
                                                    border: "2px solid",
                                                    borderRadius: 2,
                                                    paddingLeft: 1,
                                                    paddingRight: 1,
                                                }}
                                                component={"div"}
                                                variant="body1"
                                                marginY={1}
                                                
                                            >
                                                No votes so far
                                            </Typography>}
                                            </Grid>

                                            <Grid item sx={{width: "35%"}}>
                                                <Typography
                                                    variant="body2"
                                                    component={"p"}
                                                    sx={{direction: "row", color: "white", float: "right"}}
                                                    marginY={5}
                                                >
                                                    {"Creation Date: " +
                                                        new Date(
                                                            item.create_date /
                                                            1000000
                                                        ).toLocaleDateString()}
                                                </Typography>
                                            </Grid>

                                            <Grid item sx={{width: "35%"}}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "white",
                                                        float: "right"
                                                    }}
                                                    component={"p"}
                                                    marginY={-4}

                                                >
                                                    {"Deadline: " +
                                                        new Date(
                                                            item.deadline.at_time /
                                                            1000000
                                                        ).toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider
                                    variant="inset"
                                    component="li"
                                    sx={{backgroundColor: "white", margin: 2}}
                                />
                            </Box>
                        );
                    })}
            </List>

            {voteboxList.length > 0 && loadMoreBtn && (
                <Button color="secondary" onClick={queryList}>
                    Load More
                </Button>
            )}
        </Grid>
    );
};

export default Vote;
