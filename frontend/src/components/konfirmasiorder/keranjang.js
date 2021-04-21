import React from "react";
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
    fontFamily: "Roboto Slab"
  },
  tablecell: {
    borderBottom: "none",
    fontWeight: 500,
    fontFamily: "Roboto Slab"
  },
  menuimg: {
    objectFit: "contain",
    width: 70,
    height: 70,
  },
  menuroot: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: ""
  },icon:{
    margin: theme.spacing(1), 
    backgroundColor:"#EFEFEF", 
    width:20,
    height:20
  }
}));

export default function Keranjang({
  keranjang,
  ongkir,
  subtotal,
  onItemCountChange,
  onBayar,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        style={{ color: "#000", fontFamily: "Roboto Slab", fontWeight:600 }}
      >
        Keranjang Anda
      </Typography>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      {keranjang.map((it) => (
        <React.Fragment>
          <Card elevation="0dp" className={classes.menuroot}>
            <CardMedia
              image={`${defaultAPIURL}${it.pic}`}
              alt="menupic"
              className={classes.menuimg}
            />
            <CardContent
              style={{
                paddingRight: 0,
                paddingLeft: 0,
                width: 120,
                marginLeft: 12
              }}
            >
              <Typography display="inline" style={{ fontFamily: "Roboto Slab", fontWeight:400 }}>
                {it.nama}
              </Typography>
            </CardContent>
            <CardContent style={{ paddingRight: 0, paddingLeft: 0, display:"flex", flexDirection:"row", alignItems:'center'}}>
              <IconButton
                size="small"
                onClick={() => onItemCountChange(it.id, it.jumlah - 1)}
                className={classes.icon}
              >
                <RemoveIcon style={{width:20,height:20}} />
              </IconButton>
              <p style={{fontFamily: "Roboto Slab", width:5, textAlign:"center"}}>{it.jumlah} </p>
              <IconButton
                size="small"
                onClick={() => onItemCountChange(it.id, it.jumlah + 1)}
                className={classes.icon}
              >
                <AddIcon style={{width:20,height:20}}/>
              </IconButton>
              <Typography display="inline" style={{ fontFamily: "Roboto Slab", fontWeight:400, paddingLeft: 10, }}>
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
            {(ongkir || ongkir===0) ? (
              <React.Fragment>
                <TableRow>
                  <TableCell className={classes.tablecell} padding="none">
                    Delivery Fee
                  </TableCell>
                  <TableCell
                    className={classes.tablecell}
                    padding="none"
                    align="right"
                  >
                    {ongkir? formatMoney(ongkir) : "Free"}
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
              </React.Fragment>
            ) : null}
          </TableBody>
        </Table>
        <Button
          color="primary"
          href="#"
          onClick={onBayar}
          className={classes.button}
        >
          Bayar
        </Button>
      </div>
    </React.Fragment>
  );
}
