import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormMenu from './formmenu'
import Profile from './profile'
import Test from './test'
import MenuListPenjual from './MenuListPenjual';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#F5F5F5",
        flexGrow: 1,
        padding: theme.spacing(5),
        paddingTop: theme.spacing(0),
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(5),
        },
    },
    toolbar: theme.mixins.toolbar,
  }));

const MainContent = ({id, menuList}) => {

    const [stateProfile, setStateProfile] = useState('show');
    const [stateEditProfile, setStateEditProfile] = useState('hide');

    const gotoEditProfile = () => {
        setStateProfile('hide');
        setStateEditProfile('show');
    }
    const submitChange = () => {
        setStateProfile('show');
        setStateEditProfile('hide');
    }

    var content;

    if(id===0){
        content = "Menu 1";
    }else if(id===1){
        content = <React.Fragment><Paper><FormMenu/></Paper><Paper style={{marginTop: 30}}><MenuListPenjual data={menuList} /></Paper></React.Fragment>;
    }else if(id===2){
        content = "Menu 3";
    }else if(id===3){
        content = <div>
                        { stateProfile === 'show' && (<Profile onClick={gotoEditProfile}/>)}
                        { stateEditProfile === 'show' && (<Test onClick={submitChange}/>)}
                  </div>
    }

    const classes = useStyles();

    return(
        <main className={classes.root}>
            {content}
        </main>
    );
}

export default MainContent