import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import queryString from 'query-string';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 20,
      padding: 5,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      borderRadius: '15px',
      margin: theme.spacing(1.5),
    },
    input: {
      marginLeft: theme.spacing(5),
      flex: 1,
    },
    form: {
        display: 'flex',
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
        padding: 1,
        margin: 1,
    },
}));

const Searchbar = (props) => {

    const [namaitem, setNamaitem] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [menu, setMenu] = useState('');
    
    let location = useLocation();
    let history = useHistory();

    const [paramQuery, setParamQuery] = useState('');
    const [paramLocation, setParamLocation] = useState('');
    const [paramMenu, setParamMenu] = useState('');

    useEffect(() => {
        if(location.pathname.includes('search')){
            let params = queryString.parse(location.search);
            setParamQuery(params.query);
            setParamLocation(params.location);
            setParamMenu(params.menu);
        }
    }, [paramQuery,paramLocation]);
    
    const handleSearch = (event) => {
        event.preventDefault();
        let querySearch = namaitem? namaitem : paramQuery;
        let locationSearch = lokasi? lokasi : paramLocation;
        let menuSearch =menu? menu : paramMenu;
        history.push({
            pathname: '/search',
            search : '?location='+locationSearch+'&query='+querySearch+'&menu='+menuSearch
        });
    }
    
    const classes = useStyles();

    return(
        <React.Fragment>
            <Container>
                <form className={classes.form} onSubmit={handleSearch}>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Name"
                            onChange={(e)=>{setNamaitem(e.target.value)}}/>
                    </Paper>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Location"
                            onChange={(e)=>{setLokasi(e.target.value)}}/>
                    </Paper>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Menu"
                            onChange={(e)=>{setMenu(e.target.value)}}/>
                        <IconButton 
                            type="submit" 
                            className={classes.iconButton2} 
                            aria-label="search">
                        </IconButton>
                    </Paper>
                </form>
            </Container>
        </React.Fragment>
    );
}

export default Searchbar;