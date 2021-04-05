
import Grid from '@material-ui/core/Grid';
import { makeStyles, Paper } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
    },
    paper:{
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        background: '#FDCB35', 
        color: '#FFF'
    },
    info:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
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

const DashboardInfo = () =>{
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <Paper className={classes.paper}>
                <Grid className={classes.info}>
                    <LocalShippingIcon className={classes.icon}/> 
                    <Grid className={classes.desc}>
                        <p className={classes.title}>Orders Delivered</p>
                        <p className={classes.count}>23</p>
                    </Grid>
                    
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <Grid className={classes.info}>
                    <ShoppingCartIcon className={classes.icon}/> 
                    <Grid className={classes.desc}>
                        <p className={classes.title}>Orders in Process</p>
                        <p className={classes.count}>23</p>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <Grid className={classes.info}>
                    <CancelIcon className={classes.icon}/> 
                    <Grid className={classes.desc}>
                        <p className={classes.title}>Orders Cancelled</p>
                        <p className={classes.count}>23</p>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default DashboardInfo