import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";

import Toolbar from "@material-ui/core/Toolbar";
import { Chip, Paper } from "@material-ui/core";

const { defaultAPIURL } = require("../config");

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
}));

function columns(props) {
  return [
    {
      field: "nama_warung",
      headerName: "Nama Warung",
      width: 208,
      headerClassName: "header-style",
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      width: 140,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        return `${value} Item`;
      },
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      width: 160,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        const time = new Date(value);
        return `${time.getDate()} ${
          months[time.getMonth()]
        } ${time.getFullYear()}`;
      },
    },
    {
      field: "jam",
      headerName: "Jam",
      width: 160,
      headerClassName: "header-style",
      valueFormatter: ({ value }) => {
        const time = new Date(value);
        return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} WIB`;
      },
    },
    {
      field: "total",
      headerName: "Total",
      width: 160,
      headerClassName: "header-style",
    },
    {
      field: "status",
      headerName: "Status",
      width: 230,
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

function PesananSayaPage({ data }) {
  const classes = useStyles();
  data = [
    {
      id: 1,
      nama_warung: "pesanan1",
      jumlah: 2,
      tanggal: new Date(),
      jam: new Date(),
      total: 100000,
      status: 2,
    },
    {
      id: 2,
      nama_warung: "pesanan1",
      jumlah: 2,
      tanggal: new Date(),
      jam: new Date(),
      total: 100000,
      status: 1,
    },
    {
      id: 3,
      nama_warung: "pesanan1",
      jumlah: 2,
      tanggal: new Date(),
      jam: new Date(),
      total: 100000,
      status: 0,
    },
    {
      id: 4,
      nama_warung: "pesanan1",
      jumlah: 2,
      tanggal: new Date(),
      jam: new Date(),
      total: 100000,
      status: 2,
    },
    {
      id: 5,
      nama_warung: "pesanan1",
      jumlah: 2,
      tanggal: new Date(),
      jam: new Date(),
      total: 100000,
      status: 1,
    },
    {
      id: 6,
      nama_warung: "pesanan1",
      jumlah: 2,
      tanggal: new Date(),
      jam: new Date(),
      total: 100000,
      status: 0,
    },
  ];
  return (
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
  );
}

export default PesananSayaPage;
