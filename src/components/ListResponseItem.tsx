import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

// @ts-ignore
const ListResponseItem = (props) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
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
            <Grid
                container
                direction="row"
                xs={12}
                spacing={2}
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{ color: "white" }}
                >
                    ID: {props.id}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    TOPIC: {props.topic}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    YES: {props.yesCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    NO: {props.noCount}
                </Typography>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    pl={2}
                    sx={{ color: "white" }}
                >
                    DEADLINE: {props.deadline}
                </Typography>
            </Grid>
            <hr />
            <br />
            <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ color: "white" }}
            >
                OWNER: <br />
                {props.owner}
            </Typography>
        </Grid>
    );
};

export default ListResponseItem;
