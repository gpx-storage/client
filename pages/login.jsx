import React, { useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useFormData from '../hooks/useFormData';
import { login } from '../lib/authentication'
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();

  const [formData, handleFormChange] = useFormData({
    email: '',
    password: ''
  })

  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (error) {
      if (error.response.status === 400) {
        window.alert('Wrong credentials');
      }
    }
  }, [formData]);

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm onChange={handleFormChange} onSubmit={handleFormSubmit} />
      </div>
    </>
  );
}