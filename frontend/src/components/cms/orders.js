import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Title from './title';
import CookList from './Orders/CookList';
import OngoingOrders from './Orders/OngoingOrders';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: 13,
        flexGrow: 1,
    },
    title: {
        flex: '95%',
        color: '#000000',
        fontSize : '1.9vw',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
        [theme.breakpoints.down('sm')]: {
            fontSize : '3vw',
        },
    },
}));

const Orders = () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Title nama={"Nama warung"} />
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={0}>
                    <h1 className={classes.title}>Cook List</h1>
                    <CookList />
                </Paper>
                <Paper className={classes.paper} elevation={0} style={{marginTop: 20}}>
                    <h1 className={classes.title}>Ongoing Orders</h1>
                    <OngoingOrders />
                </Paper>
            </div>
        </React.Fragment>
    )
}

export default Orders