import React, {useState, useEffect} from 'react';
import Sidebar from '../components/cms/sidebar';
import MainContent from '../components/cms/maincontent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
  }));

const CMSPage = (props) => {
    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleListMenuClick = (event, id) => {
        setSelectedMenu(id);
    };

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.root}>
                <Sidebar id={selectedMenu} onMenuClick={handleListMenuClick}/>
                <MainContent id={selectedMenu}/>
            </div>
        </React.Fragment>
    );
}

export default CMSPage