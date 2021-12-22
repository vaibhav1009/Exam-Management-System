import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogTitle } from '@material-ui/core';

const DialogBox = (props) => {

    return (
        <div>
            <Dialog open={props.open}>
                <DialogContent>
                    <DialogTitle>
                        {props.text}
                    </DialogTitle>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.setIsError} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogBox;
