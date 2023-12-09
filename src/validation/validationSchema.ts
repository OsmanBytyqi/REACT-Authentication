import * as Yup from "yup";

export const validationSchema = Yup.object({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .matches(
            /^[\d\w@-]{8,20}$/,
            'Password must be alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters'
        )
        .required('Password is required'),
});

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .matches(
            /^[\d\w@-]{8,20}$/,
            'Password must be alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters'
        )
        .required('Password is required'),
});
