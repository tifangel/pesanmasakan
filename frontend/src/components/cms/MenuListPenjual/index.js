import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from '@material-ui/core/Link';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const { defaultAPIURL } = require("../../../config");

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
    "& .header-style": {
      backgroundColor: "#FDCB35",
    },
  },
  menuDay: {
      fontSize : 14,
      marginLeft : 4,
      // fontFamily : 'Inter',
      fontWeight : 'light',
      background : '#FDCB35',
      color : '#000'
  },
}));

function columns(props) {
  return [
    {
      field: "id",
      headerName: "No",
      width: 60,
      headerClassName: "header-style",
    },
    {
      field: "pic",
      headerName: "Image",
      width: 160,
      headerClassName: "header-style",
      renderCell: (params) => <img src={`${defaultAPIURL}${params.value}`} alt="Foto sampah" width={160} style={{objectFit : 'contain'}}/>,
    },
    // {
    //   field: "id_warung",
    //   headerName: "No",
    //   width: 100,
    //   headerClassName: "header-style",
    // },
    {
      field: "nama",
      headerName: "Item Name",
      width: 160,
      headerClassName: "header-style",
    },
    {
      field: "harga",
      headerName: "Price",
      width: 120,
      headerClassName: "header-style",
    },
    {
      field: "desc_menu",
      headerName: "Description",
      width: 350,
      headerClassName: "header-style",
    },
    {
      field: "days",
      headerName: "Available On",
      width: 200,
      headerClassName: "header-style",
      renderCell: (params) => (
        ["senin", "selasa", "rabu"].map((item, idx)=>
          <Grid item>
              <Typography className={props.classes.menuDay} variant="body2" color="textSecondary" component="p">
                  {item}
              </Typography>
          </Grid>
      )
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "header-style",
      renderCell: (params) => (
        <React.Fragment>
          <EditIcon onClick={() => props.onClickEdit(params.row.id)} />
          <DeleteOutlineIcon onClick={() => props.onClickDelete(params.row.id)} />
        </React.Fragment>
      ),
    },
    // {
    //   field: "timestamp",
    //   headerName: "Waktu Pengambilan",
    //   width: 180,
    //   headerClassName: "header-style",
    //   valueFormatter: ({ value }) => {
    //     const time =  new Date(value);
    //     return `${time.getDate()} ${bulanList[time.getMonth()]} ${time.getFullYear()}`;
    //   },
    // },
    // {
    //   field: "local_id",
    //   headerName: "Rute",
    //   width: 100,
    //   renderCell: (params) => (
    //     <Link
    //       onClick={() => props.onClickRute(params.row._id)}
    //       component="button"
    //     >
    //       klik disini
    //     </Link>
    //   ),
    //   headerClassName: "header-style",
    // },
  ];
}

function MenuListPenjual({data}) {
  const classes = useStyles(); 
  return (
    <div className={classes.root}>
      <h1>Informasi </h1>
      <DataGrid
        rows={data}
        columns={columns({
          onClickEdit: (id_menu) => {alert(`edit ${id_menu}`)},
          onClickDelete: (id_menu) => {alert(`delete ${id_menu}`)},
          classes : classes,
        })}
        pageSize={20}
        disableColumnMenu
        autoHeight
        rowHeight={120}
      />
    </div>
  );
}

export default MenuListPenjual;