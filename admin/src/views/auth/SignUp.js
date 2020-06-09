import React, { useState, useEffect } from 'react';
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
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal'

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
    name: yupstring()
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
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const {register, handleSubmit, errors } = useForm({
        validationSchema: LoginSchema
    });

    const closeModal = () => {
        setIsloading(false);
        setShow(false)
    }

    const closeModalCreate = () => {
        setShowCreate(false)
        window.location.href = "/signin"
    }

    const onSubmit = (data) => {
        delete data.passwordconfirm;
        setIsloading(true);
        Axios.post('https://motorcare-api.herokuapp.com/api/users/create',{data})
            .then (res => {
                if (res.status === 201) {
                    console.log(res.data);
                    setShowCreate(true);
                    setIsloading(true);
                }
            })
            .catch (error => {
                if (error.message === "Request failed with status code 406") {
                    setShow(true)
                }
                console.log(error)
            })
        console.log("data", data);
    };

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            window.location.href = "/admin/dashboard"
        }
    });

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
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="User Name"
                                autoFocus
                                inputRef={register}
                                error={errors.name ? true : false}
                                helperText={errors.name ? "User Name required." : ""}
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
                        disabled={isLoading}
                    >
                        {isLoading? "Loading" : "Sign up"}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signin" variant="body2">
                                Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Email Has Been Used</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreate} onHide={closeModalCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Created</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={closeModalCreate}>OK</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default SignUp;