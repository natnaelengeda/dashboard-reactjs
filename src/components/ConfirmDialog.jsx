import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@mui/material';

const ConfirmDialog = ({ dialogOpen, handleClose, title, message, confirmAction }) => {
    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContent>
                    {message}
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined'>No</Button>
                <Button onClick={confirmAction} autoFocus variant='contained'>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;