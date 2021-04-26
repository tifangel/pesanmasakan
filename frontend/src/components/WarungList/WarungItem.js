import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const { defaultAPIURL } = require("../../config");

const useStyles = makeStyles((theme) => ({
    root: {
      padding : 0,
      height : 440
    },
    smallroot: {
      padding : 0,
      height : 150
    },
    media: {
        height: 200,
    },
    smallpic: {
        height: 150,
        width: 100,
        float: "right"
    },
    noshow: {
        display: "none",
    },
    card: {
        marginTop: theme.spacing(1),
    },
    dist:{
        marginLeft: theme.spacing(0),
    },
  }));

function pick(optbig, optsmall){
    return (window.innerWidth>768) ? optbig : optsmall
}

const WarungItem = ({data}) => {

    let history = useHistory();
    let location = useLocation();

    const [prevLocation, setPrevLocation] = useState('');
    const [searchPath, setSearchPath] = useState('');

    useEffect(() => {
        setPrevLocation(location.pathname);
        setSearchPath(location.search);
    }, [prevLocation, searchPath, location]);
    
    const classes = useStyles();
    
    return(
        <React.Fragment>
            <Card className={pick(classes.root, classes.smallroot)} onClick={
                                ()=>{
                                    history.push({
                                        pathname : `/warung/${data.id}`,
                                        state: {prevLocation : prevLocation,
                                                searchPath: searchPath,}
                                    });
                                }
                            }> 
                <CardMedia
                    className={pick(classes.media, classes.smallpic)}
                    image={`${defaultAPIURL}${data.pic}`}
                    title={data.nama}
                />
                <CardContent>
                    <Typography className={classes.card} variant={pick("h5", "p")} component="h2">
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
                                {data.distance + ' km'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} className={pick(null, classes.noshow)}>
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

export default WarungItem;