import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Typography } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalMallIcon from "@material-ui/icons/LocalMall";

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#000",
    marginLeft: theme.spacing(1),
  },
  buttonInactive: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    color: "#FDCB35",
    backgroundColor: "#FFF",
    "&:hover": {
      color: "#FDCB35",
      backgroundColor: "#FFF",
    },
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    color: "#FFF",
    backgroundColor: "#FDCB35",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#FDCB35",
    },
  },
}));

export default function PilihPembayaran({kurir, setKurir, carabayar, setCarabayar}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h6"
        gutterBottom
        className={classes.title}
      >
        Pilih Kurir
      </Typography>
      <div>
        <Button
          variant="contained"
          size="large"
          className={kurir === 0 ? classes.button : classes.buttonInactive}
          startIcon={<LocalShippingIcon />}
          onClick={() => setKurir(0)}
        >
          Delivery Service
        </Button>
        <Button
          variant="contained"
          size="large"
          className={kurir === 1 ? classes.button : classes.buttonInactive}
          startIcon={<LocalMallIcon />}
          onClick={() => setKurir(1)}
        >
          Self Pickup
        </Button>
      </div>

      <Divider style={{ marginTop: 40, marginBottom: 40 }} />

      <Typography
        component="h2"
        variant="h6"
        gutterBottom
        className={classes.title}
      >
        Pilih Metode Pembayaran
      </Typography>
      <div>
        <Button
          variant="contained"
          size="large"
          className={carabayar === 0 ? classes.button : classes.buttonInactive}
          startIcon={<AccountBalanceIcon />}
          onClick={() => setCarabayar(0)}
        >
          Bank Transfer
        </Button>
        <Button
          variant="contained"
          size="large"
          className={carabayar === 1 ? classes.button : classes.buttonInactive}
          startIcon={<PhoneAndroidIcon />}
          onClick={() => setCarabayar(1)}
        >
          E-money
        </Button>
        <Button
          variant="contained"
          size="large"
          className={carabayar === 2 ? classes.button : classes.buttonInactive}
          startIcon={<AttachMoneyIcon />}
          onClick={() => setCarabayar(2)}
        >
          Cash
        </Button>
      </div>
    </React.Fragment>
  );
}
