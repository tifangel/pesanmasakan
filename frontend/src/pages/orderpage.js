import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./styleinfo.css";
import { getMenuListByWarungId } from "../resource";
import { Container, Divider, Paper, Typography } from "@material-ui/core";
import Keranjang from "../components/konfirmasiorder/keranjang";
import PilihPembayaran from "../components/konfirmasiorder/pilihpembayaran";

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

const OrderPage = (props) => {
  const [id, setID] = useState(0);
  const classes = useStyles();

  const [menuList, setMenuList] = useState([]);

  // untuk keranjang
  const [keranjang, setKeranjang] = useState(props.location.state || []);
  const [ongkir, setOngkir] = useState(10000);
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

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <PilihPembayaran />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Keranjang
                keranjang={keranjang}
                ongkir={ongkir}
                subtotal={subtotal}
                onItemCountChange={updateJumlahItem}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OrderPage;
