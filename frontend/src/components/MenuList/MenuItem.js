import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

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
    },
    menuDay: {
        fontSize : 14,
        // fontFamily : 'Inter',
        fontWeight : 'light',
        background : '#FDCB35',
        color : '#000'
    },
  }));

const sampleHari = ['Rabu', 'Kamis', 'Jumat']

const MenuItem = ({data}) => {
    
    const classes = useStyles();

    return(
        <React.Fragment>
            <Card className={classes.root}> 
                <CardMedia
                    className={classes.media}
                    image="/logo512.png"
                    title={data.nama}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.menuTitle} variant="h5" component="h2">
                        {data.nama}
                    </Typography>
                    <Typography className={classes.menuDesc} variant="body2" color="textSecondary" component="p">
                    Deskripsi menunya di sini, ini menu pokoknya enak sehat lezat delicious mantapppp luar biasa duh nulis apa lagi ya biar sampe tiga baris ni
                    </Typography>
                    <Typography className={classes.menuPrice} variant="body2" color="textSecondary" component="p">
                        Rp 15.000 
                    </Typography>
                    <Grid container className={classes.card} spacing={1}>
                        {sampleHari.map((item, idx)=>
                            <Grid item>
                                <Typography className={classes.menuDay} variant="body2" color="textSecondary" component="p">
                                    {item}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default MenuItem;