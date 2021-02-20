import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WarungItem from './WarungItem';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardItem:{
    padding : 0
  }
}));

function WarungList({data}) {
  const classes = useStyles(); 

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 3;

  let lastIndex = currentPage * postPerPage;
  let firstIndex = lastIndex - postPerPage;

  let showWarung = [];
  if (data.length) {
    showWarung = data.slice(firstIndex, lastIndex);
  }

  let pageNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
      pageNumber.push(i);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            {showWarung.map((warung) => {
                return(
                    <Grid item xs={12} sm={6} md={4} key={warung.id} className={classes.cardItem}>
                            <WarungItem
                                data={warung}
                            />
                    </Grid>
                );
            })}
          </Grid>
          {data.length === 0 && <div style={{
                      paddingTop: "150px",
                      textAlign: "center"
          }}>Kosong</div>}
          {showWarung.length
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
                      onClick={() => setCurrentPage(currentPage < showWarung.length - 1
                      ? currentPage + 1
                      : currentPage)}>
                      &#62;
                  </span>
              </div>
              : 
              null
          }
        </Container>
      </main>
    </React.Fragment>
  );
}

export default WarungList;