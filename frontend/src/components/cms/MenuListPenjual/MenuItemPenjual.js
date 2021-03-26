import React, { useState, useEffect } from 'react';
import {getDaysbyMenuId} from '../../resource';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const { defaultAPIURL } = require("../../../config");

const useStyles = makeStyles((theme) => ({
    root: {
      padding : 0,
      height : 240,
      display: 'flex'
    },
    media: {
        height: 240,
        width: 260,
        display: 'flex'
    },
    card: {
        marginTop: theme.spacing(1),
    },
    content:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    actions:{
        justifyItems: 'flex-end',
        alignItems: 'flex-end',
        width: '100%'
    },
    menuTitle:{
        fontSize : 30,
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
        color : '#000',
    },
    menuDesc: {
        fontSize : 12,
        fontFamily : 'Inter',
        fontWeight : 'light',
        color : '#000',
        marginTop : 4,
    },
    menuPrice: {
        fontSize : 18,
        fontFamily : 'Inter',
        fontWeight : '600',
        color : '#000',
        marginLeft: 'auto',
    },
    menuDay: {
        fontSize : 14,
        // fontFamily : 'Inter',
        fontWeight : 'light',
        background : '#FDCB35',
        color : '#000'
    },
  }));

const MenuItemPenjual = ({data, onClick}) => {
    
    const[id, setID] = useState(data.id);
    const[days, setDays] = useState([]);

    useEffect(() => {
        async function loadDays(){
            try{
                let response = await getDaysbyMenuId(id);
                
                if (response.status === 200) {
                    setDays(response.data.values);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        loadDays();
    }, [id]);

    const classes = useStyles();

    return(
        <React.Fragment>
            <Card className={classes.root} onClick={() => onClick(data)}> 
                <CardMedia
                    className={classes.media}
                    image={`${defaultAPIURL}${data.pic}`}
                    title={data.nama}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.menuTitle} variant="h5" component="h2">
                        {data.nama}
                    </Typography>
                    <Typography className={classes.menuDesc} variant="body2" color="textSecondary" component="p">
                        {data.desc_menu}
                    </Typography>
                    <Typography className={classes.menuPrice} variant="body2" color="textSecondary" component="p">
                        Rp {data.harga}
                    </Typography>
                    <Grid container className={classes.card} spacing={1}>
                        {days.map((item, idx)=>
                            <Grid item>
                                <Typography className={classes.menuDay} variant="body2" color="textSecondary" component="p">
                                    {item.hari}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default MenuItemPenjual;