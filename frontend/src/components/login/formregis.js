import React, { useState, useEffect, useReducer } from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputBase, Button, Grid, } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#FFFFFF",
        width: '30vw',
        padding: theme.spacing(6),
        margin: theme.spacing(4),
    },
    title: {
        fontSize: '4.15vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        color: '#000000',
        paddingLeft: theme.spacing(1),
        margin: theme.spacing(0),
        borderLeft: '0.65vw solid #FDCB35',
    },
    title2: {
        fontSize: '4.15vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'bold',
        color: '#000000',
        paddingLeft: theme.spacing(1),
        margin: theme.spacing(0),
        position: 'relative',
        top: '-1.63vw',
        borderLeft: '0.65vw solid #FDCB35',
    },
    subtitle: {
        fontSize: '1.2vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'light',
        color: '#000000',
    },
    input: {
        background: '#F5F5F5',
        paddingLeft: theme.spacing(1),
        width: '100%',
        fontSize: '1vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        marginBottom: '1.3vw',
    },
    btnsubmit: {
        fontSize: '1.2vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'medium',
        color: '#000000',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '13vw',
        background: '#FDCB35',
        marginTop: '1.3vw',
    },
    box: {
        display: 'flex',
        fontSize: '0.95vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
    },
    text1: {
        flex: '60%',
        textAlign: 'right',
    },
    text2: {
        flex: '40%',
        color: '#FDCB35',
        fontWeight: 'black',
        cursor: 'pointer',
        paddingLeft: theme.spacing(1)
    },
    box2: {
        display: 'flex',
        fontSize: '0.95vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        position: 'relative',
        top: '2.5vw',
    },
    texthave: {
        // flex: '',
    },
    textsignin: {
        // flex: '40%',
        color: '#FDCB35',
        fontWeight: 'black',
        cursor: 'pointer',
    },
    btnnext: {
        fontSize: '1.2vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'medium',
        color: '#000000',
        position: 'relative',
        left: '35%',
        top: '-1.5vw',
        width: '8vw',
        background: '#FDCB35',
        // marginTop: '1.3vw',
    },
    root2: {
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: theme.spacing(5),
        margin: theme.spacing(4),
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
            fontSize : '2vw',
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
            fontSize : '2vw',
        },
    },
    input2: {
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
            fontSize : '2vw',
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
    fileInput: {
        flex: '25%',
        height: '40px',
        float: 'right',
        border: 0,
        borderRadius: '25px',
        background: '#448AC9',
        color: '#FFFFFF',
        fontSize : '14px',
        fontFamily : 'Roboto Slab',
        fontWeight : 'regular',
        [theme.breakpoints.down('md')]: {
            flex: '15%',
        },
    },
    btnsubmit2: {
        fontSize: '18px',
        fontFamily: 'Roboto Slab',
        fontWeight: 'medium',
        color: '#000000',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '185px',
        background: '#FDCB35',
        // marginTop: '1.3vw',
    },
}));

const FormRegis = ({status, changeForm, changeStatusForm}) => {

    const [formCreateWarung, setFormCreateWarung] = useState('hide')

    let location = useLocation();
    let history = useHistory();

    const [dataRegis, setDataRegis] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        currpassword: "",
        nama_warung: "",
        alamat: "",
        kategori: "",
        nama_owner: "",
        pic: "",
    })

    const handleInput = (event) => {
        setDataRegis({ ...dataRegis, [event.target.name]: event.target.value });
    }

    const gotoFormCreateWarung = () => {
        setFormCreateWarung('show')
    }

    const submitData = async() => {
        try {
            let data = JSON.parse(JSON.stringify(dataRegis))

            console.log(data)
            
            let response
            // status === 'customer'? response = await regiscustomer(data) : response = await regiswarung(data)
            // console.log(response)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = () => {
        console.log(dataRegis)

        // submitData()

        history.push('/');
    }

    const classes = useStyles();

    return(
        <React.Fragment>
            {formCreateWarung === 'hide'?
                <Paper className={classes.root}>
                    <p className={classes.title}>SIGN</p>
                    <p className={classes.title2}>UP</p>
                    <p className={classes.subtitle}>
                        {status === 'customer'? "Customer Account" : "Warung Account"}
                    </p>
                    {status === 'customer' && (
                        <InputBase
                        name="fullname"
                        type="text"
                        placeholder="Fullname"
                        className={classes.input}
                        onChange={handleInput}/>
                    )}
                    <InputBase
                        name="username"
                        type="text"
                        placeholder="Username"
                        className={classes.input}
                        onChange={handleInput}/>
                    <InputBase
                        name="email"
                        type="text"
                        placeholder="Email"
                        className={classes.input}
                        onChange={handleInput}/>
                    <InputBase
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
                        className={classes.input}
                        onChange={handleInput}/>
                    <InputBase
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={classes.input}
                        onChange={handleInput}/>
                    <InputBase
                        name="currpassword"
                        type="password"
                        placeholder="Confirm Your Password"
                        className={classes.input}
                        onChange={handleInput}/>
                    {status === 'customer'? 
                        <React.Fragment>
                            <Button onClick={handleSubmit} className={classes.btnsubmit} variant="contained">
                                Register
                            </Button>
                            <div className={classes.box}>
                                <p className={classes.text1}>You have account?</p>
                                <p className={classes.text2}
                                    onClick={changeForm}
                                    >Sign In</p>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div className={classes.box2}>
                                <p className={classes.texthave}>You have account?</p>
                                <p className={classes.textsignin}
                                    onClick={changeForm}
                                    >Sign In</p>
                                <Button onClick={gotoFormCreateWarung} className={classes.btnnext} variant="contained">
                                    Next
                                </Button>
                            </div>
                        </React.Fragment>
                    }    
                </Paper>
                :
                <Paper className={classes.root2}>
                    <p className={classes.title}>SIGN</p>
                    <p className={classes.title2}>UP</p>
                    <Grid container className={classes.gridcontainer}>
                        <Grid className={classes.info} item xs={12} sm={12} md={12} lg={6}>
                            <table>
                                <tr>
                                    <td className={classes.col1}>Warung Name</td>
                                    <td className={classes.col2}>
                                        <InputBase
                                            name="nama_warung"
                                            type="text"
                                            className={classes.input2}
                                            onChange={handleInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.col1}>Address</td>
                                    <td className={classes.col2}>
                                        <InputBase
                                            name="alamat"
                                            type="text"
                                            multiline
                                            rows="4"
                                            className={classes.input2}
                                            onChange={handleInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.col1}>Category</td>
                                    <td className={classes.col2}>
                                        <select 
                                            name="kategori"
                                            type="text"
                                            className={classes.input2}
                                            style={{height: '35px', border: 0, padding: 0}}
                                            onChange={handleInput}
                                        >
                                            <option>Chicken Duck</option>
                                            <option>Masakan Padang</option>
                                            <option>Masakan Cina</option>
                                            <option>Masakan Rumah</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={classes.col1}>Warung Owner</td>
                                    <td className={classes.col2}>
                                        <InputBase
                                            name="nama_owner"
                                            type="text"
                                            className={classes.input2}
                                            onChange={handleInput}/>
                                    </td>
                                </tr>
                            </table>
                        </Grid>
                        <Grid className={classes.contimg} item xs={12} sm={12} md={12} lg={6}>
                            <div style={{display: 'flex'}}>
                                <p className={classes.titleimg}>Warung Image</p>
                                <input id="uploadfile" type="file" hidden="hidden"></input>
                                <Button 
                                    className={classes.fileInput}
                                    onClick={() => {
                                        document.getElementById("uploadfile").click()
                                    }}
                                >
                                    Upload
                                </Button>
                            </div>
                            <img src="/logo512.png" className={classes.img}/>
                        </Grid>
                    </Grid>
                    <Button onClick={handleSubmit} className={classes.btnsubmit2} variant="contained">
                        Register
                    </Button>
                </Paper>
            }
        </React.Fragment>
    );
}

export default FormRegis;