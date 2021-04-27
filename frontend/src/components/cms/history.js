import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import OrderList from './Orders/OrderList';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
    },
    paperTitle: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    paperContent: {
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            overflow: 'scroll',
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
        },
    },
    title: {
        color: '#000000',
        fontSize : '1.5em',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
    },
}));

const History = ({ data }) => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.root}>
                <Paper className={classes.paperTitle} elevation={0}>
                    <h1 className={classes.title}>Order History</h1>
                </Paper>
                <Paper className={classes.paperContent} elevation={0}>
                    <OrderList data={data} type="history"/>
                </Paper>
            </div>
        </React.Fragment>
    )
}

export default History