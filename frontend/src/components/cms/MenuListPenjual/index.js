import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const { defaultAPIURL } = require("../../../config");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    "& .header-style": {
      backgroundColor: "#FDCB35",
    },
  },
  header: {
    marginTop: 0
  },
  menuDay: {
      fontSize : 14,
      marginLeft : 4,
      // fontFamily : 'Inter',
      fontWeight : 'light',
      background : '#FDCB35',
      color : '#000'
  },
  

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
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
          <EditIcon onClick={() => props.onClickEdit(params.row)} />
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

function MenuListPenjual({data, onEdit}) {
  const classes = useStyles(); 
  const [search,setSearch] = useState("");
  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          Daftar Menu
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e)=>setSearch(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
      <DataGrid
        rows={data.filter(it => it.desc_menu.includes(search))}
        columns={columns({
          onClickEdit: (dataformmenu) => {onEdit(dataformmenu)},
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