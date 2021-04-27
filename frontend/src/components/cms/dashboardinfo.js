
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
        alignItems:'stretch',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
        }
    },
    paper:{
        display:'flex',
        flexDirection: "row",
        justifyContent:"space-around",
        alignItems:'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        background: '#FDCB35', 
        color: '#FFF',
        borderRadius: 13,
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(0.5),
            paddingBottom: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            paddingLeft: theme.spacing(0.5),
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
            paddingRight: theme.spacing(0),
            paddingLeft: theme.spacing(0),
        }
    },
    icon:{
        fontSize: '4.2em',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }, 
    desc:{
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            flexDirection: 'row-reverse',  
            alignItems: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            textAlign: 'center',
        }
    },
    title:{
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(0),
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(0),
            marginTop: theme.spacing(1),
        },
    },
    count:{
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        fontFamily: 'Roboto Slab',
        fontWeight: 'black',
        fontSize: '2em',
        [theme.breakpoints.only('sm')]: {
            marginRight: theme.spacing(2),
        }
    }
}))

const DashboardInfo = ({id_warung}) =>{
    const [cancelled, setCancel] = useState([]);
    const [success, setSuccess] = useState([]);
    const [process, setProcess] = useState([]);

    function setData(summary){
        console.log(summary);
        var succ = summary[0].length;
        var proc = summary[2].length;
        var cancel = summary[1].length;
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
            <Grid item xs={4} sm={4}>
                <Paper className={classes.paper} elevation={0}>
                    <LocalShippingIcon className={classes.icon}/> 
                    <div className={classes.desc}>
                        <p className={classes.title}>Orders Delivered</p>
                        <p className={classes.count}>{success} </p>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={4} sm={4}>
                <Paper className={classes.paper} elevation={0}>
                    <ShoppingCartIcon className={classes.icon}/> 
                    <div className={classes.desc}>
                        <p className={classes.title}>Orders in Process</p>
                        <p className={classes.count}>{process} </p>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={4} sm={4}>
                <Paper className={classes.paper} elevation={0}>
                    <CancelIcon className={classes.icon}/> 
                    <div className={classes.desc}>
                        <p className={classes.title}>Orders Cancelled</p>
                        <p className={classes.count}>{cancelled} </p>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DashboardInfo