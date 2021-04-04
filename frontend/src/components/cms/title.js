import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(1),
        alignItems:'space-between'
    },
    title: {
        flex: '50%',
        color: '#000000',
        fontSize : '2.5vw',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
        [theme.breakpoints.down('sm')]: {
            fontSize : '4vw',
        },
    },
    date: {
        display:'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent:'flex-end',
        flex: '50%',
        textAlign: 'right',
        color: '#000000',
        fontSize : '1vw',
        fontFamily : 'Inter',
        fontWeight : 'medium',
        [theme.breakpoints.down('sm')]: {
            fontSize : '2vw',
        },
    }
  }));

const Title = ({nama}) => {

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.root}>
                <h1 className={classes.title}>Hello, {nama}!</h1>
                <pre className={classes.date}>
                    Tuesday, 16 March 2021
                    <br/>
                    12:32 PM
                </pre>
            </div>
        </React.Fragment>
    );
}

export default Title