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

const Orders = ({data}) => {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    const classes = useStyles();
    return(
        <React.Fragment>
            <Title nama={data.nama_warung} />
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={0}>
                    <h1 className={classes.title}>Cook List</h1>
                    <CookList data={data}/>
                </Paper>
                <Paper className={classes.paper} elevation={0} style={{marginTop: 20}}>
                    <Grid container>
                        <Grid item xs={11}>
                            <h1 className={classes.title}>Ongoing Orders</h1>
                        </Grid>
                        <Grid item xs={1} align="center">
                            <IconButton onClick={handleRefresh}>
                                <RefreshIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <OrderList data={data} type="ongoing" refresh={refresh}/>
                </Paper>
            </div>
        </React.Fragment>
    )
}

export default Orders