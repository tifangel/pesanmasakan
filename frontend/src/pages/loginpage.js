import React, { useState, useEffect, useReducer } from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import FormLogin from '../components/login/formlogin'
import FormRegis from '../components/login/formregis'
import { Box } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

const useStyles = makeStyles((theme) => ({
    root: {
        background: '-webkit-linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
        background: '-o-linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
        background: '-moz-linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
        background: 'linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
    },
    iconback: {
        position: 'absolute',
        top: '10px',
        left: '10px',
    }
}));

const LoginPage = () => {

    let history = useHistory()

    const [state,setState] = useState('login')

    const changeForm = () => {
        state==='login'? setState('regis') : setState('login')
    }

    const [status,setStatus] = useState('customer')

    const changeStatusForm = () => {
        status==='customer'? setStatus('warung') : setStatus('customer')
    }

    const classes = useStyles();

    return(
        <React.Fragment>
            <Box 
                className={classes.root}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                <IconButton
                    className={classes.iconback}
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    <ArrowBackIcon style={{ color: "#08080C", fontSize: "1em" }} />
                </IconButton>
                { state === 'login'? 
                    <FormLogin 
                        status={status}
                        changeForm={changeForm}
                        changeStatusForm={changeStatusForm}
                    /> 
                :
                    <FormRegis
                        status={status}
                        changeForm={changeForm}
                        changeStatusForm={changeStatusForm}
                    />
                }
            </Box>
        </React.Fragment>
    );
}

export default LoginPage;