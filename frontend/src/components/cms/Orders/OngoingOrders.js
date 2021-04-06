import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import MuiTableCell from '@material-ui/core/TableCell';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
    orderTitle: {
        backgroundColor: "#fafafa",
    },
    // orderDetails: {
    //     borderBottom:
    // }
}));

const TableCell = withStyles({
    root: {
        borderColor: "white",
        borderWidth: 5,
    }
})(MuiTableCell);

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.orderTitle}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        { open? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell> date </TableCell>
                <TableCell> addr </TableCell>
                <TableCell> total </TableCell>
                <TableCell> <Button> Done </Button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small">
                                <TableRow>
                                    <TableCell>1 porsi</TableCell>
                                    <TableCell>Ayam goreng</TableCell>
                                    <TableCell>15.000</TableCell>
                                    <TableCell><Button> Done </Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>1 porsi</TableCell>
                                    <TableCell>Ayam goreng</TableCell>
                                    <TableCell>15.000</TableCell>
                                    <TableCell><Button> Done </Button></TableCell>
                                </TableRow>
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
                        <TableCell>{/*Collapse button*/}</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Name/Address</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>{/*Send button*/}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Row />
                    <Row />
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default OngoingOrders