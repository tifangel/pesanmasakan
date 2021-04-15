import React, { useEffect, useState } from 'react';
import {useAppContext} from '../../lib/contextLib'
import { makeStyles } from '@material-ui/core/styles';
import FormMenu from './formmenu'
import Profile from './profile'
import Title from './title'
import MenuListPenjual from './MenuListPenjual';
import Orders from './orders';
import History from './history';
import { Paper } from '@material-ui/core';
import DashboardInfo from './dashboardinfo';
import DashboardPlot from './dashboardplot';
import { getMenuListByWarungId, getDaysbyMenuId } from "../../resource";
import { deleteMenu } from '../../resource';

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

const MainContent = ({ id}) => {

    // Content Menu Profile
    const { user } = useAppContext();
    const [dataFormProfile, setDataFormProfile] = useState({})

    useEffect(() => {
        if (user) {
            setDataFormProfile(user)
        }
    }, [user])


    // Content Menu Products
    // Handling Form Menu
    const handleInput = (event) => {
        setDataFormMenu({ ...dataFormMenu, [event.target.name]: event.target.value });
      };

    const handleChange = (event) => {
        setDaysMenu({ ...daysMenu, [event.target.name]: event.target.checked });
      };
    const [dataFormMenu, setDataFormMenu] = useState({
        nama: "",
        harga: 0,
        desc_menu: "",
        pic: "",
        id: 48, // ID_MENU
        id_warung: 1,
    });
    const [daysMenu, setDaysMenu] = useState({
        senin: false,
        selasa: false,
        rabu: false,
        kamis: false,
        jumat: false,
        sabtu: false,
        minggu: false,
    });
    const [statusFormMenu, setStatusFormMenu] = useState('insert');

    const changeStatusFormtoEdit = (data) => {
        setStatusFormMenu('edit');
        setDataFormMenu(data)
        console.log(data)
    }

    const resetStatusFormMenu = () => {
        setStatusFormMenu('insert');
    }
    
    // Daftar menu (masakan)
    const [menuList, setMenuList] = useState([]);
    useEffect(() => {
      async function loadMenu() {
        try {
  
          let responseMenu = await getMenuListByWarungId(dataFormProfile.id_warung);
          if (responseMenu.status === 200) {
            setMenuList(responseMenu.data.values);
          }
        } catch (e) {
          console.log(e);
        }
      }
      loadMenu();
    }, []);

    const onDeleteMenu = (id) => {
        if(window.confirm("Anda yakin ingin menghapus menu?")){
            const deleteAsync = async() => {
                await deleteMenu({id: id});
                setMenuList(menuList.filter(it => it.id !== id));
            };
            deleteAsync();
        }
    }

    // Handling Main Content
    var content;

    if (id === 0) {
        content = <React.Fragment>
                    <Title nama={dataFormProfile.nama_warung}/>
                    <DashboardInfo id_warung={dataFormProfile.id_warung}></DashboardInfo>
                    <DashboardPlot id_warung={dataFormProfile.id_warung}></DashboardPlot>
                </React.Fragment>;
    } else if (id === 1) {
        content =   <React.Fragment>
                        <Paper>
                            <FormMenu
                                datamenu={dataFormMenu}
                                statedays={daysMenu}
                                status={statusFormMenu}
                                handleChange={handleChange}
                                handleInput={handleInput}
                                resetStatusFormMenu={resetStatusFormMenu}
                            />
                        </Paper>
                        <Paper style={{ marginTop: 30 }}>
                            <MenuListPenjual data={menuList} onEdit={changeStatusFormtoEdit} onDelete={onDeleteMenu}/>
                        </Paper>
                    </React.Fragment>;
    } else if (id === 2) {
        content = <Orders data={dataFormProfile} />;
    } else if (id === 3) {
        content = <History data={dataFormProfile} />;
    } else if (id === 4) {
        content = <Profile data={dataFormProfile} />
    }

    const classes = useStyles();

    return (
        <main className={classes.root}>
            {content}
        </main>
    );
}

export default MainContent