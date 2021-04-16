import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import MuiTableCell from '@material-ui/core/TableCell';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from  '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';

import { getHistoryPenjual, getOrderlistPenjual, updateOrder } from "../../../resource";

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
    const d = new Date(date);
    var month = (d.getMonth()+1) < 10 ? `0${(d.getMonth()+1)}` : (d.getMonth()+1);
    var day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    var year = d.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
    
    // date = new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Jakarta'});
    // return date = date.slice(0, date.indexOf(","));
}

function formatTime(date) {
    const d = new Date(date);
    var jam = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    var menit = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    var detik = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
    return `${jam}:${menit}:${detik} WIB`;
    
    // date = new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Jakarta'});
    // return date = date.slice(0, date.indexOf(","));
}

function Row(props) {
    var row = props.row;
    var type = props.type;
    const [open, setOpen] = useState(false);
    const [allCooked, setAllCooked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        var allCookedTemp = true;
        var orders = row.orders;
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].status === 0) allCookedTemp = false;
            setAllCooked(allCookedTemp);
        }
    }, [props]);

    const sendOrder = async function() {
        var id = row.id;
        var data = {
            status: 1,
            id: id
        }
        var res = await updateOrder(data);
        if (res) {
            setDisabled(true);
            setSnackbarOpen(true);
        } else {
            // TODO: show error message
        }
    }

    const handleClose = () => {
        setSnackbarOpen(false);
    }
    
    const setButton = function(status) {
        if (type === "ongoing") {
            if (!allCooked) {
                return (
                    <Tooltip title="Cook all their orders first before sending!">
                        <span> <Button variant="contained" disableElevation className={classes.yellowbg} disabled>Send</Button> </span>
                    </Tooltip>
                );
            } else {
                return (
                    <React.Fragment>
                        <Tooltip title="Send dish to customer">
                            <Button variant="contained" disableElevation className={classes.greenbg} onClick={sendOrder} disabled={disabled}>Send</Button>
                        </Tooltip>
                        <Snackbar open={snackbarOpen} message="Dish sent!" autoHideDuration={1000} 
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                                }
                            />
                    </React.Fragment>
                );
            }
        } else if (type === "history") {
            if (status === 1) {
                return (
                    <Tooltip title="Dish has sent to the customer.">
                        <Chip label="Sent" className={classes.greenbg}/>
                    </Tooltip>
                );
            } else if (status === 2) {
                return (
                    <Tooltip title="Customer has cancelled their order.">
                        <Chip label="Cancelled" className={classes.redbg}/> 
                    </Tooltip>
                );
            }
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
                    <TableCell></TableCell>
                    <TableCell>{order[i].jumlah_porsi} porsi</TableCell>
                    <TableCell>{order[i].nama}</TableCell>
                    <TableCell>{formatMoney(order[i].harga)}</TableCell>
                    <TableCell>{setMenuStatus(order[i].status)}</TableCell>
                </TableRow>
            )
        }
        return details;
    }

    const classes = useRowStyles();
    return (
        <React.Fragment>
        { /* ORDER TITLE */ }
        <TableRow className={classes.orderTitle}>
            <TableCell>
                <IconButton size="small" onClick={() => setOpen(!open)}>
                    { open? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell> {formatDate(row.tgl_transaksi)} </TableCell>
            <TableCell> {formatTime(row.tgl_transaksi)} </TableCell>
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

const OrderList = (props) => {
    var data = props.data;
    var type = props.type;
    var ref = props.refresh;

    const [orderlist, setOrderlist] = useState([]);
    useEffect(() => {
        (async () => {
            if (type === "history") {
                var res = await getHistoryPenjual(data.id_warung);
            } else if (type === "ongoing") {
                var res = await getOrderlistPenjual(data.id_warung);
            }
            if (res) {
                console.log("res", res.data.values);
                console.log(new Date("2021-04-02T17:00:00.000Z").toLocaleString('en-US', { timeZone: 'Asia/Jakarta'}) )
                setOrderlist(res.data.values);
            }
        })();
    }, [ref]);

    const classes = useStyles();
    return(
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{/*Column for collapse button*/}</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Name/Address</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>{/*Column for send button*/}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { orderlist.map((order) => (
                        <Row key={order.id} row={order} type={type}/>
                    ))} 
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default OrderList