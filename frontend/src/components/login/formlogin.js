import React, { useState, useEffect, useReducer } from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {loginuser, loginwarung} from '../../resource/auth'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputBase, Button } from '@material-ui/core'
import StorefrontIcon from '@material-ui/icons/Storefront'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#FFFFFF",
        width: '30vw',
        padding: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            width: '50vw',
            padding: theme.spacing(5),
        },
        [theme.breakpoints.down('sm')]: {
            width: '70vw',
            padding: theme.spacing(3.2),
        },
    },
    title: {
        fontSize: '4.15vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        color: '#000000',
        paddingLeft: theme.spacing(1),
        margin: theme.spacing(0),
        borderLeft: '0.65vw solid #FDCB35',
        [theme.breakpoints.down('md')]: {
            fontSize: '5.5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '7vw',
        },
    },
    title2: {
        fontSize: '4.15vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'bold',
        color: '#000000',
        paddingLeft: theme.spacing(1),
        margin: theme.spacing(0),
        position: 'relative',
        top: '-1.63vw',
        borderLeft: '0.65vw solid #FDCB35',
        [theme.breakpoints.down('md')]: {
            fontSize: '5.5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '7vw',
        },
    },
    subtitle: {
        fontSize: '1.2vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'light',
        color: '#000000',
        [theme.breakpoints.down('md')]: {
            fontSize: '2vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5vw',
        },
    },
    input: {
        background: '#F5F5F5',
        padding: theme.spacing(1),
        width: '100%',
        fontSize: '1vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        marginBottom: '1.3vw',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8vw',
            marginBottom: '2vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.2vw',
            padding: theme.spacing(0),
            paddingLeft: theme.spacing(1),
        },
    },
    btnsubmit: {
        fontSize: '1.2vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'medium',
        color: '#000000',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '13vw',
        background: '#FDCB35',
        marginTop: '1.3vw',
        [theme.breakpoints.down('md')]: {
            marginTop: '3vw',
            fontSize: '2vw',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '5vw',
            fontSize: '2.5vw',
        },
    },
    box: {
        display: 'flex',
        fontSize: '0.95vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.2vw',
        },
    },
    text1: {
        flex: '60%',
        textAlign: 'right',
    },
    text2: {
        flex: '40%',
        color: '#FDCB35',
        fontWeight: 'black',
        cursor: 'pointer',
        paddingLeft: theme.spacing(1)
    },
    box2: {
        position: 'relative',
        bottom: `calc(-1.5em - ${theme.spacing(1)}px)`,
        left: `calc(-1.5em - ${theme.spacing(1)}px)`,
        fontSize: '0.8vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        cursor: 'pointer',
        display:'flex',
        [theme.breakpoints.down('md')]: {
            bottom: `calc(-1em - ${theme.spacing(0)}px)`,
            left: `calc(-1em - ${theme.spacing(0)}px)`,
            fontSize: '1.5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.3vw',
        },
    },
    icon: {
        fontSize: '1.2vw',
        marginRight: theme.spacing(0.5),
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.7vw',
        },
    },
}));

const FormLogin = ({status, changeForm, changeStatusForm}) => {

    const [dataLogin, setDataLogin] = useState({
        username: "",
        password: ""
    })

    let location = useLocation();
    let history = useHistory();

    const handleInput = (event) => {
        setDataLogin({ ...dataLogin, [event.target.name]: event.target.value });
    }

    const handleSubmit = async() => {
        try {
            if(dataLogin.username != "" && dataLogin.password != "") {
                let data = JSON.parse(JSON.stringify(dataLogin))
                data.role = status

                let response
                response = await loginuser(data)
                console.log(response)
                if(response.message){
                    alert(response.message)
                }else{
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.role);
                    status === 'customer'? history.push('/') : history.push('/cms');
                    window.location.reload();
                }
            }else{
                alert("Username and / or password must be fill")
            }
        }
        catch (e) {
            console.log(e)
            alert("Failed to get authorization")
        }
    }

    const classes = useStyles();

    return(
        <Paper className={classes.root}>
                <p className={classes.title}>SIGN</p>
                <p className={classes.title2}>IN</p>
                <p className={classes.subtitle}>
                    {status === 'customer'? "Customer Account" : "Warung Account"}
                </p>
                <InputBase
                    name="username"
                    type="text"
                    placeholder="Username"
                    className={classes.input}
                    onChange={handleInput}/>
                <InputBase
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={classes.input}
                    onChange={handleInput}/>
                <Button onClick={handleSubmit} className={classes.btnsubmit} variant="contained">
                    Login
                </Button>
                <div className={classes.box}>
                    <p className={classes.text1}>You don't have account?</p>
                    <p className={classes.text2}
                        onClick={changeForm}
                        >Sign Up</p>
                </div>
                {status === 'customer'? 
                        <div 
                            className={classes.box2}
                            onClick={changeStatusForm}
                        >
                            <StorefrontIcon className={classes.icon}/> Login Warung Account
                        </div>
                        : 
                         <div 
                            className={classes.box2}
                            onClick={changeStatusForm}
                        >
                            <AccountCircleIcon className={classes.icon}/> Login Customer Account
                        </div>
                }
        </Paper>
    );
}

export default FormLogin;