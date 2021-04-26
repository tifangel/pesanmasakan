
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CancelIcon from '@material-ui/icons/Cancel';
import { getOrderSummary } from "../../resource";

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
        flexWrap: 'wrap',
        alignItems:'stretch'
    },
    paper:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        background: '#FDCB35', 
        color: '#FFF'
    },
    icon:{
        fontSize: '4.2vw'
    }, 
    desc:{
        paddingLeft: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'flex-start'
    },
    title:{
        marginBottom: theme.spacing(0),
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        fontSize: '1.2vw'
    },
    count:{
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(1),
        fontFamily: 'Roboto Slab',
        fontWeight: 'black',
        fontSize: '3vw'
    }
}))

const DashboardInfo = ({id_warung}) =>{
    const [cancelled, setCancel] = useState([]);
    const [success, setSuccess] = useState([]);
    const [process, setProcess] = useState([]);

    function setData(summary){
        var succ = summary[0].length;
        var proc = summary[1].length;
        var cancel = summary[2].length;
        setSuccess(succ);
        setProcess(proc);
        setCancel(cancel);
    }

    useEffect(() => {
        async function loadData(){
            try {
                let response = await getOrderSummary(id_warung);
            
                if (response.status === 200) {
                    setData(response.data.values);
                }
    
            } catch (e) {
                console.log(e);
            }
        }
        loadData();
    }, [id_warung]);

    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                    <LocalShippingIcon className={classes.icon}/> 
                    <div className={classes.desc}>
                        <p className={classes.title}>Orders Delivered</p>
                        <p className={classes.count}>{success}</p>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                    <ShoppingCartIcon className={classes.icon}/> 
                    <div className={classes.desc}>
                        <p className={classes.title}>Orders in Process</p>
                        <p className={classes.count}>{process}</p>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                    <CancelIcon className={classes.icon}/> 
                    <div className={classes.desc}>
                        <p className={classes.title}>Orders Cancelled</p>
                        <p className={classes.count}>{cancelled}</p>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DashboardInfo