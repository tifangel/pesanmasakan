import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Title from './title';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: theme.spacing(5),
        margin: theme.spacing(0),
    },
    contflex: {
        display: 'flex',
    },
    title: {
        flex: '95%',
        color: '#000000',
        fontSize : 30,
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
    },
    contbtn: {
        flex: '5%',
    },
    editbtn: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    info: {
        flex: '50%',
        padding: theme.spacing(4),
        paddingRight: theme.spacing(6),
    },
    col1: {
        width: '40%',
        paddingBottom: '30px',
        color: '#C4C4C4',
        fontSize : 20,
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
    },
    col2: {
        width: '60%',
        paddingBottom: '30px',
        color: '#000000',
        fontSize : 20,
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
    },
    contimg: {
        flex: '50%',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    titleimg: {
        color: '#C4C4C4',
        fontSize : 20,
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
    },
    img: {
        width: '100%',
    },
  }));

const Profile = (props) => {

    const classes = useStyles();

    return(
        <React.Fragment>
            <Title/>
            <div className={classes.root}>
                <div className={classes.contflex}>
                    <h1 className={classes.title}>My Warung Profile</h1>
                    <div className={classes.contbtn}>
                        <IconButton
                            className={classes.editbtn}
                        >
                            <EditIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.contflex}>
                    <div className={classes.info}>
                        <table>
                            <tr>
                                <td className={classes.col1}>Warung Name</td>
                                <td className={classes.col2}>Lalapan Lahap</td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Phone Number</td>
                                <td className={classes.col2}>081932966161 / (022) 7995643</td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Address</td>
                                <td className={classes.col2}>Jl Peternakan No 45 Pasar Minggu, Jakarta Selatan 12510</td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Category</td>
                                <td className={classes.col2}>Chicken Duck</td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Warung Owner</td>
                                <td className={classes.col2}>John Doe</td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Email</td>
                                <td className={classes.col2}>john.doe@lalapan.lahap</td>
                            </tr>
                        </table>
                    </div>
                    <div className={classes.contimg}>
                        <p className={classes.titleimg}>Warung Image</p>
                        <img src="/logo512.png" className={classes.img}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile