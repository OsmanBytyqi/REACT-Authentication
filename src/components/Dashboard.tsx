import Header from "./header/Header";
import * as React from 'react';

import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { Skeleton } from '@mui/material';
import Footer from "./Footer";
import useFetchData from "../hooks/useFetchData";
import UpdateUserDialog from "./UpdateUserDialog";
import ConfirmationDialog from "./DeleteUserDialog";
import { User } from "../types/AppTypes";
import { toast } from "react-toastify";

export default function Dashboard() {
    const { data: rows, loading, error } = useFetchData<User[]>('http://localhost:3000/user');
    const [isUpdateUserOpen, setUpdateUserOpen] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
    const [userData, setUserData] = React.useState<User | null>(null);
    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);
    const [userToDeleteId, setUserToDeleteId] = React.useState<string | null>(null);

    const handleUpdateUserClick = (userId: string) => {
        if (rows && rows.length > 0) {
            const selectedUser = rows.find((user) => user.id === userId);
            if (selectedUser) {
                setUserData({
                    id: selectedUser.id,
                    name: selectedUser.name,
                    lastname: selectedUser.lastname,
                    email: selectedUser.email,
                    password: selectedUser.password,
                    role: selectedUser.role,
                });
                setSelectedUserId(selectedUser.id)
                setUpdateUserOpen(true);
            }
        }
    };


    const handleDeleteUser = async (userId: string) => {
        try {
            setUserToDeleteId(userId);
            setConfirmationOpen(true);
        } catch (error) {
            console.error('Error marking user for deletion', error);
        }
    };

    const handleConfirmDeletion = async () => {
        setConfirmationOpen(false);

        if (userToDeleteId) {
            try {
                const response = await fetch(`http://localhost:3000/user/${userToDeleteId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('User deleted successfully')
                    window.location.reload();

                } else {
                    toast.error('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user', error);
            } finally {
                setUserToDeleteId(null);
            }
        }
    };

    const handleCancelDeletion = () => {
        setConfirmationOpen(false);
        setUserToDeleteId(null);
    };



    const handleCloseUpdateUser = () => {
        setSelectedUserId(null);
        setUpdateUserOpen(false);
    };



    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'lastname', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params: GridCellParams) => (
                <React.Fragment>
                    <Button
                        variant="contained"
                        color="error"
                        style={{ marginRight: '8px' }}
                        onClick={() => handleDeleteUser(params.row.id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleUpdateUserClick(params.row.id)}
                    >
                        Update
                    </Button>
                </React.Fragment>
            ),
        },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <div style={{ height: 400, width: '80%' }}>
                    {loading ? (
                        <Skeleton animation="wave" variant="rectangular" width="100%" height={400} />
                    ) : (
                        <React.Fragment>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                            <UpdateUserDialog
                                isOpen={isUpdateUserOpen}
                                handleClose={handleCloseUpdateUser}
                                selectedUserId={selectedUserId}
                                userData={userData}
                            />

                            <ConfirmationDialog
                                isOpen={isConfirmationOpen}
                                handleClose={handleCancelDeletion}
                                handleConfirm={handleConfirmDeletion}
                                title="Confirm Deletion"
                                message="Are you sure you want to delete this user?"
                            />
                        </React.Fragment>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
