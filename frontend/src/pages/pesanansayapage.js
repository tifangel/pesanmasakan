import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import AppHeader from "../components/header";

import Toolbar from "@material-ui/core/Toolbar";
import { Chip, Paper, Table, TableBody, TableCell } from "@material-ui/core";

import { getPesananPembeli } from "../resource";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 50,
    backgroundColor: "#F5F5F5",
    "& .header-style": {
      backgroundColor: "#FDCB35",
    },
  },
  smallroot: {
    padding: 15,
    minHeight: 720,
    backgroundColor: "#F5F5F5",
    "& .header-style": {
      backgroundColor: "#FDCB35",
    },
  },
  header: {
    marginTop: 0,
  },
  menuDay: {
    fontSize: 14,
    marginLeft: 4,
    // fontFamily : 'Inter',
    fontWeight: "light",
    background: "#FDCB35",
    color: "#000",
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  smalltitle: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  cellcontainer: {},
  labelTitle: {
    fontWeight: 700,
    background: "#FDCB35",
  },
  label: {
    fontWeight: 600,
  },
  field: {},
}));

function columns(props) {
  return [
    {
      field: "nama_warung",
      headerName: "Nama Warung",
      width: 260,
      headerClassName: "header-style",
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      width: 100,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        return `${value} Item`;
      },
    },
    {
      field: "tgl_transaksi",
      headerName: "Tanggal Transaksi",
      width: 150,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        const time = new Date(value);
        return `${time.getDate()} ${
          months[time.getMonth()]
        } ${time.getFullYear()} `;
      },
    },
    {
      field: "jam_transaksi",
      headerName: "Jam Transaksi",
      width: 150,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        const time = new Date(value);
        return `${
          time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
        }:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        }:${
          time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
        } 
          WIB`;
      },
    },
    {
      field: "tgl_kirim",
      headerName: "Tanggal Kirim",
      width: 150,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        const time = new Date(value);
        return `${time.getDate()} ${
          months[time.getMonth()]
        } ${time.getFullYear()} `;
      },
    },
    {
      field: "jam_kirim",
      headerName: "Jam Kirim",
      width: 150,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        const time = new Date(value);
        return `
          ${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        }:${
          time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
        } 
          WIB`;
      },
    },

    {
      field: "total",
      headerName: "Total",
      width: 160,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        if (value >= 1000) {
          return `Rp ${Math.floor(value / 1000)}.${
            value % 1000 < 10
              ? `00${value % 1000}`
              : value % 1000 < 100
              ? `0${value % 1000}`
              : value % 1000
          }`;
        } else {
          return `Rp${value}`;
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      headerClassName: "header-style",
      renderCell: (params) => {
        switch (params.value) {
          case 0:
            return (
              <Chip
                size="small"
                label="In Progress"
                style={{
                  backgroundColor: "#FDCB35",
                  color: "#FFF",
                  width: 140,
                }}
              />
            );
          case 1:
            return (
              <Chip
                size="small"
                label="Completed"
                style={{
                  backgroundColor: "#31CE36",
                  color: "#FFF",
                  width: 140,
                }}
              />
            );
          case 2:
            return (
              <Chip
                size="small"
                label="Canceled"
                style={{
                  backgroundColor: "#D85450",
                  color: "#FFF",
                  width: 140,
                }}
              />
            );
          default:
            return <Chip size="small" label="Undefined" />;
        }
      },
    },
  ];
}

function PesananSayaPage(props) {
  const [data, setData] = useState([]);

  function rows(data) {
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i].tgl_transaksi);
        data[i].tgl_transaksi = date;
        data[i].jam_transaksi = date;
        var date1 = new Date(data[i].tgl_kirim);
        data[i].tgl_kirim = date1;
        data[i].jam_kirim = date1;
      }
      setData(data);
    }
  }

  useEffect(() => {
    async function loadPesanan() {
      try {
        let response = await getPesananPembeli(
          props.match.params.username_pembeli
        );
        if (response.status === 200) {
          rows(response.data.values);
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadPesanan();
  }, [props.match.params.username_pembeli]);

  const classes = useStyles();

  if (window.innerWidth > 768)
    return (
      <React.Fragment>
        <AppHeader username="indy" />
        <div className={classes.root}>
          <Toolbar style={{ padding: 0 }}>
            <Typography className={classes.title} variant="h4" noWrap>
              Pesanan Saya
            </Typography>
          </Toolbar>
          <Paper style={{ padding: "40px 60px" }}>
            <DataGrid
              rows={data}
              columns={columns({
                classes: classes,
              })}
              pageSize={5}
              disableColumnMenu
              autoHeight
              rowHeight={55}
            />
          </Paper>
        </div>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <AppHeader username="indy" />
        <div className={classes.smallroot}>
          <Toolbar style={{ padding: 0 }}>
            <Typography className={classes.smalltitle} variant="h4" noWrap>
              Pesanan Saya
            </Typography>
          </Toolbar>
          <Paper style={{}}>
            <Table>
              {data.map((it) => {
                return (
                  <React.Fragment>
                    <TableBody className={classes.cellcontainer}>
                      <TableCell className={classes.labelTitle} colSpan={2}>
                        {it.nama_warung}
                      </TableCell>
                    </TableBody>
                    <TableBody className={classes.cellcontainer}>
                      <TableCell className={classes.label}>Jumlah </TableCell>
                      <TableCell className={classes.field}>
                        {it.jumlah}
                      </TableCell>
                    </TableBody>
                    <TableBody className={classes.cellcontainer}>
                      <TableCell className={classes.label}>
                        Waktu Pesan
                      </TableCell>
                      <TableCell className={classes.field}>
                        {converttanggal(String(it.tgl_transaksi))}
                      </TableCell>
                    </TableBody>
                    <TableBody className={classes.cellcontainer}>
                      <TableCell className={classes.label}>
                        Waktu Kirim
                      </TableCell>
                      <TableCell className={classes.field}>
                        {converttanggal(String(it.tgl_kirim))}
                      </TableCell>
                    </TableBody>
                    <TableBody className={classes.cellcontainer}>
                      <TableCell className={classes.label}>
                        Total Harga
                      </TableCell>
                      <TableCell className={classes.field}>
                        {it.total}
                      </TableCell>
                    </TableBody>
                    <TableBody className={classes.cellcontainer}>
                      <TableCell className={classes.label}>
                        Status Pesanan
                      </TableCell>
                      <TableCell className={classes.field}>
                        {it.status === 0 ? (
                          <Typography style={{color: "#FDCB35", fontWeight: 700}}>In Progress</Typography>
                        ) : it.status === 1 ? (
                          <Typography style={{color: "#31CE36", fontWeight: 700}}>Completed</Typography>
                        ) : it.status === 2 ? (
                          <Typography style={{color: "#D85450", fontWeight: 700}}>Canceled</Typography>
                        ) : (
                          <Typography style={{color: "#000000", fontWeight: 700}}>Undefined</Typography>
                        )}
                      </TableCell>
                    </TableBody>
                  </React.Fragment>
                );
              })}
            </Table>
          </Paper>
        </div>
      </React.Fragment>
    );
}

function converttanggal(date) {
  const part = date.split(" ");
  return `${part[0]},  ${part[2]} ${part[1]} ${part[3]} Jam ${part[4]}`;
}

export default PesananSayaPage;
