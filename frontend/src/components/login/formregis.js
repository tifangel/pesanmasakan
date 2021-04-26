import React, { useState, useEffect, useReducer } from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, InputBase, Button, Grid, } from '@material-ui/core'
import { getCategories, insertPembeli, insertPenjual, insertWarung} from '../../resource';
import { loadCategories } from '../filter/FilterParams';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#FFFFFF",
        width: '30vw',
        padding: theme.spacing(6),
        margin: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            width: '50vw',
            padding: theme.spacing(5),
        },
        [theme.breakpoints.down('sm')]: {
            width: '70vw',
            padding: theme.spacing(3),
        },
    },
    title: {
        fontSize: '4.15vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        color: '#000000',
        paddingLeft: theme.spacing(1),
        margin: theme.spacing(0),
        borderLeft: '0.65vw solid #FDCB35',
        [theme.breakpoints.down('md')]: {
            fontSize: '5.5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '7vw',
        },
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
        [theme.breakpoints.down('md')]: {
            fontSize: '5.5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '7vw',
        },
    },
    subtitle: {
        fontSize: '1.2vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'light',
        color: '#000000',
        [theme.breakpoints.down('md')]: {
            fontSize: '2vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5vw',
        },
    },
    input: {
        background: '#F5F5F5',
        padding: theme.spacing(1),
        width: '100%',
        fontSize: '1vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        marginBottom: '1.3vw',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8vw',
            marginBottom: '2vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.2vw',
            padding: theme.spacing(0),
            paddingLeft: theme.spacing(1),
        },
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
        [theme.breakpoints.down('md')]: {
            width: '22vw',
            marginTop: '3vw',
            fontSize: '2vw',
        },
        [theme.breakpoints.down('sm')]: {
            width: '30vw',
            marginTop: '5vw',
            fontSize: '2.5vw',
        },
    },
    box: {
        display: 'flex',
        fontSize: '0.95vw',
        fontFamily: 'Roboto Slab',
        fontWeight: 'regular',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.2vw',
        },
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
        [theme.breakpoints.down('md')]: {
            top: '4vw',
            fontSize: '1.8vw',
        },
        [theme.breakpoints.down('sm')]: {
            top: '6vw',
            marginBottom: '4vw',
            fontSize: '2.2vw',
        },
    },
    textsignin: {
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
        // left: '10vw',
        top: '-1.5vw',
        width: '8vw',
        flex: '20vw',
        background: '#FDCB35',
        [theme.breakpoints.down('md')]: {
            fontSize: '2vw',
            // left: '20vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5vw',
            // left: '20vw',
        },
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
            fontSize : '2vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize : '2.8vw',
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
            fontSize : '2.2vw',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px',
            width: '40vw',
            fontSize : '3vw',
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
            fontSize : '2vw',
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
            marginTop: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
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
            height: '6vw',
            fontSize : '1.7vw',
        },
        [theme.breakpoints.down('sm')]: {
            height: '8vw',
            fontSize : '2.5vw',
        },
    },
}));

const FormRegis = ({status, changeForm, changeStatusForm}) => {

    const [formCreateWarung, setFormCreateWarung] = useState('hide')
    const [categories, setCategories] = useState([])

    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        const loadCategories = async() => {
            const cat = await getCategories()
            setCategories(cat.data.values)
            setDataRegis({ ...dataRegis, cat: cat.data.values[0].kategori });
        }
        loadCategories()
    }, []) 

    const [dataRegis, setDataRegis] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        currpassword: "",
        warung_name: "",
        address: "",
        cat: "",
        pic: "",
    })

    const handleInput = (event) => {
        setDataRegis({ ...dataRegis, [event.target.name]: event.target.value });
    }

    const gotoFormCreateWarung = () => {
        if (
            dataRegis.username != "" &&
            dataRegis.password != "" &&
            dataRegis.email != "" &&
            dataRegis.phone != "" &&
            dataRegis.password === dataRegis.currpassword
        ){
            setFormCreateWarung('show')
        } else {
            alert("All input field must be fill or your password uncorrect")
        }
    }

    const handleSubmit = async() => {
        let response = 0
        if(status === 'customer' &&
            dataRegis.username != "" &&
            dataRegis.password != "" &&
            dataRegis.email != "" &&
            dataRegis.phone != "" &&
            dataRegis.name != ""
        ){
            response = await insertPembeli({
                username: dataRegis.username,
                password: dataRegis.password,
                email: dataRegis.email,
                no_hp: dataRegis.phone,
                nama: dataRegis.name,
                role: status
            })
            
            if(response.data.message) {
                alert(response.data.message)
            }
            else{
                alert("registration is successful")
                history.push('/');
            }
        }else if (status === 'warung' &&
            dataRegis.warung_name != "" &&
            dataRegis.address != "" 
        ){
            navigator.geolocation.getCurrentPosition(async(position) => {
                dataRegis.lat = position.coords.latitude
                dataRegis.long = position.coords.longitude
                dataRegis.role = status
                response = await insertPenjual(dataRegis)
                
                if(response.data.message) {
                    alert(response.data.message)
                }
                else{
                    alert("registration is successful")
                    history.push('/');
                }
            }, () => alert('please allow location'), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
        }else {
            alert("All input field must be fill")
        }
    }

    const classes = useStyles();

    return(
        <React.Fragment>
                <Paper className={classes.root}>
                    <p className={classes.title}>SIGN</p>
                    <p className={classes.title2}>UP</p>
                    {formCreateWarung === 'hide'? <>
                        <p className={classes.subtitle}>
                            {status === 'customer'? "Customer Account" : "Warung Account"}
                        </p>
                        {status === 'customer' && (
                            <InputBase
                            name="name"
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
                                    <div style={{display: 'flex', flex: '80vw'}}>
                                        <p>You have account?</p>
                                        <p className={classes.textsignin}
                                            onClick={changeForm}
                                            >Sign In</p>
                                    </div>
                                    <Button onClick={gotoFormCreateWarung} className={classes.btnnext} variant="contained">
                                        Next
                                    </Button>
                                </div>
                            </React.Fragment>
                        }  
                    </> : <>
                        <Grid container>
                            <Grid className={classes.info} item xs={12} sm={12} md={12} lg={6}>
                                <table>
                                    <tr>
                                        <td className={classes.col1}>Warung Name</td>
                                        <td className={classes.col2}>
                                            <InputBase
                                                name="warung_name"
                                                type="text"
                                                className={classes.input2}
                                                onChange={handleInput}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.col1}>Address</td>
                                        <td className={classes.col2}>
                                            <InputBase
                                                name="address"
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
                                                name="cat"
                                                type="text"
                                                className={classes.input2}
                                                style={{height: '35px', border: 0, padding: 0}}
                                                onChange={handleInput}
                                            >
                                                {categories.map(it => <option>{it.kategori}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.col1}>Warung Owner</td>
                                        <td className={classes.col2}>
                                            <InputBase
                                                name="name"
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
                                    <input id="uploadfile" type="file" hidden="hidden" onChange={(e)=>console.log(document.getElementById("uploadfile").value)}></input>
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
                        <Button onClick={handleSubmit} className={classes.btnsubmit} variant="contained">
                            Register
                        </Button>
                    </> }  
                </Paper>
        </React.Fragment>
    );
}

export default FormRegis;