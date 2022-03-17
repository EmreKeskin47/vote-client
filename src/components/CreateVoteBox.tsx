import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomAlert from "./CustomAlert";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

const CreateVoteBox = (props: {
    function: (arg0: number, topic: string, description: string) => void;
}) => {
    const [time, setTime] = useState<Number>(0);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(false);
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = React.useState<Date | null>(new Date());

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setDescription(event.target.value);
    };

    const handleChange2 = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setTopic(event.target.value);
    };

    const createVoteBox = () => {
        if (Number(time) < 1) {
            setFlag(true);
            setTimeout(resetFlags, 3000);
        } else if (isNaN(Number(time))) {
            setFlag2(true);
            setTimeout(resetFlags, 3000);
        } else if (!topic) {
            setFlag3(true);
            setTimeout(resetFlags, 3000);
        } else {
            props.function(Number(time), topic, description);
        }
    };

    const resetFlags = () => {
        setFlag(false);
        setFlag2(false);
        setFlag3(false);
    };

    // @ts-ignore
    return (
        <Grid
            sx={{
                border: "2px solid gray",
                borderRadius: "7px 7px 7px 7px",
                backgroundColor: "#1F2123",
                padding: 3,
                margin: 3,
                height: "35%",
                width: "100%",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ color: "whitesmoke" }}
            >
                Create Your VoteBox
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ color: "whitesmoke" }}
            >
                Enter the deadline time for the votebox and click on the create
                VoteBox button
            </Typography>
            <br />
            <Grid
                container
                direction="row"
                sx={{ width: "100%" }}
                spacing={2}
                alignItems="center"
                justifyContent="center"
            >
                <Grid
                    item
                    container
                    justifyContent="space-evenly"
                    sm={12}
                    md={8}
                    justifyItems="center"
                >
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                        sx={{ backgroundColor: "white", borderRadius: 1.5 }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                minDateTime={new Date()}
                                renderInput={(props) => (
                                    <TextField {...props} />
                                )}
                                label="Deadline Time"
                                value={date}
                                onChange={(newDate) => {
                                    setDate(newDate);
                                    if (newDate != null) {
                                        let timeInNanoSeconds: Number =
                                            newDate.getTime() * 1000000;
                                        setTime(timeInNanoSeconds);
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Typography>

                    <TextField
                        id="topic"
                        label="Topic"
                        variant="filled"
                        onChange={handleChange2}
                        sx={{ backgroundColor: "white" }}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="filled"
                        onChange={handleChange}
                        sx={{ backgroundColor: "white" }}
                    />
                </Grid>

                <Grid item sm={12} md={4}>
                    <Button
                        sx={{
                            padding: "10px",
                            border: "1px solid",
                            borderRadius: "5px",
                            color: "whitesmoke",
                        }}
                        onClick={createVoteBox}
                    >
                        Create VoteBox
                    </Button>
                </Grid>
            </Grid>
            <br />
            {flag && (
                <CustomAlert
                    severity="error"
                    text="Please specify a future time for the deadline."
                    function={resetFlags}
                />
            )}
            {flag2 && (
                <CustomAlert
                    severity="error"
                    text="Please specify a future time for the deadline."
                    function={resetFlags}
                />
            )}
            {flag3 && (
                <CustomAlert
                    severity="error"
                    text="Please specify a topic for your VoteBox."
                    function={resetFlags}
                />
            )}
        </Grid>
    );
};

export default CreateVoteBox;
