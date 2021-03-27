import React, {useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

const FormMenu = () => {

    const [state, setState] = React.useState({
        senin: false,
        selasa: false,
        rabu: false,
        kamis: false,
        jumat: false,
        sabtu: false,
        minggu: false,
      });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    const classes = useStyles();

    return(
        <React.Fragment>
            <div className={classes.root}>
                <h1 className={classes.title}>Add Item</h1>
                <form>
                <Grid container>
                    <Grid className={classes.gridItem} item xs={12} sm={12} md={6}>
                        <table>
                            <tr>
                                <td className={classes.col1}>Item Name</td>
                                <td className={classes.col2}>
                                    <InputBase
                                        className={classes.input}/>
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Price</td>
                                <td className={classes.col2}>
                                    <InputBase
                                        className={classes.input}/>
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Description</td>
                                <td className={classes.col2}>
                                    {/* <TextField
                                        id="desc"
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        className={classes.textarea}
                                    /> */}
                                    <textarea
                                        rows="4"
                                        className={classes.textarea}
                                    />
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
                                        className={classes.inputimg}/>
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
                                                  checked={state.senin}
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
                                                  checked={state.selasa}
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
                                                  checked={state.rabu}
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
                                                  checked={state.kamis}
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
                                                  checked={state.jumat}
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
                                                  checked={state.sabtu}
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
                                                  checked={state.minggu}
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
                        <Button className={classes.btnsubmit} variant="contained" color="primary">
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