import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomAlert(props: { function: () => void; severity: string | undefined; text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                                props.function();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    /*@ts-ignore*/
                    severity={props.severity}
                    sx={{ mb: 2 }}
                >
                    {props.text}
                </Alert>
            </Collapse>
        </Box>
    );
}
