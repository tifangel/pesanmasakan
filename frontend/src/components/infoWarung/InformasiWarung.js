import './InformasiWarung.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

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

const name = "Warung 1";
const address = "Jalan-jalan";
const category = "Makanan";

function InformasiWarung() {
  const classes = useStyles();

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
              {name}
            </p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>
              Alamat Warung: 
            </h1>
            <p>
              {address}
            </p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h1>
              Kategori Warung: 
            </h1>
            <p>
              {category}
            </p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default InformasiWarung;