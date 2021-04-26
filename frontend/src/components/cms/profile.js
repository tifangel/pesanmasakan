import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/IconButton';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Title from './title';
import {editProfile} from '../../resource'
import { defaultAPIURL } from '../../config'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: theme.spacing(5),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(0),
        margin: theme.spacing(0),
    },
    contflex: {
        display: 'flex',
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
    contbtn: {
        flex: '5%',
    },
    editbtn: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    icon: {
        fontSize: '1.9vw',
        [theme.breakpoints.down('sm')]: {
            fontSize : '3vw',
        },
    },
    gridcontainer: {
        paddingBottom: theme.spacing(5),
    },
    info: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(6),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
        },
    },
    col1: {
        width: '40%',
        paddingTop: '1.8vw',
        color: '#C4C4C4',
        fontSize : '1.2vw',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        [theme.breakpoints.down('md')]: {
            fontSize : '1.4vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize : '2.5vw',
        },
    },
    col2: {
        width: '60%',
        paddingTop: '1.8vw',
        color: '#000000',
        fontSize : '1.2vw',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(3),
            fontSize : '1.4vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize : '2.5vw',
        },
    },
    input: {
        background: '#F5F5F5',
        marginLeft: '15px',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        width: '15vw',
        [theme.breakpoints.down('md')]: {
            width: '30vw',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px',
            width: '40vw',
        },
    },
    contimg: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(5),
        },
    },
    titleimg: {
        flex: '50%',
        color: '#C4C4C4',
        fontSize : '1.2vw',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        [theme.breakpoints.down('md')]: {
            fontSize : '1.4vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize : '2.5vw',
        },
    },
    img: {
        width: '30vw',
        height: '15vw',
        [theme.breakpoints.down('md')]: {
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40vw',
            height: '25vw',
        },
        [theme.breakpoints.down('sm')]: {
            width: '50vw',
            height: '30vw',
        },
    },
    btnsubmit: {
        borderRadius: '25px',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        fontSize: '15px',
        color: 'white',
        backgroundColor: '#448AC9',
        height: '45px',
        width: '170px',
    },
    fileInput: {
        flex: '50%',
        marginTop: '1.5vw',
        float: 'right'
    }
  }));

const Profile = ({data}) => {

    const [formInput, setFormInput] = useState(data);

    const handleInput = (event) => {
        setFormInput({ ...formInput, [event.target.name]: event.target.value });
      };

    const [statusForm, setStatusForm] = useState('hide');

    const gotoEditProfile = () => {
        setStatusForm('show')
    }
    const submitChange = () => {
        setStatusForm('hide')
    }

    const submitProfile = async() => {
        try {
            console.log(formInput)
            let dataWarung = JSON.parse(JSON.stringify(formInput))

            console.log(dataWarung)
            
            let response = await editProfile(dataWarung)
            console.log(response)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = evt => {
        evt.preventDefault();
    
        console.log(formInput);

        submitProfile();

        window.location.reload();
      };
    
    const classes = useStyles();

    return(
        <React.Fragment>
            <Title nama={data.nama_warung}/>
            <div className={classes.root}>
                <form id="formEditProfile">
                <div className={classes.contflex}>
                    <h1 className={classes.title}>My Warung Profile</h1>
                    <div className={classes.contbtn}>
                        { statusForm === 'hide' && (
                            <IconButton
                                className={classes.editbtn}
                                onClick={gotoEditProfile}
                            >
                                <EditIcon className={classes.icon}/>
                            </IconButton>
                        )}
                        { statusForm === 'show' && (
                            <Button onClick={handleSubmit} className={classes.btnsubmit} variant="contained" color="primary">
                                Submit
                            </Button>
                        )}
                    </div>
                </div>
                <Grid container className={classes.gridcontainer}>
                    <Grid className={classes.info} item xs={12} sm={12} md={12} lg={6}>
                        <table>
                            <tr>
                                <td className={classes.col1}>Warung Name</td>
                                <td className={classes.col2}>
                                    { statusForm === 'hide' && (
                                        data.nama_warung
                                    )}
                                    { statusForm === 'show' && (
                                        <InputBase
                                        name="nama_warung"
                                        type="text"
                                        defaultValue={formInput.nama_warung}
                                        className={classes.input}
                                        onChange={handleInput}/>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Phone Number</td>
                                <td className={classes.col2}>
                                    { statusForm === 'hide' && (
                                        data.no_hp
                                    )}
                                    { statusForm === 'show' && (
                                        <InputBase
                                        name="no_hp"
                                        type="text"
                                        defaultValue={formInput.no_hp}
                                        className={classes.input}
                                        onChange={handleInput}/>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Address</td>
                                <td className={classes.col2}>
                                    { statusForm === 'hide' && (
                                        data.alamat
                                    )}
                                    { statusForm === 'show' && (
                                        <InputBase
                                        name="alamat"
                                        type="text"
                                        multiline
                                        rows="4"
                                        defaultValue={formInput.alamat}
                                        className={classes.input}
                                        onChange={handleInput}/>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Category</td>
                                <td className={classes.col2}>
                                    { statusForm === 'hide' && (
                                        data.kategori
                                    )}
                                    { statusForm === 'show' && (
                                        <select 
                                            name="kategori"
                                            type="text"
                                            defaultValue={formInput.kategori}
                                            className={classes.input}
                                            style={{height: '35px', border: 0, padding: 0}}
                                            onChange={handleInput}
                                        >
                                            <option>Chicken Duck</option>
                                            <option>Masakan Padang</option>
                                            <option>Masakan Cina</option>
                                            <option>Masakan Rumah</option>
                                        </select>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Warung Owner</td>
                                <td className={classes.col2}>
                                    { statusForm === 'hide' && (
                                        data.nama
                                    )}
                                    { statusForm === 'show' && (
                                        <InputBase
                                        name="nama"
                                        type="text"
                                        defaultValue={formInput.nama}
                                        className={classes.input}
                                        onChange={handleInput}/>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.col1}>Email</td>
                                <td className={classes.col2}>
                                    { statusForm === 'hide' && (
                                        data.email
                                    )}
                                    { statusForm === 'show' && (
                                        <InputBase
                                        name="email"
                                        type="text"
                                        defaultValue={formInput.email}
                                        className={classes.input}
                                        onChange={handleInput}/>
                                    )}
                                </td>
                            </tr>
                        </table>
                    </Grid>
                    <Grid className={classes.contimg} item xs={12} sm={12} md={12} lg={6}>
                        <div style={{display: 'flex'}}>
                            <p className={classes.titleimg}>Warung Image</p>
                            { statusForm === 'show' && (
                                <input type="file" className={classes.fileInput}></input>
                            )}
                        </div>
                        <img src={defaultAPIURL+data.pic} className={classes.img}/>
                    </Grid>
                </Grid>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Profile