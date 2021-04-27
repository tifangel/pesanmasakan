import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        fontSize: '1.5em',
    },
    input: {
        background: '#F5F5F5',
        width: '100%',
        fontFamily: 'Roboto Slab',
        fontSize: '1em',
        paddingLeft: '5px',
    },
    formLabel: {
        paddingTop: theme.spacing(2),
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '1em',
    },
    col1: {
        width: '22%',
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(0.25),
        verticalAlign: 'top',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '1em',
    },
    col2: {
        width: '78%',
        paddingBottom: theme.spacing(1),
    },
    colimage: {
        paddingBottom: theme.spacing(1),
        paddingRight: 0,
        paddingTop: 0,
        paddingLeft: 0,
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: '18vw',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60vw',
        },
    },
    textarea: {
        width: '100%',
        background: '#F5F5F5',
        fontFamily: 'Roboto Slab',
        border: 0,
        fontSize: '1em',
        paddingLeft: '5px',
    },
    btnsubmit: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        float: 'right',
        borderRadius: '15px',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '1em',
        color: 'black',
        backgroundColor: '#FDCB35',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    },
}));

const FormMenu = ({datamenu, statedays, status, handleChange, handleInput, resetStatusFormMenu}) => {
    const [reload, setReload] = useState(false);

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
                data.id_warung = datamenu.id_warung
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
                data.id = datamenu.id
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
                <Grid container spacing={2}>
                    <Grid className={classes.gridItem} item xs={12} sm={12} md={6}>
                        <table width="100%">
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
                        <Grid container className={classes.fileInput}>
                            <Grid item className={classes.col1}>Image</Grid>
                            <Grid item><input type="file" ></input></Grid>
                        </Grid>
                        <div className={classes.formLabel}>Available On:</div>
                        <Grid container>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                      size="small"
                                      checked={statedays.senin}
                                      onChange={handleChange}
                                      name="senin"
                                      color="primary"
                                    />
                                  }
                                  label="Senin"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                      size="small"
                                      checked={statedays.selasa}
                                      onChange={handleChange}
                                      name="selasa"
                                      color="primary"
                                    />
                                  }
                                  label="Selasa"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                      size="small"
                                      checked={statedays.rabu}
                                      onChange={handleChange}
                                      name="rabu"
                                      color="primary"
                                    />
                                  }
                                  label="Rabu"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                      size="small"
                                      checked={statedays.kamis}
                                      onChange={handleChange}
                                      name="kamis"
                                      color="primary"
                                    />
                                  }
                                  label="Kamis"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                      size="small"
                                      checked={statedays.jumat}
                                      onChange={handleChange}
                                      name="jumat"
                                      color="primary"
                                    />
                                  }
                                  label="Jumat"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                      size="small"
                                      checked={statedays.sabtu}
                                      onChange={handleChange}
                                      name="sabtu"
                                      color="primary"
                                    />
                                  }
                                  label="Sabtu"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                      size="small"
                                      checked={statedays.minggu}
                                      onChange={handleChange}
                                      name="minggu"
                                      color="primary"
                                    />
                                  }
                                  label="Minggu"
                            />
                        </Grid>
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