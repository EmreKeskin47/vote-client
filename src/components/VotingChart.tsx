import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";
import {Grid, Typography} from "@mui/material";
import singleContext from "../SingleContext";


// @ts-ignore
const VotingChart = ({yesCount, noCount, nwvCount, abstainCount}) => {
    const context = React.useContext(singleContext);
    const total = Number(yesCount) + Number(noCount) + Number(nwvCount) + Number(abstainCount);
    const getPercentage = (num: number) => {
        if (isNaN((num * 100) / total) || num === undefined) {
            return 0;
        } else {
            return (num * 100) / total;
        }
    };

    const [item, setItem] = useState({
        yes: getPercentage(yesCount),
        no: getPercentage(noCount),
        nwv: getPercentage(nwvCount),
        abstain: getPercentage(abstainCount),
    })

    return (
        <Grid item container direction="row" justifyContent="flex-start" sx={{position: "absolute"}}>
            <Tooltip title={"yes: " + item.yes + "%"}>
                {/*@ts-ignore*/}
                <Grid item sx={{height: "20px", width: item.yes / 2 + "%", backgroundColor: context.colors.yes, float: "left"}}/>
            </Tooltip>
            <Tooltip title={"no: " + item.no + "%"}>
                {/*@ts-ignore*/}
                <Grid item sx={{height: "20px", width: item.no / 2 + "%", backgroundColor: context.colors.no, float: "left"}}/>
            </Tooltip>
            <Tooltip title={"no with veto: " + item.nwv + "%"}>
                {/*@ts-ignore*/}
                <Grid item sx={{height: "20px", width: item.nwv / 2 + "%", backgroundColor: context.colors.nwv, float: "left"}}/>
            </Tooltip>
            <Tooltip title={"abstain: " + item.abstain + "%"}>
                {/*@ts-ignore*/}
                <Grid item sx={{height: "20px", width: item.abstain / 2 + "%", backgroundColor: context.colors.abstain, float: "left"}}/>
            </Tooltip>
        </Grid>
    );
};

export default VotingChart;

