import React, {useState, useEffect, useReducer} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useFormFields } from '../../lib';
import {insertMenu, editMenu} from '../../resource';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: theme.spacing(5),
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(3),
        },
    },
    title: {
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '30px',
    },
    gridItem: {
        
    },
    input: {
        background: '#F5F5F5',
        width: '23vw',
        [theme.breakpoints.down('md')]: {
            width: '18vw',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60vw',
        },
    },
    col1: {
        width: '22%',
        paddingBottom: theme.spacing(1),
        verticalAlign: 'top',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '16px',
    },
    col2: {
        width: '78%',
        paddingBottom: theme.spacing(1),
    },
    colimage: {
        width: '23vw',
        paddingBottom: theme.spacing(1),
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: '18vw',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60vw',
        },
    },
    textarea: {
        width: '23vw',
        background: '#F5F5F5',
        resize: 'none',
        border: 0,
        [theme.breakpoints.down('md')]: {
            width: '18vw',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60vw',
        },
    },
    inputimg : {
        background: '#F5F5F5',
        flex: '70%',
        marginRight: '5%',
    },
    button: {
        flex: '25%',
        borderRadius: '25px',
        color: 'white',
        backgroundColor: '#448AC9',
        height: '30px',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '15px',
    },
    checkdays: {
        width: '30%',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '16px',
    },
    checkfriday: {
        width: '60%',
    },
    btnsubmit: {
        borderRadius: '25px',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '15px',
        color: 'white',
        backgroundColor: '#31CE36',
        height: '30px',
        width: '150px',
        float: 'right',
        marginRight: '3vw',
    },
}));

const FormMenu = ({datamenu, statedays, status, handleChange, handleInput, resetStatusFormMenu}) => {

    const id_menu = 48;
    const id_warung = 1;

    const submitMenu = async() => {
        let hari = []
        if(statedays.senin){hari.push('senin')}
        if(statedays.selasa){hari.push('selasa')}
        if(statedays.rabu){hari.push('rabu')}
        if(statedays.kamis){hari.push('kamis')}
        if(statedays.jumat){hari.push('jumat')}
        if(statedays.sabtu){hari.push('sabtu')}
        if(statedays.minggu){hari.push('minggu')}

        if(status === 'insert'){
            console.log("Insert menu");
            try {
                console.log(datamenu)
                let data = JSON.parse(JSON.stringify(datamenu))
                data.id_warung = id_warung
                data.hari = hari

                console.log(data)
                
                let response = await insertMenu(data)
                console.log(response)
            }
            catch (e) {
                console.log(e)
            }
        }else if(status === 'edit'){
            console.log("Edit menu");
            try {
                console.log(datamenu)
                let data = JSON.parse(JSON.stringify(datamenu))
                data.id = id_menu
                data.hari = hari

                console.log(data)
                
                let response = await editMenu(data)
                console.log(response)
                resetStatusFormMenu()
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const handleSubmit = evt => {
        evt.preventDefault();
    
        console.log(datamenu);
        console.log(statedays);

        submitMenu();

        window.location.reload();
      };

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.root}>
                <h1 className={classes.title}>{status === 'insert'? "Add Item" : "Edit Item"}</h1>
                <form id="formmenu">
                <Grid container>
                    <Grid className={classes.gridItem} item xs={12} sm={12} md={6}>
                        <table>
                            <tr>
                                <td className={classes.col1}>Item Name</td>
                                <td className={classes.col2}>
                                    <InputBase
                                        name="nama"
                                        type="text"
                                        value={datamenu.nama}
                                        className={classes.input}
                                        onChange={handleInput}/>
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Price</td>
                                <td className={classes.col2}>
                                    <InputBase
                                        name="harga"
                                        type="number"
                                        value={datamenu.harga}
                                        className={classes.input}
                                        onChange={handleInput}/>
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Description</td>
                                <td className={classes.col2}>
                                    <InputBase
                                        name="desc_menu"
                                        type="text"
                                        multiline
                                        rows="4"
                                        value={datamenu.desc_menu}
                                        className={classes.textarea}
                                        id="textaremenu"
                                        onChange={handleInput}/>
                                </td>
                            </tr>
                        </table>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <table>
                            <tr>
                                <td className={classes.col1}>Choose Image</td>
                                <td className={classes.colimage}>
                                    <InputBase
                                        name="pic"
                                        type="text"
                                        value={datamenu.pic}
                                        className={classes.inputimg}
                                        onChange={handleInput}/>
                                    <Button className={classes.button} variant="contained" color="primary">
                                        Upload
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Available On</td>
                                <td className={classes.col2}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            className={classes.checkdays}
                                            control={
                                                <Checkbox
                                                  checked={statedays.senin}
                                                  onChange={handleChange}
                                                  name="senin"
                                                  color="primary"
                                                />
                                              }
                                              label="Senin"
                                        />
                                        <FormControlLabel
                                            className={classes.checkdays}
                                            control={
                                                <Checkbox
                                                  checked={statedays.selasa}
                                                  onChange={handleChange}
                                                  name="selasa"
                                                  color="primary"
                                                />
                                              }
                                              label="Selasa"
                                        />
                                        <FormControlLabel
                                            className={classes.checkdays}
                                            control={
                                                <Checkbox
                                                  checked={statedays.rabu}
                                                  onChange={handleChange}
                                                  name="rabu"
                                                  color="primary"
                                                />
                                              }
                                              label="Rabu"
                                        />
                                        <FormControlLabel
                                            className={classes.checkdays}
                                            control={
                                                <Checkbox
                                                  checked={statedays.kamis}
                                                  onChange={handleChange}
                                                  name="kamis"
                                                  color="primary"
                                                />
                                              }
                                              label="Kamis"
                                        />
                                        <FormControlLabel
                                            className={classes.checkfriday}
                                            control={
                                                <Checkbox
                                                  checked={statedays.jumat}
                                                  onChange={handleChange}
                                                  name="jumat"
                                                  color="primary"
                                                />
                                              }
                                              label="Jumat"
                                        />
                                        <FormControlLabel
                                            className={classes.checkdays}
                                            control={
                                                <Checkbox
                                                  checked={statedays.sabtu}
                                                  onChange={handleChange}
                                                  name="sabtu"
                                                  color="primary"
                                                />
                                              }
                                              label="Sabtu"
                                        />
                                        <FormControlLabel
                                            className={classes.checkdays}
                                            control={
                                                <Checkbox
                                                  checked={statedays.minggu}
                                                  onChange={handleChange}
                                                  name="minggu"
                                                  color="primary"
                                                />
                                              }
                                              label="Minggu"
                                        />
                                    </FormGroup>
                                </td>
                            </tr>
                        </table>
                        <Button onClick={handleSubmit} className={classes.btnsubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </div>
        </React.Fragment>
    );
}

export default FormMenu