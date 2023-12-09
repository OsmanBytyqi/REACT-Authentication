export interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export interface UpdateUserDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    selectedUserId: string | null;
    userData: {
        id: string;
        name: string;
        lastname: string;
        email: string;
        password: string;
        role: string;
    } | null;
}


export interface ConfirmationDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    message: string;
}

export interface BlogItem {
    id: string;
    title: string;
    description: string;
    author:string;
}

export interface BlogListProps {
    data: BlogItem[];
}