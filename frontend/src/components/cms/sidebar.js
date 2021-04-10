import React, {useState, useEffect} from 'react';
import MuiListItem from "@material-ui/core/ListItem";
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HistoryIcon from '@material-ui/icons/History';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        // width: '19.53125vw',
        flexShrink: 0,
    },
    drawerPaper: {
        // width: '19.53125vw',
        backgroundColor: '#08080C',
        color: '#9A7A18',
    },
    toolbar: theme.mixins.toolbar,
    dividerColor: {
        backgroundColor: '#717181',
    },
    listItemText: {
        fontSize : '1.5em',
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

const Sidebar = ({id, mobile, onMenuClick}) => {

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.toolbar} />
            <List>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 0}
                    onClick={event => onMenuClick(event, 0, mobile)}
                >
                    <ListItemIcon>
                        <DashboardIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Dashboard"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 1}
                    onClick={event => onMenuClick(event, 1, mobile)}
                >
                    <ListItemIcon>
                        <MenuBookIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Products"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 2}
                    onClick={event => onMenuClick(event, 2, mobile)}
                >
                    <ListItemIcon>
                        <ShoppingBasketIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Orders"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 3}
                    onClick={event => onMenuClick(event, 3, mobile)}
                >
                    <ListItemIcon>
                        <HistoryIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="History"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
                <ListItem button 
                    selected={id === 4}
                    onClick={event => onMenuClick(event, 4, mobile)}
                >
                    <ListItemIcon>
                        <StorefrontIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText classes={{primary:classes.listItemText}} primary="Profile"/>
                </ListItem>
                <Divider classes={{root: classes.dividerColor}}/>
            </List>
        </React.Fragment>
    );
}

export default Sidebar