import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(1),
        alignItems:'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        }
    },
    title: {
        flex: '50%',
        color: '#000000',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
        [theme.breakpoints.down('sm')]: {
            fontSize : '2em',
            marginTop: 0,
            marginBottom: 30
        },
    },
    date: {
        alignSelf: 'center',
        textAlign: 'right',
        color: '#000000',
        fontFamily : 'Inter',
        fontWeight : 'medium',
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'flex-start',
            textAlign: 'left',
            fontSize: '1em',
            marginBottom: 0,
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
                </pre>
            </div>
        </React.Fragment>
    );
}

export default Title