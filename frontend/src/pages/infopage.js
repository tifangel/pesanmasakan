import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './styleinfo.css';
import InfoTambahan from '../components/InfoTambahan';
import {getWarung, getMenuListByWarungId} from '../resource';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuList from '../components/MenuList/MenuList';
import MenuPopUp from '../components/MenuList/MenuPopUp';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    iconback: {
        margin: '20px',
    }
  }));


const InfoPage = (props) => {
    const [id, setID] = useState(0);
    const [result, setResult] = useState([]);
    const classes = useStyles();

    let location = useLocation();
    let history = useHistory();

    const [prevLocation, setPrevLocation] = useState('');
    const [menuList, setMenuList] = useState([]);

    const [menuInfo, setMenuInfo] = useState({});
    const [infoShowed, setInfoShowed] = useState(false);

    const handleShowInfoMenu = (menuData) => {
        setInfoShowed(true);
        setMenuInfo(menuData);
    }
    const handleCloseInfoMenu = (menuData) => {
        setInfoShowed(false);
    }
    

    useEffect(() => {
        async function loadWarung(){
            try{
                setID(props.match.params.id);
    
                let response = await getWarung(id);
                console.log(response.data.values[0]);
                
                if (response.status === 200) {
                    setResult(response.data.values);
                }

                let responseMenu = await getMenuListByWarungId(id);
                console.log(responseMenu.data.values);
                if (responseMenu.status === 200) {
                    setMenuList(responseMenu.data.values);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        let path = '/';
        if(location.state){
            path = location.state.prevLocation.concat(location.state.searchPath);
            console.log(path);
        }
        setPrevLocation(path);
        console.log(prevLocation);
        loadWarung();
    }, [id,location,prevLocation,props.match.params.id]);

    return (
        <React.Fragment>
        <InfoTambahan />
        <IconButton 
            className={classes.iconback}
            onClick = {()=>{
                history.push(prevLocation);
            }}
        >
            <ArrowBackIcon/>
        </IconButton>
        
        <div className={classes.root}>
        <div>
            <img src="/logo512.png"/>
        </div>
        <Grid container spacing={3}>
            <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h1>
                Nama Warung: 
                </h1>
                <p>
                {result.map(result => <div>{result.nama}</div>)}
                </p>
            </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h1>
                Alamat Warung: 
                </h1>
                <p>
                {result.map(result => <div>{result.alamat}</div>)}
                </p>
            </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h1>
                Kategori Warung: 
                </h1>
                <p>
                {result.map(result => <div>{result.kategori}</div>)}
                </p>
            </Paper>
            </Grid>
        </Grid>
        <MenuList 
            data={menuList}
            onMenuClick={handleShowInfoMenu}
        />
        <MenuPopUp 
            data={menuInfo} 
            open={infoShowed}
            onClose={handleCloseInfoMenu}
        />
        </div>
        </React.Fragment>
    );
}

export default InfoPage;