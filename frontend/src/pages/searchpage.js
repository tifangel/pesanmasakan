import React, {useState, useEffect} from 'react';
import queryString from 'query-string';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Searchbar from '../components/Search/Searchbar';
import {getWarungList, getWarungListLimit} from '../resource';
import WarungItem from '../components/WarungList/WarungItem';
import WarungList from '../components/WarungList/WarungList';
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
    
    useEffect(() => {
        async function loadWarungList(){
            try{
                let params = queryString.parse(props.location.search);
                
                setDataSearch(params.query);
                setDataLocation(params.location);
    
                let response = await getWarungList(datasearch, datalocation);
                
                if (response.status === 200) {
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
            <WarungList data={result}/>
        </React.Fragment>
    );
}

export default SearchPage;