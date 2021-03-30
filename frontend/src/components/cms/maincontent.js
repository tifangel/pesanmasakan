import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormMenu from './formmenu'
import Profile from './profile'
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

const MainContent = ({ id, menuList }) => {

    // Content Menu Profile
    // useEffect(() => {
    //     async function loadWarungList(){
    //         try{

    //         }
    //         catch (e) {
    //             console.log(e)
    //         }
    //     }
    // },[])
    const [dataFormProfile, setDataFormProfile] = useState({
        username: "jundu",
        id_warung: 1,
        nama_warung: "Lalapan Lahap",
        nama_owner: "jundullah",
        no_hp: "081234568",
        email: "jundu.lalapan@mail.com",
        alamat: "Jl peternakan no 45",
        kategori: "chicken & duck",
        pic: "/warung/lalapan-lahap.jpg",
    })


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
        setDataFormMenu(data);
    }

    const resetStatusFormMenu = () => {
        setStatusFormMenu('insert');
    }



    // Handling Main Content
    var content;

    if (id === 0) {
        content = "Menu 1";
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
                        <Paper style={{ marginTop: 30 }}><MenuListPenjual data={menuList} onEdit={changeStatusFormtoEdit} /></Paper>
                    </React.Fragment>;
    } else if (id === 2) {
        content = "Menu 3";
    } else if (id === 3) {
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