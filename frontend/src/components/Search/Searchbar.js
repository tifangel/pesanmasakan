import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import queryString from 'query-string';

import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Divider from '@material-ui/core/Divider';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 25,
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginRight: theme.spacing(5),
      flex: 1,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    iconButton: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
    iconButton2: {
        padding: 10,
    },
}));

const Searchbar = (props) => {

    const [namaitem, setNamaitem] = useState('');
    const [lokasi, setLokasi] = useState('');
    
    let location = useLocation();
    let history = useHistory();

    const [paramQuery, setParamQuery] = useState('');
    const [paramLocation, setParamLocation] = useState('');

    useEffect(() => {
        if(location.pathname.includes('search')){
            let params = queryString.parse(location.search);
            setParamQuery(params.query);
            setParamLocation(params.location);
        }
    }, [paramQuery,paramLocation]);
    
    const handleSearch = (event) => {
        event.preventDefault();
        let querySearch = namaitem? namaitem : paramQuery;
        let locationSearch = lokasi? lokasi : paramLocation;
        history.push({
            pathname: '/search',
            search : '?location='+locationSearch+'&query='+querySearch
        });
    }
    
    const classes = useStyles();

    return(
        <React.Fragment>
            <Container>
                <form onSubmit={handleSearch}>
                    <Paper className={classes.root}>
                        <LocationOnIcon className={classes.iconButton}/>
                        <InputBase
                            className={classes.input}
                            placeholder="Location"
                            onChange={(e)=>{setLokasi(e.target.value)}}
                            // inputProps={{ 'aria-label': 'description' }}
                        />
                    </Paper>
                    <Paper className={classes.root}>
                        <SearchIcon className={classes.iconButton}/>
                        <InputBase
                            className={classes.input}
                            placeholder="Search"
                            onChange={(e)=>{setNamaitem(e.target.value)}}
                            // inputProps={{ 'aria-label': 'description' }}
                        />
                    </Paper>
                </form>
            </Container>
        </React.Fragment>
    );
}

export default Searchbar;