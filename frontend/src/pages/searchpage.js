import React, {useState, useEffect} from 'react';
import queryString from 'query-string';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Searchbar from '../components/Search/Searchbar';
import {getWarungList, getWarungListLimit} from '../resource';
import WarungList from '../components/WarungList/WarungList';
import { setDistance } from '../components/WarungList/Distance';
import Filter from '../components/filter/Filter';
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

    const [result, setResult] = useState([]); // the filtered data
    const [filtered, setFiltered] = useState([]);
    const [fullData, setFullData] = useState([]); // the unfiltered data
    const [length, setLength] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
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
                    setFullData(response.data.values);
                    setLength(response.data.values.length);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        loadWarungList();
    }, [props.location,datasearch,datalocation]);

    const handleFilter = (f) => {
        if (f.length === 0) {
            setResult(fullData);
            setLength(0);
        }
        else {
            setResult(f);
            setLength(f.length);
        }
    }

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

    console.log("res", result);
    console.log("res", currentResult);
    setDistance(currentResult);
    return(
        <React.Fragment>
            <Searchbar/>
            <Filter original={fullData} current={filtered} onFilter={handleFilter}/>
            <WarungList data={currentResult}/>
        </React.Fragment>
    );
}

export default SearchPage;