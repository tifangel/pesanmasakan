import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardItem:{
    padding : 0
  }
}));

function MenuList({data, onMenuClick}) {
  const classes = useStyles(); 

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            {data.map((menu) => {
                return(
                    <Grid item xs={12} sm={12} md={6} key={menu.id} className={classes.cardItem}>
                            <MenuItem
                                data={menu}
                                onClick={onMenuClick}
                            />
                    </Grid>
                );
            })}
          </Grid>
          {data.length === 0 && <div style={{
                      paddingTop: "150px",
                      textAlign: "center"
          }}>Kosong</div>}
        </Container>
      </main>
    </React.Fragment>
  );
}

export default MenuList;