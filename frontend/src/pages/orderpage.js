import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./styleinfo.css";
import { getMenuListByWarungId, insertPesanan } from "../resource";
import { Container, Paper } from "@material-ui/core";
import Keranjang from "../components/konfirmasiorder/keranjang";
import PilihPembayaran from "../components/konfirmasiorder/pilihpembayaran";
import AppHeader from "../components/header";
import { useHistory } from "react-router-dom";
import { getWarung } from "../resource/index";
import Authenticated from '../layout/Authenticated'
import { useAppContext } from '../lib/contextLib'

const { defaultAPIURL } = require("../config");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 500,
  },
}));
function hitungOngkir(lat1, lon1, lat2, lon2) {
  console.log(lat1, lon1, lat2, lon2);
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Javascript functions in radians
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = Number((R * c).toFixed(1)); // Distance in km
  console.log(dist);
  return Math.round(dist) * 100;
}

const OrderPage = (props) => {

  const { user } = useAppContext();
  const [pageUser, setPageUser] = useState({})

  useEffect(() => {
      if (user) {
          setPageUser(user)
      }
  }, [user])


  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(props.location.state);
  const [kurir, setKurir] = useState(0);
  const [carabayar, setCarabayar] = useState(0);
  const [keranjang, setKeranjang] = useState(state.keranjang || []);
  const [ongkir, setOngkir] = useState(0);


  const onBayar = () => {
    const total = kurir === 1 ? 0 + subtotal : ongkir + subtotal;

    var tanggal_jam = '';
    const d = new Date();
    var tanggal = d.toISOString().split("T")[0];
    var jam = d.getHours();
    var menit = d.getMinutes();
    var detik = d.getSeconds();
    tanggal_jam = tanggal_jam.concat(tanggal);
    tanggal_jam = tanggal_jam.concat(' ');
    tanggal_jam = tanggal_jam.concat(jam);
    tanggal_jam = tanggal_jam.concat(':');
    tanggal_jam = tanggal_jam.concat(menit);
    tanggal_jam = tanggal_jam.concat(':');
    tanggal_jam = tanggal_jam.concat(detik);

    var tgl_kirim = '2021-04-20 12:00:00';
    
    let orderData = {
      username_pembeli: pageUser.username,
      tgl_transaksi: tanggal_jam,
      tgl_kirim: tgl_kirim,
      total: total,
      alamat: state.alamat,
      longitude: state.user_position.longitude,
      latitude: state.user_position.latitude,
      orders: keranjang.map((it) => {
        return { id_menu: it.id, qty: it.jumlah };
      }),
      id_warung: state.warung_id,
    };
    insertPesanan(orderData);
    history.push('/pesanan');
  };

  // untuk keranjang
  
  const [subtotal, setSubtotal] = useState(
    keranjang.reduce((total, it) => total + it.harga * it.jumlah, 0)
  );
  const updateJumlahItem = (id, jumlah) => {
    const newKeranjang = keranjang
      .map((it) => {
        if (it.id === id) it.jumlah = Math.min(Math.max(jumlah, 0), 9);
        return it;
      })
      .filter((it) => it.jumlah > 0);
    if (newKeranjang.length === 0) history.goBack();
    setKeranjang(newKeranjang);
    setSubtotal(
      keranjang.reduce((total, it) => total + it.harga * it.jumlah, 0)
    );
  };

  useEffect(() => {
    async function loadWarungInfo() {
      try {
        let response = await getWarung(state.warung_id);

        if (response.status === 200) {
          setOngkir(
            hitungOngkir(
              state.user_position.latitude,
              state.user_position.longitude,
              response.data.values[0].latitude,
              response.data.values[0].longitude
            )
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadWarungInfo();
  }, []);

  return (
    <Authenticated>
      { pageUser &&
          <React.Fragment>
              <AppHeader/>
              <div className={classes.root}>
                <Container maxWidth="lg" className={classes.container}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Paper className={classes.paper}>
                        <PilihPembayaran
                          kurir={kurir}
                          carabayar={carabayar}
                          setKurir={setKurir}
                          setCarabayar={setCarabayar}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper className={classes.paper}>
                        <Keranjang
                          keranjang={keranjang}
                          ongkir={kurir === 1 ? 0 : ongkir}
                          subtotal={subtotal}
                          onItemCountChange={updateJumlahItem}
                          onBayar={onBayar}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </div>
          </React.Fragment>
      }
    </Authenticated>
  );
};

export default OrderPage;
