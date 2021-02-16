import React, {useState, useEffect} from 'react';
import queryString from 'query-string';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import NavMain from '../components/Navbar/NavMain';
import {getWarungList, getWarungListLimit} from '../resource';
import WarungSearch from '../components/Search/WarungSearch';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grid: {
        width: '25%',
    },
    button: {
        width: '100%',
        marginTop: 50,
        marginBottom: 50,
    }
  }));

const SearchPage = (props) => {

    const [datasearch, setDataSearch] = useState('');
    const [datalocation, setDataLocation] = useState('');
    const [result,setResult] = useState([]);

    const [allResult, setAllResult] = useState([]);
    const [offset, setOffset] = useState(0);
    // const [limit, setLimit] = useState(3);

    useEffect(() => {
        
        loadWarungList();

    }, [props.location,datasearch]);

    async function loadWarungList(){
        try{
            let params = queryString.parse(props.location.search);
            
            setDataSearch(params.query);
            setDataLocation(params.location);
            
            let responseAll = await getWarungList(datasearch, datalocation);

            const data = {title:datasearch, location:datalocation, offset:offset};
            let response = await getWarungListLimit(data);
            
            if (response.status == 200 && responseAll.status == 200) {
                setAllResult(responseAll.data.values);
                console.log("Jumlah all result = ", allResult.length);
                console.log("Jumlah offset = ",offset);
                
                // let newResult = result.concat(response.data.values.filter((item) => result.indexOf(item) < 0));
                let newResult = result.concat(response.data.values);
                setResult(newResult);
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    // let offset = 0;
    const onLoadMore = () => {
        // offset += 3;

        let skip = offset+3;
        setOffset(3);

        if(offset < allResult.length){

            loadWarungList();
        }
    }

    const classes = useStyles();

    return(
        <React.Fragment>
            <NavMain/>
            <Container className={classes.root}>
                <Grid container justify="center" spacing={2}>
                    {result.map((item) => {
                        return(
                            <Grid className={classes.grid} item md={3} key={item.id}>
                                <Paper className={classes.paper}>
                                    <WarungSearch
                                        data={item}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
                <Button variant="outlined" className={classes.button} onClick={onLoadMore}>
                    Load more
                </Button>
            </Container>
        </React.Fragment>
    );
}

export default SearchPage;