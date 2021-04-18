import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from '@material-ui/data-grid';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

import { IconButton, requirePropFactory } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { getCooklist, updateOrderMenu } from '../../../resource';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Inter',
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
    green: {
        color: "#31CE36",
    },
}));

const convertDataToRows = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var row = {};
        row.id = i;
        row.idmenu = data[i].id;
        row.date = formatDate(data[i].tanggal);
        row.qty = data[i].qty;
        row.itemname = data[i].nama;
        console.log(row);
        res.push(row);
    }
    return res;
}

function formatDate(date) {
    date = new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Jakarta'});
    date = date.slice(0, date.indexOf(","));
    date = date.split("/");

    var month = date[0].length < 2 ? `0${date[0]}` : date[0];
    var day = date[1].length < 2 ? `0${date[1]}` : date[1];
    var year = date[2];
    return `${day}/${month}/${year.slice(-2)}`
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
        console.log(date);
        day = date.slice(0, 2);
        month = date.slice(3, 5);
        year = date.slice(6, 8);
        tgl = `20${year}-${month}-${day}`;

        console.log("id ", id);

        var data = {
            id: id,
            tanggal: tgl
        };

        var res = await updateOrderMenu(data);
        // var res = true;
        if (res) { 
            console.log(res);
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
    const rows = convertDataToRows(cooklist);

    const classes = useStyles();
    const columns = [
        { field: 'id', headerName:' ', flex: 0.16, sortable: false, disableClickEventBubbling: true,
            renderCell: (params) => {                
                return (
                    <Markdone key={params.getValue('id')} idmenu={params.getValue('idmenu')} tgl={params.getValue('date')}/>
                );
            }
            },
        { field: 'date', headerName: 'Date', type: 'date'},
        { field: 'qty', headerName: 'Qty', type: 'number', marginRight: 25},
        { field: 'itemname', headerName: 'Item name', flex: 1}
    ]

    return(
        <div style={{display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid rows={rows} columns={columns} 
                    pageSize={5}
                    autoHeight />
            </div>
        </div>
    )
}

export default CookList