import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";

// @ts-ignore
const VotingChart = ({ yesCount, noCount, nwvCount, abstainCount }) => {
    const getPercentage = (num: number, total: number) => {
        if (isNaN((num * 100) / total)) {
            return 0;
        } else {
            return (num * 100) / total;
        }
    };

    const yes = getPercentage(
        yesCount,
        yesCount + noCount + nwvCount + abstainCount
    );
    const no = getPercentage(
        noCount,
        yesCount + noCount + nwvCount + abstainCount
    );
    const nwv = 0;
    const abstain = 0;

    return (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <Tooltip title={yes + "%"}>
                <LinearProgress
                    color="success"
                    variant="determinate"
                    value={yes}
                    sx={{ height: "30px", borderRadius: "3px" }}
                />
            </Tooltip>
            Yes: {yesCount}
            <Tooltip title={no + "%"}>
                <LinearProgress
                    color="error"
                    variant="determinate"
                    value={no}
                    sx={{ height: "30px", borderRadius: "3px" }}
                />
            </Tooltip>
            No: {noCount}
            <Tooltip title={nwv + "%"}>
                <LinearProgress
                    color="warning"
                    variant="determinate"
                    value={nwv}
                    sx={{ height: "30px", borderRadius: "3px" }}
                />
            </Tooltip>
            No With Veto: {nwv}
            <Tooltip title={abstain + "%"}>
                <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={abstain}
                    sx={{ height: "30px", borderRadius: "3px" }}
                />
            </Tooltip>
            Abstain: {abstainCount}
        </Stack>
    );
};

export default VotingChart;
