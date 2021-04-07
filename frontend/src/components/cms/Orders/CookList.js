import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

/* DELETE LATER */
const dummydata = [
    {date: "21/05/21", id: "1", itemname: "Ayam goreng", qty:"5",},
    {date: "21/06/21", id: "2", itemname: "Sup kepiting jagung", qty:"5",},
    {date: "21/07/21", id: "3", itemname: "Cumi saos tiram", qty:"5",},
    {date: "21/08/21", id: "4", itemname: "Ini nama masakan yang panjang banget", qty:"5",},
]
/* DELETE UP TO HERE */

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

const convertDataToColumns = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var row = {};
        row.id = data.id;
        row.date = data.tgl_transaksi;
        row.qty = data.qty;
        row.itemname = data.nama;
        res.push(row);
    }
    return res;
}

const CookList = () => {
    const classes = useStyles();

    const columns = [ // date, id, item name, portions ordered, button
        // in params: decide for onclick function
        { field: 'id', headerName:' ', flex: 0.16, sortable: false, disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = function(id) {
                    console.log(`Clicked done on menu ${params.getValue('id')}`);
                }
                
                return (
                    <IconButton variant="contained" disableElevation className={classes.green} size="small" key={params.getValue('id')} onClick={onClick} >
                        <DoneIcon/>
                    </IconButton>
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
                <DataGrid rows={dummydata} columns={columns} 
                    pageSize={5}
                    autoHeight />
            </div>
        </div>
    )
}

export default CookList