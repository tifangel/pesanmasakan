import React, {useState, useEffect} from 'react';
import queryString from 'query-string';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Searchbar from '../components/Search/Searchbar';
import {getWarungList, getMenuList} from '../resource';
import WarungList from '../components/WarungList/WarungList';
import MenuList from '../components/MenuList/MenuList';
import Filter from '../components/filter/Filter';
import './styleSearchpage.css';

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
    const [datamenu, setDataMenu] = useState('');

    const [result,setResult] = useState([]); // the filtered data
    const [resultMenu, setResultMenu] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [fullData, setFullData] = useState([]); // the unfiltered data
    const [length, setLength] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 3;

    function setDistance(fullData){
        navigator.geolocation.getCurrentPosition(handleSuccess,handleError, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    
        function handleSuccess(position){
            const R = 6371; // Radius of the earth in km
            const lon1 = position.coords.longitude;
            const lat1 = position.coords.latitude;
            for (var i = 0; i < fullData.length; i++){
                const lat2 = fullData[i].latitude;
                const lon2 = fullData[i].longitude;
                const dLat = (lat2-lat1) * (Math.PI / 180);  // Javascript functions in radians
                const dLon = (lon2-lon1) * (Math.PI / 180); 
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1* (Math.PI / 180)) * Math.cos(lat2* (Math.PI / 180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                const d = Number((R *c ).toFixed(1)); // Distance in km  
                fullData[i]["distance"] = [];
                fullData[i].distance = d;
            }
            setFullData(fullData);
        }
    
    
        function handleError(error){
            //Handle Errors
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                    break;
            }
        }
    }
    
    useEffect(() => {
        async function loadWarungList(){
            try{
                let params = queryString.parse(props.location.search);
                
                setDataSearch(params.query);
                setDataLocation(params.location);
                setDataMenu(params.menu);
    
                let response;
                let responseMenu;

                response = await getWarungList(datasearch, datalocation);
                responseMenu = await getMenuList(datamenu);
                
                if (response.status === 200) {
                    setResult(response.data.values);
                    setDistance(response.data.values);
                    setLength(response.data.values.length);
                }

                if (responseMenu.status === 200){
                    setResultMenu(responseMenu.data.values);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        loadWarungList();
    }, [props.location,datasearch,datalocation,datamenu]);

    const handleFilter = (f, n) => {
        if (n === 0) {
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

    // console.log("ddata", dData);
    // console.log("res", currentResult);
    // setDistance(currentResult);
    // setDistance(fullData);
    return(
        <React.Fragment>
            <Searchbar/>
            <Filter original={fullData} current={filtered} onFilter={handleFilter}/>
            <WarungList data={result}/>
            <MenuList data={resultMenu}/>
        </React.Fragment>
    );
}

export default SearchPage;