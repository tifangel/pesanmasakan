'use strict';

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var response = require('./response');
var connection = require('./db');

exports.get_auth = function(req, res){
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role

    console.log(req.body)

    const query_get_auth = "SELECT * FROM user WHERE username = '" + username  + "' and role = '" + role + "'"
    
    connection.query(query_get_auth, async function (error, rows, fields){
        if(error){
            console.log("get_auth", error)
        }else{
            if(rows.length > 0){
                const validPassword = await bcrypt.compare(password, rows[0].password)
                if(validPassword){
                    const token = jwt.sign({username: username, role: role}, accessTokenSecret, { expiresIn: 86400 })
                    var data = {
                        'role': role,
                        'token': token
                    }
                    res.json(data)
                }else{
                    res.json({message: 'Username or password incorrect or login other role'})
                }
            }else{
                res.json({message: 'Username or password incorrect'})
            }
            res.end()
        }
    })
}

exports.get_my_profile = function(req, res){
    const authenticated = req.headers.authorization
    const token = authenticated.split(' ')[1]
    const credentials = new Buffer.from(token, 'base64').toString('ascii').split('}{')[1];
    
    var [username, role] = credentials.split(',');
    username = username.split(':')[1]
    role = role.split(':')[1]
    var query

    if(role.includes('customer')){
        query = 'SELECT id, nama, email, no_hp FROM user WHERE username = ' + username
    }else{
        query = `SELECT u.id id, w.id id_warung, w.nama nama_warung, u.nama nama, no_hp, email, alamat, kategori, pic, latitude, longitude
                FROM user u JOIN warung_owner wo ON (u.id = wo.id_user) JOIN warung w ON (wo.id_warung = w.id) WHERE username = ` + username
    }

    connection.query(query, function (error, rows, fields){
        if(error){
            console.log("get_my_profile", error)
            res.json({detail: 'token expired'})
        } else{
            response.ok(rows, res);
        }
    });
}

exports.add_user_customer = function(req, res){
    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password, salt)
    const email = req.body.email
    const no_hp = req.body.no_hp
    const nama = req.body.nama
    const role = req.body.role

    const query_add_user = 'INSERT INTO user VALUES ( DEFAULT, "' + username + '", "' + email + '", "' + password + '", "' + role + '", "' + nama + '", "' + no_hp + '")'

    connection.query(query_add_user, function (error, rows, fields){
        if (error){
            res.json({message: "Fail to register account, try to use other username"})
            console.log("add_user_customer", error)
        } else {
            response.ok(rows, res)
        }
    });
}

exports.add_user_warung = function(req, res){
    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password, salt)
    const email = req.body.email
    const phone = req.body.phone
    const name = req.body.name
    const role = req.body.role

    const warung_name = req.body.warung_name 
    const addr = req.body.address
    const cat = req.body.cat
    const pic = req.body.pic
    const latitude = req.body.lat
    const longitude = req.body.long
    
    var promises = [];

    const query_add_user = 'INSERT INTO user VALUES ( DEFAULT, "' + username + '", "' + email + '", "' + password + '", "' + role + '", "' + name + '", "' + phone + '")'
    const query_add_warung = 'INSERT INTO warung VALUES ( DEFAULT, "' + warung_name + '", "' + addr + '", "' + cat + '", "' + pic + '", ' + latitude + ', ' + longitude + ')'
    
    var id_user;
    var id_warung;

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_add_user, (error, rows, field) => {
            if (error) reject(error);
            else {
                id_user = rows.insertId
                resolve(rows, res)
            }
        });
    }));
    
    promises.push(new Promise((resolve, reject) => {
        connection.query(query_add_warung, (error, rows, field) => {
            if (error) reject(error);
            else {
                id_warung = rows.insertId
                resolve(rows, res)
            }
        });
    }));

    Promise.all(promises)
        .then((values) => {
            const query_add_warung_owner = 'INSERT INTO warung_owner VALUES (' + id_user + ',' + id_warung + ')'
            connection.query(query_add_warung_owner, function (error, rows, fields){
                if (error){
                    res.json({message: "Fail to register account"})
                    console.log("add_user_warung", error)
                } else {
                    response.ok(rows, res)
                }
            });
        })
        .catch((error) => {
            res.json({message: "Fail to register account"})
            console.log("add_user_warung", error)
        });
}