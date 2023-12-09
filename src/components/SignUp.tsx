import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  LockOutlinedIcon,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '../modules/MaterialUIComponents';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useFormState } from "react-hook-form"
import { useState } from "react"
import { validationSchema } from '../validation/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormData, User } from '../types/AppTypes';
import { SubmitHandler } from 'react-hook-form/dist/types';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const handleFormSubmit: SubmitHandler<SignUpFormData> = async (formData: any) => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const newUser: User = {
      id: formData.firstName,
      name: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: 'user'
    };

    try {
      const existingData = await fetch("http://localhost:3000/user");
      const existingUsers = await existingData.json();

      const userExists = existingUsers.some((user: any) => user.email === newUser.email);
      if (userExists) {
        toast.error('User with the same email already exists.');
      } else {
        await fetch("http://localhost:3000/user", {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        toast.success('Registered successfully.');
        navigate('/');
      }
    } catch (err: any) {
      toast.error('Failed: ' + err.message);
    }
  }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={errors.firstName?.message}
                  error={!!errors.firstName}
                  {...register('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  helperText={errors.lastName?.message}
                  error={!!errors.lastName}
                  {...register('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  helperText={errors.email?.message || 'Enter a valid email address'}
                  error={!!errors.email}
                  autoComplete="email"
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={errors.password?.message || 'Enter a valid password'}
                  error={!!errors.password}
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/" >
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}