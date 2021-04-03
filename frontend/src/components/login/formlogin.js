import React, { useState, useEffect, useReducer } from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputBase, Button } from '@material-ui/core'
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#FFFFFF",
        width: '30vw',
        padding: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5.5),
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(4),
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
    },
    subtitle: {
        fontSize: '1.2vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'light',
        color: '#000000',
    },
    input: {
        background: '#F5F5F5',
        paddingLeft: theme.spacing(1),
        width: '100%',
        fontSize: '1vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        marginBottom: '1.3vw',
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
    },
    box: {
        display: 'flex',
        fontSize: '0.95vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
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
        display:'flex'
    },
    icon: {
        fontSize: '1.2vw',
        marginRight: theme.spacing(0.5)
    },
}));

const FormLogin = ({status, changeForm, changeStatusForm}) => {

    const [dataLogin, setDataLogin] = useState({
        username: "",
        password: "",
    })

    let location = useLocation();
    let history = useHistory();

    const handleInput = (event) => {
        setDataLogin({ ...dataLogin, [event.target.name]: event.target.value });
    }

    const submitData = async() => {
        try {
            let data = JSON.parse(JSON.stringify(dataLogin))

            console.log(data)

            let response
            // status === 'customer'? response = await logincustomer(data) : response = await loginwarung(data)
            // console.log(response)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = () => {
        console.log(dataLogin)

        // submitData()

        history.push('/');
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