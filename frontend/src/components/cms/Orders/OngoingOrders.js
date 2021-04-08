import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import MuiTableCell from '@material-ui/core/TableCell';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

/* DELETE FROM HERE */
var datadummy = [ 
        {
            "id": 9,
            "username_pembeli": "raras",
            "tgl_transaksi": "2021-04-02T17:00:00.000Z",
            "alamat_tujuan": "Jl Ijen Nirwana no 12",
            "total": 135000,
            "status": 0,
            "id_warung": 1,
            "orders": [
                {
                    "jumlah_porsi": 4,
                    "nama": "ayam goreng",
                    "harga": 15000,
                    "status": 0
                },
                {
                    "jumlah_porsi": 5,
                    "nama": "bebek goreng",
                    "harga": 15000,
                    "status": 0
                }
            ]
        },
        {
            "id": 10,
            "username_pembeli": "indy",
            "tgl_transaksi": "2021-05-02T17:00:00.000Z",
            "alamat_tujuan": "Jl Ijen Nirwana no 12",
            "total": 100000,
            "status": 1,
            "id_warung": 1,
            "orders": [
                {
                    "jumlah_porsi": 10,
                    "nama": "tahu & tempe goreng",
                    "harga": 10000,
                    "status": 1
                }
            ]
        }
    ]
/* DELETE UP TO HERE */


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: 13,
    },
    title: {
        flex: '95%',
        color: '#000000',
        fontSize : '1.9vw',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
        [theme.breakpoints.down('sm')]: {
            fontSize : '3vw',
        },
    },
}));

const useRowStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Inter',
    },
    orderTitle: {
        backgroundColor: "#fafafa",
    },
    greenbg: {
        backgroundColor: "#31CE36",
        color: 'white',
    },
    redbg: {
        backgroundColor: "#D85450",
        color: 'white',
    },
    yellowbg: {
        backgroundColor: "#FDCB35",
        color: 'white',
    },
    green: {
        color: "#31CE36",
    },
    red: {
        color: "#D85450",
    },
    yellow: {
        color: "#FDCB35",
    }
}));

const TableCell = withStyles({
    root: {
        borderColor: "white",
        borderWidth: 5,
    }
})(MuiTableCell);

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

function formatDate(date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = (""+ date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const setButton = function(status) {
        // Integration tip: buat di ongoing orders, tunjukin yang status transaksinya 0 aja
        // Terus cek status menu di ordernya, kalo masih ada yang 0 send buttonnya di disable
        // kalo ternyata udah 1 semua enable send button
        // kalo send buttonnya di click, disable lagi tapi textnya ganti "Sent!" terus ubah status di db jadi 1
        // Downside: ownernya gabakal tau kalo ada yang cancel order
        if (status === 0) {
            return (
                <Tooltip title="Cook their orders first before sending!">
                    <span> <Button variant="contained" disableElevation className={classes.yellowbg} disabled>Send</Button> </span>
                </Tooltip>
            );
        } else if (status === 1) {
            return (
                <Tooltip title="Send dishes to customer">
                    <Button variant="contained" disableElevation className={classes.greenbg}>Send</Button>
                </Tooltip>
            );
        } else if (status === 2) {
            return (
                <Tooltip title="Customer has cancelled their order.">
                    <span> <Button variant="contained" disableElevation className={classes.redbg} disabled>Cancelled</Button> </span>
                </Tooltip>
            );
        }
    }

    const setMenuStatus = function(status) {
        if (status === 0) {
            return (<b className={classes.yellow}>Cooking</b>);
        } else if (status === 1) { 
            return (<b className={classes.green}>Done</b>);
        }
    }
    
    const createOrderDetails = function(order) {
        var details = [];
        for (var i = 0; i < order.length; i++) {
            details.push(
                <TableRow className={classes.orderDetails}>
                    <TableCell>{order[i].jumlah_porsi} porsi</TableCell>
                    <TableCell>{order[i].nama}</TableCell>
                    <TableCell>{formatMoney(order[i].harga)}</TableCell>
                    <TableCell>{setMenuStatus(order[i].status)}</TableCell>
                </TableRow>
            )
        }
        return details;
    }

    return (
        <React.Fragment>
        { /* ORDER TITLE */ }
        <TableRow className={classes.orderTitle}>
            <TableCell>
                <IconButton size="small" onClick={() => setOpen(!open)}>
                    { open? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell> {formatDate(new Date(row.tgl_transaksi.slice(0, -1)))} </TableCell>
            <TableCell> 
                { row.username_pembeli } <br />
                { row.alamat_tujuan }
            </TableCell>
            <TableCell> {formatMoney(row.total)} </TableCell>
            <TableCell> 
                { setButton(row.status) }
            </TableCell>
        </TableRow>
        { /* ORDER DETAILS */ }
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={5}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Table size="small">
                            { createOrderDetails(row.orders) }
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    )
}

const OngoingOrders = () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{/*Column for collapse button*/}</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Name/Address</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>{/*Column for send button*/}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { datadummy.map((row) => (
                        <Row key={row.id} row={row} />
                    ))} 
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default OngoingOrders