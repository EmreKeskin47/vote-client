import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';
import toast from "react-hot-toast";

// @ts-ignore
const ListResponseItem = (props) => {
    const [res, setRes] = useState([]);
    const [ownerText, setOwnerText] = useState("No owner has found.");
    const createOwnerText = () => {
        if (props.owner) {
            let text = props.owner;
            let len = text.length;
            let first = text.slice(0, 5);
            let last = text.slice(len - 5, len - 1);
            return first + "....." + last;
        } else {
            return "No owner has found.";
        }
    }

    const createChartData = () => {
        return [
            {x: "Yes", y: Number(props.yesCount)},
            {x: "No", y: Number(props.noCount)},
            {x: "No With Veto", y: Number(props.nwvCount)},
            {x: "Abstain", y: Number(props.abstainCount)},
        ];
    }

    useEffect(() => {
        setOwnerText(createOwnerText());
        setRes(createChartData());
    })

    const ownerClicked = () => {
        navigator.clipboard.writeText(props.owner);
        toast.success("Copied to clipboard", {style: {maxWidth: "none"}});
    }

    const createThickValues = () => {
        return [props.yesCount, props.noCount, props.nwvCount, props.abstainCount].sort();
    }

    return (
        <Grid
            container
            direction="row"
            sx={{
                border: "2px solid gray",
                borderRadius: "7px 7px 7px 7px",
                backgroundColor: "whitesmoke",
                margin: 2,
            }}
        >
            <Grid item sx={{width: "50%",}}>
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                    colorScale={"grayscale"}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={["Yes", "No", "No With Veto", "Abstain"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickValues={createThickValues()}
                        tickFormat={(x: number) => (x)}
                    />
                    <VictoryBar
                        data={res}
                        x="x"
                        y="y"
                    />
                </VictoryChart>
            </Grid>
            <Grid
                item
                container
                direction="column"
                alignItems="left"
                sx={{width: "50%", align: "center", padding: "10%"}}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{color: "gray"}}
                >
                    ID: {props.id}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{color: "gray"}}
                >
                    TOPIC: {props.topic}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{color: "gray"}}
                >
                    YES: {props.yesCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{color: "gray"}}
                >
                    NO: {props.noCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{color: "gray"}}
                >
                    DEADLINE: {props.deadline}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{color: "gray"}}
                >
                    <Button color="success" onClick={ownerClicked}>
                        OWNER: {ownerText}
                    </Button>
                </Typography>
                <br/>
            </Grid>
            {props.delete && (
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={4}
                >
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => props.reset(props.id)}
                    >
                        Reset Votes
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => props.delete(props.id)}
                    >
                        Delete Votebox
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default ListResponseItem;
