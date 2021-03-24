import React, {useState, useEffect} from 'react';
import Drawer from "@material-ui/core/Drawer";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemIcon from "@material-ui/core/ListItemIcon";
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        width: '19.53125vw',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '19.53125vw',
        backgroundColor: '#08080C',
        color: '#9A7A18',
    },
    toolbar: theme.mixins.toolbar,
    dividerColor: {
        backgroundColor: '#717181',
    },
    listItemText: {
        fontSize : '1.875em',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
    },
    icon: {
        color: '#FDCB35',
        fontSize: '1.875em',
    },
  }));

const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "#292727",
        color: "#FDCB35"
      },
      "&$selected:hover": {
        backgroundColor: "#292727",
        color: "#9A7A18"
      },
      "&:hover": {
        backgroundColor: "#292727",
        color: "#FDCB35",
      },
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
                        <DashboardIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Dashboard"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 1}
                    onClick={event => onMenuClick(event, 1)}
                >
                    <ListItemIcon>
                        <MenuBookIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Products"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 2}
                    onClick={event => onMenuClick(event, 2)}
                >
                    <ListItemIcon>
                        <ShoppingBasketIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Orders"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 3}
                    onClick={event => onMenuClick(event, 3)}
                >
                    <ListItemIcon>
                        <StorefrontIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Profile"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
            </List>
        </Drawer>
    );
}

export default Sidebar