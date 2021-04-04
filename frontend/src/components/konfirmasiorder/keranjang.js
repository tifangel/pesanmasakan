import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Typography } from "@material-ui/core";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  summary: {
    marginTop: theme.spacing(3),
  },
  button: {
    width: "100%",
  },
  tablecell:{
      borderBottom: "none"
  }
}));

export default function Keranjang() {
  const classes = useStyles();
  const [menuList, setMenuList] = useState([
    {
      nama: "Sop",
      harga: 10000,
    },
    {
      nama: "Sop",
      harga: 10000,
    },
    {
      nama: "Sop",
      harga: 10000,
    },
  ]);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Keranjang Anda
      </Typography>
      <Divider />
      {menuList.map((it) => (
        <React.Fragment>
          <img alt="menupic" />
          <span>{it.nama}</span>
          -2+
          <span>Rp{it.harga}</span>
          <Divider />
        </React.Fragment>
      ))}
      <div className={classes.summary}>
      <Table className={classes.table}>
        <TableBody>
            <TableRow>
              <TableCell className={classes.tablecell} padding="none" >Subtotal</TableCell>
              <TableCell className={classes.tablecell} padding="none" align="right">Rp30.000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tablecell} padding="none" >Delivery Fee</TableCell>
              <TableCell className={classes.tablecell} padding="none" align="right">Rp30.000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tablecell} padding="none" >Total</TableCell>
              <TableCell className={classes.tablecell} padding="none" align="right">Rp30.000</TableCell>
            </TableRow>
        </TableBody>
      </Table>
        <Button color="primary" href="#" onClick={preventDefault} className={classes.button}>
          Bayar
        </Button>
      </div>
    </React.Fragment>
  );
}
