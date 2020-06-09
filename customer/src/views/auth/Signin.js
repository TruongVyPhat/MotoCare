import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { string as yupstring, object as yupobject } from "yup";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="/" color="inherit">
                Motor Care
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const LoginSchema = yupobject().shape({
    email: yupstring()
        .required()
        .email(),
    password: yupstring()
        .required()
        .min(1)
    //.matches(/[a-zA-Z]/),   
});

function Signin() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        validationSchema: LoginSchema
    });
    const closeModal = () => {
        setIsloading(false);
        setShow(false);
    }

    const onSubmit = (data) => {
        console.log(data);
        setIsloading(true);
        Axios.post('http://localhost:9000/api/auth/login', { data })
            .then(res => {
                setIsloading(true);
                if (res.status === 200) {
                    const jwtToken = res.data.data.access_token;
                    const role_id = res.data.data.role_id
                    localStorage.setItem('access_token', jwtToken);
                    localStorage.setItem('role_id', role_id);
                    window.location.href = '/';

                }
            })
            .catch(error => {
                if (error.message === "Request failed with status code 404") {
                    setShow(true)
                    setIsloading(false)
                }
                console.log(error)
            })
    };

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null && localStorage.getItem('role_id') !== null) {
            window.location.href = "/"
        }
    });

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            inputRef={register}
                            error={errors.email ? true : false}
                            helperText={errors.email ? "Email incorrect." : ""}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={register}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading" : "Sign in"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/register-page" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register-page" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Password or email wrong</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Grid>
    );
}

export default Signin;