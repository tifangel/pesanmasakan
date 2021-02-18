import './WarungList.css';

import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  media: {
    height: 200,
  },
  root: {
    height : 440
  },
  warungName: {

  },
  warungDescription:{

  },
}));

const warungList = [
  {"id" : 1, "name": "Warung 1", "desc" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",},
  {"id" : 2, "name": "Warung 2", "desc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",},
  {"id" : 3, "name": "Warung 3", "desc" : "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",},
  {"id" : 4, "name": "Warung 4", "desc" : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",},
  {"id" : 5, "name": "Warung 5", "desc" : "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",},
];

function WarungList() {
  const classes = useStyles(); 

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {warungList.map((warung) => (
              <Grid item key={warung.id} xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                    <CardMedia
                      className={classes.media}
                      image="/logo512.png"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <h3 className={classes.warungName}>
                        {warung.name}
                      </h3>
                      <p className={classes.warungDescription}>
                        {warung.desc}
                      </p>
                    </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default WarungList;