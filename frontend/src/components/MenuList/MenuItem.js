import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      padding : 0,
      height : 160,
      display: 'flex'
    },
    media: {
        height: 160,
        width: 160,
        display: 'flex'
    },
    card: {
        marginTop: theme.spacing(1),
    },
    content:{
        display: 'flex',
        flexDirection: 'column'
    },
    actions:{
        justifyItems: 'flex-end',
        alignItems: 'flex-end',
        width: '100%'
    }
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
                    <Typography className={classes.card} variant="h5" component="h2">
                        {data.nama}
                    </Typography>
                    <Typography className={classes.card} variant="body2" color="textSecondary" component="p">
                        ini makanan enak banget 
                    </Typography>
                    <Grid container className={classes.card} spacing={1}>
                        {sampleHari.map((item, idx)=>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary" component="p">
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