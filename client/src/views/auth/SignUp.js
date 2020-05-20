import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { string as yupstring, object as yupobject } from "yup";
import * as Yup from 'yup'
import { useForm } from "react-hook-form";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="/"  color="inherit">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginSchema = yupobject().shape({
    firstName: yupstring()
        .required()
        .matches(/[a-zA-Z]/),
    lastName: yupstring()
        .required()
        .matches(/[a-zA-Z]/),
    email: yupstring()
        .required()
        .email(),
    password: yupstring()
        .required()
        .min(8)
        .matches(/[a-zA-Z]/),
    passwordconfirm: yupstring()
    .oneOf([Yup.ref('password'), null])
    
});

function SignUp() {
    const classes = useStyles();

    const {register, handleSubmit, errors } = useForm({
        validationSchema: LoginSchema
    });

    const onSubmit = (data) => {
        console.log("data", data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <br/>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={register}
                                error={errors.firstName ? true : false}
                                helperText={errors.firstName ? "First Name required." : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={register}
                                error={errors.lastName ? true : false}
                                helperText={errors.lastName ? "Last Name required." : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={register}
                                error={errors.email ? true : false}
                                helperText={errors.email ? "Email incorrect." : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={register}
                                error={errors.password ? true : false}
                                helperText={errors.password ? "Password is at least 8 characters and there are no special characters" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordconfirm"
                                label="Password Confirm"
                                type="password"
                                id="passwordconfirm"
                                autoComplete="current-password"
                                inputRef={register}
                                error={errors.passwordconfirm ? true : false}
                                helperText={errors.passwordconfirm ? "Password not match." : ""}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/Sign_in" variant="body2">
                                Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUp;