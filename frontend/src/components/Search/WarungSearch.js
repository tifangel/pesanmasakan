import React from 'react';
import {useHistory} from 'react-router-dom';

import config from '../../config'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    media: {
        height: 200,
    },
    card: {
        marginTop: theme.spacing(1),
    },
    dist:{
        marginLeft: theme.spacing(2),
    },
  }));

const WarungSearch = ({
        data
    }) => {

    let history = useHistory();
    const handleShowItem = (event) => {
        event.preventDefault();
        history.push({
            pathname: '/',
            search : '?query='
        });
    }
    
    const classes = useStyles();

    return(
        <React.Fragment>
            <Card>
                <CardMedia
                    className={classes.media}
                    image="/logo512.png"
                    title={data.nama}
                />
                <CardContent>
                    <Typography className={classes.card} variant="h5" component="h2">
                        {data.nama}
                    </Typography>
                    <Typography className={classes.card} variant="body2" color="textSecondary" component="p">
                        {data.kategori}
                    </Typography>
                    <Grid container className={classes.card} spacing={1}>
                        <Grid item>
                            <StarIcon/>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary" component="p">
                                4.7
                            </Typography>
                        </Grid>
                        <Grid item className={classes.dist}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                1.2km
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item>
                            <LocationOnIcon/>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data.alamat}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="rating">
                        
                    </IconButton>
                </CardActions>
            </Card>
        </React.Fragment>
    );
}

export default WarungSearch;