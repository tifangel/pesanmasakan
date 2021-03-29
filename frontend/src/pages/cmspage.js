import React, {useState, useEffect} from 'react';
import Sidebar from '../components/cms/sidebar';
import MainContent from '../components/cms/maincontent';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      appBar: {
        background: 'transparent',
        boxShadow: 'none',
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
      icon: {
        fontSize: '30px',
        color: 'black',
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#08080C',
        color: '#9A7A18',
      },
  }));

const CMSPage = (props) => {
    const [username, setUsername] = useState("jundu");
    const [idWarung, setIdWarung] = useState(1);

    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleListMenuClick = (event, id, mobile) => {
        setSelectedMenu(id);
        if(mobile){
          handleDrawerToggle();
        }
    };

    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const classes = useStyles();

    const container = window !== undefined ? () => window().document.body : undefined;

    return(
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon className={classes.icon}/>
                    </IconButton>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden mdUp implementation="css">
                      <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                          paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                          keepMounted: true,
                        }}
                      >
                          <Sidebar 
                              id={selectedMenu}
                              mobile={true} 
                              onMenuClick={handleListMenuClick}
                          />
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                      <Drawer
                        classes={{
                          paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                      >
                          <Sidebar
                            id={selectedMenu} 
                            mobile={false}
                            onMenuClick={handleListMenuClick}
                          />
                      </Drawer>
                  </Hidden>
                </nav>
                <MainContent id={selectedMenu} username={username} idWarung={idWarung}/>
            </div>
        </React.Fragment>
    );
}

export default CMSPage