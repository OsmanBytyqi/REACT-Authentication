import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

import { ConfirmationDialogProps } from '../types/AppTypes';


const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    handleClose,
    handleConfirm,
    title,
    message,
}) => {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="error" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;