'use strict';

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const bcrypt = require('bcryptjs');

var response = require('./response');
var connection = require('./db');

exports.get_pembeli = function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    connection.query("SELECT * FROM user_pembeli WHERE username = '" + username + "' and password = '" + password + "'", function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            if(rows.length > 0){
                const token = jwt.sign({username: username, role: role}, accessTokenSecret, { expiresIn: 86400 })
                var data = {
                    'role': role,
                    'token': token
                };
                res.json(data);
                res.end();
            }else{
                res.send('Username or password incorrect')
            }
        }
    });
}

exports.get_penjual = function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    connection.query("SELECT * FROM user_penjual WHERE username = '" + username + "' and password = '" + password + "'", function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            if(rows.length > 0){
                const token = jwt.sign({username: username, role: role}, accessTokenSecret, { expiresIn: 86400 })
                var data = {
                    'role': role,
                    'token': token
                };
                res.json(data);
                res.end();
            }else{
                res.send('Username or password incorrect')
            }
        }
    });
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
        query = 'SELECT username, nama, email, no_hp FROM user_pembeli WHERE username = ' + username
    }else{
        query = `SELECT username, id_warung, w.nama nama_warung, u.nama nama, no_hp, email, alamat, kategori, pic, latitude, longitude
                FROM user_penjual u join warung w ON (u.id_warung = w.id) WHERE username = ` + username
    }

    connection.query(query, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res);
        }
    });
}

exports.tambah_user_pembeli = function(req, res){
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const no_hp = req.body.no_hp
    const nama = req.body.nama

    const query_add_user_pembeli = 'INSERT INTO user_pembeli VALUES ("' + username + '", "' + password + '", "' + email + '", "' + no_hp + '", "' + nama + '")'
    console.log(query_add_user_pembeli)

    connection.query(query_add_user_pembeli, function (error, rows, fields){
        if (error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
}

exports.tambah_user_penjual = function(req, res){
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const no_hp = req.body.no_hp
    const id_warung = req.body.id
    const nama = req.body.nama

    const query_add_user_penjual = 'INSERT INTO user_penjual VALUES ("' + username + '", "' + password + '", "' + email + '", "' + no_hp + '", ' + id_warung + ', "' + nama + '")'
    console.log(query_add_user_penjual)

    connection.query(query_add_user_penjual, function (error, rows, fields){
        if (error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
}