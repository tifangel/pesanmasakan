import React from 'react';
import {useHistory} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

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
    
    return(
        <React.Fragment>
            <Grid container wrap="nowrap" direction="column" spacing={2} onClick={handleShowItem}>
                <Grid item>
                    
                </Grid>
                <Grid item zeroMinWidth>
                    <Typography noWrap>{data.nama}</Typography>
                    <Typography noWrap>{data.alamat}</Typography>
                    <Typography noWrap>{data.kategori}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default WarungSearch;