import React, { useState, useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormLogin from '../components/login/formlogin'
import FormRegis from '../components/login/formregis'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        background: '-webkit-linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
        background: '-o-linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
        background: '-moz-linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
        background: 'linear-gradient(140deg, #FDCB35 50%, #F5F5F5 50%)',
    },
}));

const LoginPage = () => {

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