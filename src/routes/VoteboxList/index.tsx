import React, { useContext, useState } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Box, Button, Grid } from "@mui/material";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Votebox } from "../../models/Votebox";
import singleContext from "../../SingleContext";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const VoteboxList = () => {
    const context = useContext(singleContext);
    let mockClient: CosmWasmClient;

    const [listEnd, setListEnd] = useState(0);
    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);
    const [loadMoreBtn, setLoadMoreBtn] = useState(false);

    const getYesRatio = (item: Votebox) => {
        let yes = Number(item.yes_count);
        let total =
            Number(item.yes_count) +
            Number(item.no_count) +
            Number(item.no_with_veto_count) +
            Number(item.abstain_count);
        if (!total || total === 0) {
            return "No Vote ";
        } else {
            return "Yes Ratio: " + (yes / total) * 100 + "%";
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
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
        }
    };

    return (
        <Grid container>
            <Button onClick={queryList} color="secondary">
                {listEnd === 0 ? (
                    <KeyboardArrowRightIcon />
                ) : (
                    <KeyboardArrowDownIcon />
                )}
                Load VoteBoxes
            </Button>
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

export default VoteboxList;
