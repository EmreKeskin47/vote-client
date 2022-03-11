import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const ListResponseItem = (props: {
    id:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    yesCount:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    noCount:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    owner:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    deadline:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
}) => {
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
                height: "200px",
                width: "100%",
            }}
        >
            <Grid container item direction="row">
                <Typography variant="h5" gutterBottom component="div">
                    ID: {props.id}
                </Typography>
                <Typography variant="h5" gutterBottom component="div" pl={2}>
                    YES: {props.yesCount}
                </Typography>
                <Typography variant="h5" gutterBottom component="div" pl={2}>
                    NO: {props.noCount}
                </Typography>
                <Typography variant="h5" gutterBottom component="div" pl={2}>
                    DEADLINE: {props.deadline}
                </Typography>
            </Grid>
            <hr />
            <br />
            <Typography variant="h5" gutterBottom component="div">
                OWNER: <br />
                {props.owner}
            </Typography>
        </Grid>
    );
};

export default ListResponseItem;
