import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";

// @ts-ignore
const VotingChart = ({yesCount, noCount, nwvCount, abstainCount}) => {
    const total = Number(yesCount) + Number(noCount) + Number(nwvCount) + Number(abstainCount);
    const getPercentage = (num: number) => {
        if (isNaN((num * 100) / total) || num === undefined) {
            return 0;
        } else {
            console.log("total: " + total);
            return (num * 100) / total;
        }
    };

    const [item, setItem] = useState({
        yes: getPercentage(yesCount),
        no: getPercentage(noCount),
        nwv: getPercentage(nwvCount),
        abstain: getPercentage(abstainCount),
    })

    useState(() => {
        // setItem({...item, yes: getPercentage(yesCount)});
        // setItem({...item, no: getPercentage(noCount)});
        // setItem({...item, nwv: getPercentage(nwvCount)});
        // setItem({...item, abstain: getPercentage(abstainCount)});
    });


    return (
        <Stack sx={{width: "100%", color: "grey.500"}} spacing={1}>
            <Tooltip title={item.yes + "%"}>
                <LinearProgress
                    color="success"
                    variant="determinate"
                    value={item.yes}
                    sx={{height: "30px", borderRadius: "3px"}}
                />
            </Tooltip>
            Yes: {yesCount}
            <Tooltip title={item.no + "%"}>
                <LinearProgress
                    color="error"
                    variant="determinate"
                    value={item.no}
                    sx={{height: "30px", borderRadius: "3px"}}
                />
            </Tooltip>
            No: {noCount}
            <Tooltip title={item.nwv + "%"}>
                <LinearProgress
                    color="warning"
                    variant="determinate"
                    value={item.nwv}
                    sx={{height: "30px", borderRadius: "3px"}}
                />
            </Tooltip>
            No With Veto: {nwvCount}
            <Tooltip title={item.abstain + "%"}>
                <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={item.abstain}
                    sx={{height: "30px", borderRadius: "3px"}}
                />
            </Tooltip>
            Abstain: {abstainCount}
        </Stack>
    );
};

export default VotingChart;
