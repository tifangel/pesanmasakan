import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './profile'

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#F5F5F5",
        flexGrow: 1,
        padding: theme.spacing(5),
        paddingTop: theme.spacing(4),
    },
  }));

const MainContent = ({id}) => {

    var content;

    if(id===0){
        content = "Menu 1";
    }else if(id===1){
        content = "Menu 2";
    }else if(id===2){
        content = "Menu 3";
    }else if(id===3){
        content = <Profile/>;
    }

    const classes = useStyles();

    return(
        <main className={classes.root}>
            {content}
        </main>
    );
}

export default MainContent