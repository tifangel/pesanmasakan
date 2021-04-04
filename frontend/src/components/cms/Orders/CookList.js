import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

const columns = [ // date, id, item name, portions ordered, button
    { field: 'date', headerName: 'Date', type: 'date'},
    { field: 'id', headerName: 'ID', type: 'number'},
    { field: 'itemname', headerName: 'Item name', flex: 1},
    { field: 'qty', headerName: 'Qty', type: 'number'},
    { field: 'done', headerName: 'Mark done', flex: 0.3},
]

const dummydata = [
    {date: "21/05/21", id: "1", itemname: "Ayam goreng", qty:"5", done:"done"},
    {date: "21/06/21", id: "2", itemname: "Sup kepiting jagung", qty:"5", done:"done"},
    {date: "21/07/21", id: "3", itemname: "Cumi saos tiram", qty:"5", done:"done"},
    {date: "21/08/21", id: "4", itemname: "Ini nama masakan yang panjang banget", qty:"5", done:"done"},
]

const CookList = () => {
    const classes = useStyles();
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