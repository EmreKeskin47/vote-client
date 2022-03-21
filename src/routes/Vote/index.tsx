import React, { useContext, useEffect, useState } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Box, Button, Grid, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { Votebox } from "../../models/Votebox";
import singleContext from "../../SingleContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListResponseItem from "../../components/ListResponseItem";
import SearchByTopic from "../../components/SearchByTopic";
import { FlashOnRounded } from "@mui/icons-material";

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
            return "No Vote ";
        } else if (yes > no) {
            return "Passed";
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
                    get_voteboxes_by_topic: { topic: boxTopicOrId.toLowerCase() },
                }
            );
            
            if (queryByTopicResponse.voteList) {
                    setVoteboxListByTopicOrId([]);
                queryByTopicResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxListByTopicOrId((prevState) => [...prevState, votebox])
                );
            }
            
            let queryByIdResponse;
            if(!isNaN(Number(boxTopicOrId)) && Number(boxTopicOrId) > 0 ){
                queryByIdResponse = await mockClient.queryContractSmart(
                    // @ts-ignore
                    context.contractAdress,
                    {
                        query_vote: { id: boxTopicOrId},
                    }
                );              
                
                if (Number(queryByIdResponse.id)>0) {                           
                    let queryResult = new Votebox(
                        queryByIdResponse.id, queryByIdResponse.yes_count, queryByIdResponse.no_count,
                        queryByIdResponse.abstain_count, queryByIdResponse.no_with_veto_count,
                        queryByIdResponse.deadline, queryByIdResponse.owner, queryByIdResponse.topic,
                        queryByIdResponse.description, queryByIdResponse.create_date, queryByIdResponse.total_amount,
                        queryByIdResponse.native_denom, queryByIdResponse.voters, queryByIdResponse.voter_count);
                    
                    setVoteboxListByTopicOrId((prevState) => [...prevState, queryResult]) 
                }     
            } 
            if(queryByTopicResponse.voteList.length == 0 && !queryByIdResponse){
                toast.error("No VoteBoxes found with the specified ID or topic.", { position:"top-right", style: { maxWidth: "none"} });
            }
            
        } catch (error: any) {
            if (error.message.includes("Vote not found")) {
                toast.error("No VoteBoxes found with the specified ID or topic.", {
                    style: { maxWidth: "none" },
                });
            } else {
                toast.error(error.message, { style: { maxWidth: "none" } });
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
                    get_list: { start_after: listEnd },
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
            if(queryResponse.voteList.length == 0){
                toast.error("No VoteBoxes so far.", { position:"top-right", style: { maxWidth: "none"} });
            }
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
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
                <Grid container direction="row" spacing={2} p={3}>
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
                            <Box key={index} sx={{ color: "white" }}>
                                <ListItem
                                    alignItems="center"
                                    sx={{ justifyContent: "space-between" }}
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
                                    <ListItemText
                                        primary={item.topic}
                                        secondary={
                                            <Grid
                                                container
                                                direction={"column"}
                                            >
                                                <Typography
                                                    sx={{
                                                        display: "inline",
                                                        color: "white",
                                                    }}
                                                    component={"span"}
                                                    variant="body1"
                                                    marginY={1}
                                                >
                                                    {item.description}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle1"
                                                    component={"span"}
                                                    sx={{ color: "white" }}
                                                    marginY={1}
                                                >
                                                    {"created on " +
                                                        new Date(
                                                            item.create_date /
                                                                1000000
                                                        ).toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                        }
                                    />

                                    <Grid item marginRight={10}>
                                        <Typography
                                            sx={{
                                                display: "inline",
                                                color: "white",
                                            }}
                                            component={"p"}
                                            variant="body1"
                                            marginY={1}
                                        >
                                            {getYesRatio(item) + ""}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "white",
                                            }}
                                            component={"p"}
                                            marginY={1}
                                        >
                                            {"Deadline: " +
                                                new Date(
                                                    item.deadline.at_time /
                                                        1000000
                                                ).toLocaleDateString()}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            component={"p"}
                                            sx={{ color: "white" }}
                                            marginY={1}
                                        >
                                            {"total deposit " +
                                                item.total_amount}
                                        </Typography>
                                    </Grid>
                                </ListItem>
                                <Divider
                                    variant="inset"
                                    component="li"
                                    sx={{ backgroundColor: "white", margin: 2 }}
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
