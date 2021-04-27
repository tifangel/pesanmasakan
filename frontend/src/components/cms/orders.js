import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Title from './title';
import CookList from './Orders/CookList';
import OrderList from './Orders/OrderList';

import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

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
            paddingLeft: 0,
            paddingRight: 0,
            width: '100vw',
            overflow: 'scroll',
        },
    },
    separator: {
        marginTop: theme.spacing(5),
    },
    title: {
        color: '#000000',
        fontSize : '1.5em',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
    },
}));

const Orders = ({data}) => {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.root}>
                <Paper className={classes.paperTitle} elevation={0}>
                    <h1 className={classes.title}>Cook List</h1>
                </Paper>
                <Paper className={classes.paperContent} elevation={0}>
                    <CookList data={data}/>
                </Paper>
                <div className={classes.separator}></div>
                <Paper className={classes.paperTitle} elevation={0}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={11}>
                            <h1 className={classes.title}>Ongoing Orders</h1>
                        </Grid>
                        <Grid item xs={1}  className={classes.title}>
                            <IconButton onClick={handleRefresh}>
                                <RefreshIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paperContent} elevation={0}>
                    <OrderList data={data} type="ongoing" refresh={refresh}/>
                </Paper>
            </div>
        </React.Fragment>
    )
}

export default Orders