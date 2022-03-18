import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";
import {Grid, Typography} from "@mui/material";
import singleContext from "../SingleContext";


// @ts-ignore
const VotingChart = ({yesCount, noCount, nwvCount, abstainCount}) => {

    const getConditionNumeric = (item: boolean) => {
        let res = yesCount - noCount - nwvCount;
        if (res > 0) {
            if (item) {
                //@ts-ignore
                return context.color.yes;
            } else {
                return "positive";
            }
        } else if (res === 0) {
            if (item) {
                //@ts-ignore
                return context.color.abstain;
            } else {
                return "neutral";
            }
        } else {
            if (item) {
                //@ts-ignore
                return context.color.no;
            } else {
                return "no";
            }
        }
    }

    const context = React.useContext(singleContext);
    const total = Number(yesCount) + Number(noCount) + Number(nwvCount) + Number(abstainCount);
    const [condition, setCondition] = React.useState(() => getConditionNumeric(false));

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
                <Grid item sx={{height: "30px", width: item.yes / 2 + "%", backgroundColor: context.colors.yes, float: "left"}}/>
            </Tooltip>
            <Tooltip title={"no: " + item.no + "%"}>
                {/*@ts-ignore*/}
                <Grid item sx={{height: "30px", width: item.no / 2 + "%", backgroundColor: context.colors.no, float: "left"}}/>
            </Tooltip>
            <Tooltip title={"no with veto: " + item.nwv + "%"}>
                {/*@ts-ignore*/}
                <Grid item sx={{height: "30px", width: item.nwv / 2 + "%", backgroundColor: context.colors.nwv, float: "left"}}/>
            </Tooltip>
            <Tooltip title={"abstain: " + item.abstain + "%"}>
                {/*@ts-ignore*/}
                <Grid item sx={{height: "30px", width: item.abstain / 2 + "%", backgroundColor: context.colors.abstain, float: "left"}}/>
            </Tooltip>
            <Grid item container direction="row" justifyContent="flex-end" width="90%">
                <Grid item sx={{
                    marginTop: -4,
                }}>
                    <Typography
                        variant="overline"
                        gutterBottom
                        component="div"
                        sx={{color: "purple", float: "right", paddingLeft: 1, paddingRight: 1, border: "2px solid", borderRadius: 2}}
                    >
                        {condition}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default VotingChart;

