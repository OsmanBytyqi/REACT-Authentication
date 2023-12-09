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
  Paper
} from '../modules/MaterialUIComponents';

import { BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useForm, useFormState } from "react-hook-form"
import { loginSchema } from '../validation/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form';
import { SignUpFormData, LoginFormData } from "../types/AppTypes"



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

export default function SignInSide() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const handleFormSubmit: SubmitHandler<LoginFormData> = async (formData: LoginFormData) => {
    if (Object.keys(errors).length !== 0) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user'); 
      const users = await response.json();

      const user = users.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );


      if (user) {
        console.log(user)
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('role', user.role);
        navigate('/home'); // Redirect to the dashboard
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register('email')}
                helperText={errors.email?.message || 'Enter a valid email address'}
                error={!!errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errors.password?.message || 'Enter a valid password'}
                error={!!errors.password}
                {...register('password')}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <RouterLink to="/signup">
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                  {/* <RouterLink to="/" >
                  Already have an account? Sign in
                </RouterLink> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
