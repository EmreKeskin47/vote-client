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

const Vote = () => {
    const context = useContext(singleContext);
    let mockClient: CosmWasmClient;

    const [listEnd, setListEnd] = useState(0);
    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);
    const [loadMoreBtn, setLoadMoreBtn] = useState(false);
    const [voteboxListByTopic, setVoteboxListByTopic] = useState<Votebox[]>([]);
    
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

    const queryListByTopic = async (boxTopic: String) => {
       try {
            //@ts-ignore
            mockClient = await CosmWasmClient.connect(context.testUrl);

            const queryResponse = await mockClient.queryContractSmart(
                // @ts-ignore
                context.contractAdress,
                {
                    get_voteboxes_by_topic: { topic: boxTopic.toLowerCase() },
                }
            );
            
            if (queryResponse.voteList) {
                setVoteboxListByTopic([]);
                queryResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxListByTopic((prevState) => [...prevState, votebox])
                );
            }
           console.log(queryResponse.voteList);
            if(queryResponse.voteList.length == 0){
                toast.error("No VoteBoxes found with the topic specified.", { position:"top-right", style: { maxWidth: "none"} });
            }
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
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
            <SearchByTopic function={queryListByTopic}/>

            {voteboxListByTopic.length > 0 && (
                <Grid container direction="row" spacing={2} p={3}>
                    {voteboxListByTopic.map((item: any, index: number) => {
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
                                    function={queryListByTopic}
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
