import React, { useState } from 'react';
import { UpdateUserDialogProps } from '../types/AppTypes';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    CircularProgress,
} from '@mui/material';
import Input from '@material-ui/core/Input';
import { toast } from 'react-toastify';

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({ isOpen, handleClose, selectedUserId, userData }) => {
    const [loading, setLoading] = useState(false);
    const [newEmail, setNewEmail] = React.useState('');
    const [newName, setNewName] = React.useState(userData?.name || '');
    const [newLastName, setLastName] = React.useState(userData?.name || '');
    const [newRole, setnewRole] = React.useState(userData?.name || '');
    const [password, setPassword] = React.useState(userData?.password || '');

    const handleUpdateUser = async () => {
        try {
            setLoading(true);

            const response = await fetch(`http://localhost:3000/user/${selectedUserId}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: newEmail,
                    name: newName,
                    lastname: newLastName,
                    role: newRole,
                    password:password
                    // password
                }),
            });
            console.log(response)

            if (response.ok) {
                toast.success("user's data has been changed")

                setLoading(false);
                handleClose();
            } else {
                // Handle error scenarios
                toast.error("Failed to update user's data");
                setLoading(false);
            }
        } catch (error) {
            console.error('Error updating user email', error);
            setLoading(false);
        }
    };


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Update User</DialogTitle>
            <form onSubmit={handleUpdateUser}>
                <DialogContent>

                    <FormControl fullWidth style={{ marginTop: '16px' }}>
                        {/* <FormControl fullWidth> */}
                        <InputLabel shrink>
                            Email
                        </InputLabel>
                        <Input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth style={{ marginTop: '16px' }}>
                        <InputLabel shrink>
                            Name</InputLabel>
                        <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth style={{ marginTop: '16px' }}>
                        <InputLabel shrink>
                            Last Name</InputLabel>
                        <Input
                            value={newLastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth style={{ marginTop: '16px' }}>
                        <InputLabel shrink>
                            role</InputLabel>
                        <Input
                            value={newRole}
                            onChange={(e) => setnewRole(e.target.value)}
                        />
                    </FormControl>

                       <FormControl fullWidth style={{ marginTop: '16px' }}>
                        <InputLabel shrink>Password</InputLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <div className="spinner-container">
                        {loading && <CircularProgress size={50} />}
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

    );
};
export default UpdateUserDialog;
