import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { TableContainer, Table, TableCell, TableBody, TableHead, TableRow } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

import { IconButton, requirePropFactory } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { getCooklist, updateOrderMenu } from '../../../resource';
import { formatDate } from '../../../resource/formatter';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Inter',
    },
    title: {
        color: '#000000',
        fontSize : '1.5em',
        fontFamily : 'Roboto Slab',
        fontWeight : 'medium',
    },
    green: {
        color: "#31CE36",
    },
}));

const convertDataToTableRows = function(data) {
    return (
        <TableRow>
            <TableCell><Markdone key={data.id} idmenu={data.id} tgl={data.tanggal} /></TableCell>
            <TableCell>{formatDate(data.tanggal)}</TableCell>
            <TableCell>{data.qty}</TableCell>
            <TableCell>{data.nama}</TableCell>
        </TableRow>
    );
}

const Markdone = (props) => {
    var date = props.tgl;
    var id = props.idmenu;

    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false); 
    const [snackbarMsg, setSnackbarMsg] = useState("");

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = async function() {
        var day, month, year, tgl;
        date = new Date(date);
        day = ("0" + date.getDate()).slice(-2);
        month = ("0" + (date.getMonth() + 1)).slice(-2);
        year = date.getFullYear();
        tgl = `${year}-${month}-${day}`;
        
        var data = {
            id: id,
            tanggal: tgl
        };

        var res = await updateOrderMenu(data);
        if (res) { 
            setDisabled(true);
            setOpen(true);
            setSnackbarMsg("Dish marked as cooked!");
        } else {
            setOpen(true);
            setSnackbarMsg("An error has occured, please try again later");
        }
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Tooltip title="Cooking is done">
                <IconButton className={classes.green} size="small" key={id} onClick={handleClick} disabled={disabled}>
                    <DoneIcon/>
                </IconButton>
            </Tooltip>
            <Snackbar open={open} message={snackbarMsg} autoHideDuration={1000} 
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </React.Fragment>
    )
}

const CookList = ({data}) => {
    const [cooklist, setCooklist] = useState([]);

    useEffect(() => {
        (async () => {
            var res = await getCooklist(data.id_warung);
            setCooklist(res.data.values);
        })();
    }, []);

    return(
        <TableContainer component="div">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{/*Column for tick button*/}</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Item Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cooklist.map((item) => convertDataToTableRows(item))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CookList