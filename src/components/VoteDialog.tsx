import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const options = ["yes", "no", "no with veto", "abstain"];

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function VoteDialog(props: { function?: any; onClose?: any; selectedValue?: any; open?: any; }) {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        props.function(value);
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Choose Your Vote</DialogTitle>
            <List sx={{pt: 0}}>
                {options.map((option) => {
                    return (
                        <ListItem button onClick={() => handleListItemClick(option)} key={option}>
                            {option.toUpperCase()}
                        </ListItem>
                    );
                })}
            </List>
        </Dialog>
    );
}
