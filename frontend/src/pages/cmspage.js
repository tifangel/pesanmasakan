import React, {useState, useEffect} from 'react';
import Sidebar from '../components/cms/sidebar';
import MainContent from '../components/cms/maincontent';
import { makeStyles } from '@material-ui/core/styles';
import { getMenuListByWarungId, getDaysbyMenuId } from "../resource";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
  }));

const CMSPage = (props) => {

    // Menu pada sidebar
    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleListMenuClick = (event, id) => {
        setSelectedMenu(id);
    };

    
    // Daftar menu (masakan)
    const [menuList, setMenuList] = useState([]);
    useEffect(() => {
      async function loadMenu() {
        try {
  
          let responseMenu = await getMenuListByWarungId(props.match.params.id || 1);
          if (responseMenu.status === 200) {
            setMenuList(responseMenu.data.values);
          }
        } catch (e) {
          console.log(e);
        }
      }
      loadMenu();
    }, [props.match.params.id]);

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.root}>
                <Sidebar id={selectedMenu} onMenuClick={handleListMenuClick}/>
                <MainContent id={selectedMenu} menuList={menuList}/>
            </div>
        </React.Fragment>
    );
}

export default CMSPage