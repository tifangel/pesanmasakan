import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import "./styleinfo.css";
import AppHeader from "../components/header";
import { getWarung, getMenuListByWarungId, getDaysbyMenuId } from "../resource";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import NearMeIcon from "@material-ui/icons/NearMe";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuList from "../components/MenuList/MenuList";
import MenuPopUp from "../components/MenuList/MenuPopUp";
import Keranjang from "../components/konfirmasiorder/keranjang";
import { Paper } from "@material-ui/core";

const { defaultAPIURL } = require("../config");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
  },
  iconback: {
    margin: "3% 0 0 3%",
    backgroundColor: "#FDCB35",
  },
  info: {
    padding: "6.5% 0 13% 0",
  },
  cat: {
    display: "inline",
    padding: 0,
    backgroundColor: "#FDCB35",
    fontSize: "1.95vw",
    fontFamily: "Inter",
    fontWeight: "light",
    position: "relative",
    top: "3px",
    left: "18%",
  },
  title: {
    color: "#FDCB35",
    fontSize: "4.5vw",
    fontFamily: "Roboto Slab",
    fontWeight: "black",
    width: "73vw",
    margin: 0,
    paddingTop: "0.2vw",
    paddingBottom: "0.2vw",
    backgroundColor: "#08080C",
    borderRadius: "25px",
    textAlign: "center",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  smalltitle: {
    color: "#FDCB35",
    fontSize: "4.5vw",
    fontFamily: "Roboto Slab",
    fontWeight: "black",
    margin: 0,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#08080C",
    textAlign: "center",
    position: "relative",
  },
  detail: {
    width: "68vw",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  boxdetail: {
    padding: 0,
    margin: 0,
    paddingTop: 0.3,
    paddingLeft: 6,
    fontSize: "1.17vw",
    fontFamily: "Inter",
    fontWeight: "light",
  },
  basket: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    border: "0.5px solid #C4C4C4",
    borderRadius: "5px",
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  smallbasket: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    border: "0.5px solid #C4C4C4",
    borderRadius: "5px",
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

function pick(optbig, optsmall) {
  return window.innerWidth > 768 ? optbig : optsmall;
}

const InfoPage = (props) => {

  const [isAuthenticated, userHasAuthenticated] = useState(
      localStorage.getItem("token") ? true : false
  );

  const [id, setID] = useState(0);
  const [result, setResult] = useState([]);
  const [pathpic, setpathpic] = useState("");
  const classes = useStyles();

  let location = useLocation();
  let history = useHistory();

  const [prevLocation, setPrevLocation] = useState("");
  const [menuList, setMenuList] = useState([]);

  const [menuInfo, setMenuInfo] = useState({});
  const [days, setDays] = useState([]);
  const [infoShowed, setInfoShowed] = useState(false);

  // untuk keranjang
  const [keranjang, setKeranjang] = useState([]);
  const [subtotal, setSubtotal] = useState(
    keranjang.reduce((total, it) => total + it.harga * it.jumlah, 0)
  );
  const updateJumlahItem = (id, jumlah) => {
    setKeranjang(
      keranjang
        .map((it) => {
          if (it.id === id) it.jumlah = Math.min(Math.max(jumlah, 0), 9);
          return it;
        })
        .filter((it) => it.jumlah > 0)
    );
    setSubtotal(
      keranjang.reduce((total, it) => total + it.harga * it.jumlah, 0)
    );
  };
  const onBayar = () => {
    if (!keranjang.length) return;
    if(!isAuthenticated){
      alert("Anda harus login");
      return;
    }
    const alamat = prompt("Alamat anda?", "alamat");
    if (!alamat) {
      alert("Login gagal");
      return;
    }
    const handleSuccess = (position) => {
      history.push({
        pathname: "/konfirmasi/",
        state: {
          alamat: alamat,
          keranjang: keranjang,
          warung_id: props.match.params.id,
          user_position: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
        },
      });
    };
    const handleError = (err) => {
      alert("Izin akses lokasi dibutuhkan!");
    };
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    });
  };

  async function loadDays(id) {
    try {
      let response = await getDaysbyMenuId(id);

      if (response.status === 200) {
        setDays(response.data.values);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleShowInfoMenu = (menuData) => {
    setInfoShowed(true);
    setMenuInfo(menuData);
    loadDays(menuData.id);
  };
  const handleCloseInfoMenu = () => {
    setInfoShowed(false);
  };
  const addToKeranjang = () => {
    const alreadyHave = keranjang.reduce(
      (alreadyHave, it) => (it.id === menuInfo.id ? it.jumlah : alreadyHave),
      0
    );
    if (alreadyHave) {
      updateJumlahItem(menuInfo.id, alreadyHave + 1);
    } else {
      setKeranjang([
        ...keranjang,
        {
          id: menuInfo.id,
          nama: menuInfo.nama,
          harga: menuInfo.harga,
          jumlah: 1,
          pic: menuInfo.pic,
        },
      ]);
      setSubtotal(subtotal + menuInfo.harga);
    }
    setInfoShowed(false);
  };

  useEffect(() => {
    async function loadWarung() {
      try {
        setID(props.match.params.id);

        let response = await getWarung(id);

        if (response.status === 200) {
          setResult(response.data.values);
          setpathpic(response.data.values[0].pic);
        }

        let responseMenu = await getMenuListByWarungId(id);
        if (responseMenu.status === 200) {
          setMenuList(responseMenu.data.values);
        }
      } catch (e) {
        console.log(e);
      }
    }
    let path = "/";
    if (location.state) {
      path = location.state.prevLocation.concat(location.state.searchPath);
    }
    setPrevLocation(path);
    loadWarung();
  }, [id, location, prevLocation, props.match.params.id, pathpic]);

  return (
    <React.Fragment>
      <AppHeader/>
      <div className={classes.root}>
        <div
          style={{
            backgroundImage: `url(${defaultAPIURL + pathpic})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: pick("block", "none"),
          }}
        >
          <IconButton
            className={classes.iconback}
            onClick={() => {
              history.push(prevLocation);
            }}
          >
            <ArrowBackIcon style={{ color: "#08080C", fontSize: "1em" }} />
          </IconButton>
          {result.map((result) => (
            <div className={classes.info}>
              <div className={classes.cat}>{result.kategori}</div>
              <div className={classes.title}>{result.nama}</div>
              <Box
                className={classes.detail}
                display="flex"
                flexDirection="row-reverse"
                p={0}
                m={0}
                bgcolor="#FFFFFF"
              >
                <Box display="flex" p={1} marginLeft="5%" marginRight="2%">
                  <NearMeIcon style={{ color: "#FDCB35", fontSize: "1.5vw" }} />
                  <Box className={classes.boxdetail}>{result.alamat}</Box>
                </Box>
                <Box display="flex" p={1} marginLeft="5%">
                  <LocationOnIcon
                    style={{ color: "#FDCB35", fontSize: "1.5vw" }}
                  />
                  <Box className={classes.boxdetail}>1.2km</Box>
                </Box>
                <Box display="flex" p={1}>
                  <StarIcon style={{ color: "#FDCB35", fontSize: "1.5vw" }} />
                  <Box className={classes.boxdetail}>3</Box>
                </Box>
              </Box>
            </div>
          ))}
        </div>
        {window.innerWidth > 768 ? null : (
          <div className={classes.smalltitle}>{(result[0] !== undefined)? result[0].nama : "Lalapan Lahab"}</div> // sengaja typo biar tau kalau eror
        )}
        <Grid container spacing={0}>
          {window.innerWidth > 768 ? (
            <Grid item xs={12} sm={12} md={8}>
              <MenuList data={menuList} onMenuClick={handleShowInfoMenu} />
            </Grid>
          ) : null}
          <Grid item xs={12} sm={12} md={4}>
            <Paper className={pick(classes.basket, classes.smallbasket)}>
              <Keranjang
                keranjang={keranjang}
                subtotal={subtotal}
                onItemCountChange={updateJumlahItem}
                onBayar={onBayar}
              />
            </Paper>
          </Grid>
          {window.innerWidth > 768 ? null : (
            <Grid item xs={12} sm={12} md={8}>
              <MenuList data={menuList} onMenuClick={handleShowInfoMenu} />
            </Grid>
          )}
        </Grid>
        <MenuPopUp
          data={menuInfo}
          days={days}
          open={infoShowed}
          onClose={handleCloseInfoMenu}
          onPesan={addToKeranjang}
        />
      </div>
    </React.Fragment>
  );
};

export default InfoPage;
