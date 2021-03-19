import React, {useState, useEffect} from 'react';
import Drawer from "@material-ui/core/Drawer";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        width: '300px',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '300px',
        backgroundColor: '#08080C',
        color: '#9A7A18',
        fontSize : 30,
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
    },
    toolbar: theme.mixins.toolbar,
    dividerColor: {
        backgroundColor: '#717181',
    },
  }));

const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "#292727",
        color: "#FDCB35"
      },
      "&$selected:hover": {
        backgroundColor: "purple",
        color: "white"
      },
      "&:hover": {
        backgroundColor: "blue",
        color: "white",
        ListItemIcon: {
            color: "black",
        }
      },
      ListItemIcon: {
        color: '#FDCB35',
      }
    },
    selected: {}
  })(MuiListItem);

// const ListItemIcon = withStyles({
//     root: {
//       "&$selected": {
//         color: "blue"
//       },
//       "&$selected:hover": {
//         color: "red"
//       },
//       "&:hover": {
//         color: "black"
//       },
//       color: '#FDCB35',
//     },
//   })(MuiListItemIcon);

const Sidebar = ({id, onMenuClick}) => {

    const classes = useStyles();

    return(
        <Drawer
            variant="permanent"
            className={classes.root}
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <List>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 0}
                    onClick={event => onMenuClick(event, 0)}
                >
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 1}
                    onClick={event => onMenuClick(event, 1)}
                >
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Products"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 2}
                    onClick={event => onMenuClick(event, 2)}
                >
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Orders"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 3}
                    onClick={event => onMenuClick(event, 3)}
                >
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
            </List>
        </Drawer>
    );
}

export default Sidebar