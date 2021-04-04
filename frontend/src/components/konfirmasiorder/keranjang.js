import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const { defaultAPIURL } = require("../../config");

function preventDefault(event) {
  event.preventDefault();
}

function formatMoney(money) {
  if (money >= 1000) {
    return `Rp${Math.floor(money / 1000)}.${
      money % 1000 < 10
        ? `00${money % 1000}`
        : money % 1000 < 100
        ? `0${money % 1000}`
        : money % 1000
    }`;
  } else {
    return `Rp${money}`;
  }
}

const useStyles = makeStyles((theme) => ({
  summary: {
    marginTop: theme.spacing(1),
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(1),
    color: "#FFF",
    backgroundColor: "#FDCB35",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#FDCB35",
    },
  },
  tablecell: {
    borderBottom: "none",
    fontWeight: 500,
  },
  menuimg: {
    objectFit: "contain",
    width: 80,
    height: 80,
  },
  menuroot: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "",
  },
}));

export default function Keranjang({
  keranjang,
  ongkir,
  subtotal,
  onItemCountChange}
) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        style={{ color: "#000" }}
      >
        Keranjang Anda
      </Typography>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      {keranjang.map((it) => (
        <React.Fragment>
          <Card elevation="0dp" className={classes.menuroot}>
            <CardMedia
              image={`${defaultAPIURL}/menu/1-ayam-goreng.jpg`}
              alt="menupic"
              className={classes.menuimg}
            />
            <CardContent
              style={{
                paddingRight: 0,
                paddingLeft: 0,
                width: 120,
                marginLeft: 12,
              }}
            >
              <Typography display="inline" style={{ fontWeight: 500 }}>
                {it.nama}
              </Typography>
            </CardContent>
            <CardContent style={{ paddingRight: 0, paddingLeft: 0 }}>
              <IconButton
                size="small"
                onClick={() => onItemCountChange(it.id, it.jumlah - 1)}
              >
                <RemoveIcon />
              </IconButton>
              {it.jumlah}
              <IconButton
                size="small"
                onClick={() => onItemCountChange(it.id, it.jumlah + 1)}
              >
                <AddIcon />
              </IconButton>
              <Typography display="inline" style={{ fontWeight: 500 }}>
                {formatMoney(it.harga)}
              </Typography>
            </CardContent>
          </Card>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        </React.Fragment>
      ))}
      <div className={classes.summary}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tablecell} padding="none">
                Subtotal
              </TableCell>
              <TableCell
                className={classes.tablecell}
                padding="none"
                align="right"
              >
                {formatMoney(subtotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tablecell} padding="none">
                Delivery Fee
              </TableCell>
              <TableCell
                className={classes.tablecell}
                padding="none"
                align="right"
              >
                {formatMoney(ongkir)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tablecell} padding="none">
                Total
              </TableCell>
              <TableCell
                className={classes.tablecell}
                padding="none"
                align="right"
              >
                {formatMoney(subtotal + ongkir)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          color="primary"
          href="#"
          onClick={preventDefault}
          className={classes.button}
        >
          Bayar
        </Button>
      </div>
    </React.Fragment>
  );
}
