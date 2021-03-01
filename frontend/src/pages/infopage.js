import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './styleinfo.css';
import {getWarung} from '../resource';
import MenuList from '../components/MenuList/MenuList'

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
  }));


const InfoPage = (props) => {
    const [id, setID] = useState(0);
    const [result, setResult] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        async function loadWarung(){
            try{
                
                setID(1);
    
                let response = await getWarung(id);
                console.log(response.data.values[0]);
                if (response.status == 200) {
                    setResult(response.data.values);
                    console.log(result);
                }
    
            }
            catch (e) {
                console.log(e);
            }
        }

        loadWarung();
    }, [id, result]);
    return (
        <div className={classes.root}>
        <div class="image">
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
        <MenuList data={
            [
                {id: '1', nama: 'Sup Ayam Kepiting Jagung'},
                {id: '2', nama: 'Sup Ayam Kepiting Jagung'},
                {id: '3', nama: 'Sup Ayam Kepiting Jagung'},
                {id: '4', nama: 'Sup Ayam Kepiting Jagung'}
            ]
            }/>
        </div>
    );
}

export default InfoPage;