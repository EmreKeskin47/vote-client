import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomAlert from "./CustomAlert";

const SearchByTopic = (props: {
    function: (arg0: string) => void;
}) => {
    const [topicToSearch, setTopicToSearch] = useState("0");
    const [flag, setFlag] = useState(false);
    

    const resetFlags = () => {
        setFlag(false);
        
    };

    const handleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setTopicToSearch(event.target.value);
    };

    const search = () => {
        if (!topicToSearch) {
            setFlag(true);
            setTimeout(resetFlags, 3000);
        }else{
        props.function(topicToSearch);
        }
    };
    return (
        
            <Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                sx={{ width: "100%" }}
            >
                <Grid
                    container
                    direction="row"
                    sx={{ width: "100%" }}
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item sm={12} md={8} justifyItems="center">
                        <TextField
                            id="votebox-topic"
                            label="VoteBox Topic"
                            variant="filled"
                            onChange={handleChange}
                            sx={{ backgroundColor: "white" }}
                        />
                    </Grid>

                    <Grid item sm={12} md={8} justifyItems="space-between">
                        <Button
                            sx={{
                                border: "1px solid",
                                borderRadius: "5px",
                                color: "whitesmoke",
                            }}
                            onClick={search}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <br />
            {flag && (
                <CustomAlert
                    severity="error"
                    text="Please specify a topic to search for."
                    function={resetFlags}
                />
            )}            
        </Grid>
        
    );
};

  
export default SearchByTopic;
