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
import { formatMoney, formatDate, formatTime } from '../../../resource/formatter';

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

function Row(props) {
    var row = props.row;
    var type = props.type;
    const [open, setOpen] = useState(false);
    const [allCooked, setAllCooked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [msg, setMsg] = useState("");

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
        console.log(res);
        if (res.data.values.changedRows > 0) {
            setDisabled(true);
            setMsg("Dish sent!");
            setSnackbarOpen(true);
        } else {
            setMsg("An error has occured, please try again later");
            setSnackbarOpen(true);
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
                        <Snackbar open={snackbarOpen} message={msg} autoHideDuration={1000} 
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
            <TableCell> {formatDate(row.tgl_kirim)} </TableCell>
            <TableCell> {formatTime(row.tgl_kirim)} </TableCell>
            <TableCell> 
                { row.nama } <br />
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