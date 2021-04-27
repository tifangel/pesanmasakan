import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TableContainer, Table, TableCell, TableBody, TableHead, TableRow } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { formatMoney } from '../../../resource/formatter';
const { defaultAPIURL } = require("../../../config");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
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
    color: '#000000',
    fontSize : '1.5em',
    fontFamily : 'Roboto Slab',
    fontWeight : 'medium',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  avatar: {
    width: 100,
    height: 100,
    [theme.breakpoints.down('xs')]: {
      width: 50,
      height: 50,
    },
  },
  desc: {
    [theme.breakpoints.down('xs')]: {
      width: 150
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

function MenuListPenjual({data, onEdit, onDelete}) {
  const classes = useStyles(); 
  const [search,setSearch] = useState("");

  function createRow(data) {
    var days = data.hari.map((item, idx) =>
      <Grid item>
          <Typography className={classes.menuDay} variant="body2" color="textSecondary" component="p">
              {item} <br/>
          </Typography>
      </Grid> 
    );
    return (
      <TableRow>
        <TableCell><Avatar className={classes.avatar} variant="square" src={`${defaultAPIURL}${data.pic}`} alt="Foto makanan"/></TableCell>
        <TableCell>{data.nama}</TableCell>
        <TableCell>{formatMoney(data.harga)}</TableCell>
        <TableCell width={classes.desc}>{data.desc_menu}</TableCell>
        <TableCell><Grid container>{days}</Grid></TableCell>
        <TableCell>          
          <EditIcon onClick={() => onEdit(data)} />
          <DeleteOutlineIcon onClick={() => onDelete(data.id)} />
        </TableCell>
      </TableRow>
    );
  }

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
      <TableContainer component="paper">
        <Table stickyHeader>
          <TableHead>
            <TableCell>Image</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Avail. Days</TableCell>
            <TableCell>Action</TableCell>
          </TableHead>
          <TableBody>
            {
              data
                .filter(it => it.desc_menu.includes(search))
                .map(d => createRow(d))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MenuListPenjual;