import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog } from '@material-ui/core';

const { defaultAPIURL } = require("../../config");

const useStyles = makeStyles((theme) => ({
    dialog: {
    },
    root: {
      padding : 0,
      height : 240,
      width : 570,
      display: 'flex',
      
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
        // fontFamily : 'Inter',
        fontWeight : 'light',
        color : '#000',
        marginTop : 4,
    },
    menuPrice: {
        fontSize : 18,
        // fontFamily : 'Inter',
        fontWeight : 'light',
        color : '#000',
        marginLeft: 'auto',
        position : 'absolute',
        bottom : 55,
        right : 12,
    },
    menuDayHint: {
        marginTop: theme.spacing(1),
        fontSize : 14,
        // fontFamily : 'Inter',
        fontWeight : 'bold',
        color : '#000'
    },
    menuDay: {
        fontSize : 14,
        // fontFamily : 'Inter',
        fontWeight : 'light',
        background : '#FDCB35',
        color : '#000'
    },
    menuOrder: {
        fontSize : 14,
        // fontFamily : 'Inter',
        width : 380,
        fontWeight : 'light',
        background : '#FDCB35',
        color : '#000',
        position : 'absolute',
        bottom : 10,
        right : 10,
        left : 180,
        '&:hover': {
           background: "#FDCB35",
        },
    },
  }));

const MenuPopUp = ({data, days, open, onClose}) => {

    const classes = useStyles();

    return(
        <Dialog open={open} onClose={onClose} className={classes.dialog}>
            <Card className={classes.root}> 
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
                    <Typography className={classes.menuDayHint} variant="body2" color="textSecondary" component="p">
                        Tersedia di hari:
                    </Typography>
                    <Grid container className={classes.card} spacing={1}>
                        {days.map((item, idx)=>
                            <Grid item key={idx}>
                                <Typography className={classes.menuDay} variant="body2" color="textSecondary" component="p">
                                    {item.hari}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                    <Typography className={classes.menuPrice} variant="body2" color="textSecondary" component="p">
                        Rp {data.harga}
                    </Typography>
                    <Button className={classes.menuOrder}>Pesan</Button>
                </CardContent>
            </Card>
        </Dialog>
    );
}

export default MenuPopUp;