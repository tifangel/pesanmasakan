import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import queryString from 'query-string';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Searchbar from '../components/Search/Searchbar';
import {getWarungList, getWarungListLimit} from '../resource';
import WarungSearch from '../components/Search/WarungSearch';
import './styleSearchpage.css'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
    },
    grid: {
        
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

    const [currentPage,
        setCurrentPage] = useState(1);
    const postPerPage = 3;

    let history = useHistory();
    
    useEffect(() => {
        async function loadWarungList(){
            try{
                let params = queryString.parse(props.location.search);
                
                setDataSearch(params.query);
                setDataLocation(params.location);
    
                let response = await getWarungList(datasearch, datalocation);
                
                if (response.status == 200) {
                    setResult(response.data.values);
                }
    
            }
            catch (e) {
                console.log(e);
            }
        }

        loadWarungList();
    }, [props.location,datasearch,datalocation]);


    console.log(result.length);
    let lastIndex = currentPage * postPerPage;
    let firstIndex = lastIndex - postPerPage;

    let currentResult = [];

    if (result.length) {
        currentResult = result.slice(firstIndex, lastIndex);
    }

    let pageNumber = [];
    for (let i = 1; i <= Math.ceil(result.length / postPerPage); i++) {
        pageNumber.push(i);
    }

    const classes = useStyles();

    return(
        <React.Fragment>
            <Searchbar/>
            <Container className={classes.root}>
                <Grid container justify="center" spacing={2}>
                    {currentResult.map((item) => {
                        return(
                            <Grid className={classes.grid} item xs={12} sm={6} md={4} key={item.id} onClick={
                                ()=>{
                                    history.push({
                                        pathname : `/warung/${item.id}`,
                                        state: { id: item.id }
                                    });
                                }
                            }>
                                    <WarungSearch
                                        data={item}
                                    />
                            </Grid>
                        );
                    })}
                </Grid>
                {result.length === 0 && <div style={{
                            paddingTop: "150px",
                            textAlign: "center"
                }}>Kosong</div>}
                {currentResult.length
                    ? 
                    <div className="my-pagination" style={{
                        paddingTop: "50px"
                    }}>
                        <span
                            onClick={() => setCurrentPage(currentPage > 1
                                ? currentPage - 1
                                : currentPage)}>
                            &#60;
                        </span>
                        {pageNumber.map(item => {
                            return (
                                <span
                                    onClick={() => setCurrentPage(item)}
                                    key={item}
                                    className={`page-number ${currentPage === item && `current-page`}`}>{item}
                                </span>
                            )
                        })}
                        <span
                            onClick={() => setCurrentPage(currentPage < currentResult.length - 1
                            ? currentPage + 1
                            : currentPage)}>
                            &#62;
                        </span>
                    </div>
                    : 
                    null
                }
            </Container>
        </React.Fragment>
    );
}

export default SearchPage;