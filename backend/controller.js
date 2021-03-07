'use strict';

var response = require('./response');
var connection = require('./db');

exports.daftar_warung = function(req, res) {
    connection.query('SELECT * FROM warung', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.lihat_warung = function(req, res) {
    connection.query("SELECT * FROM warung WHERE id = " + req.params.id, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.cari_warung = function(req,res, next) {
    const title = req.query.title;
    const location = req.query.location;

    connection.query("SELECT * FROM warung WHERE nama LIKE '%" + title + "%' AND alamat LIKE '%" + location + "%'", function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.lihat_kategori = function(req, res) {
    const category = req.query.category;

    connection.query("SELECT DISTINCT kategori FROM warung", function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
}


exports.daftar_menu = function(req, res) {
    const sql = req.query.id_warung? `SELECT * FROM menu WHERE id_warung=${req.query.id_warung}` : 'SELECT * FROM menu';
    connection.query(sql, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.lihat_menu = function(req, res) {
    connection.query("SELECT * FROM menu WHERE id = " + req.params.id, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.cari_menu = function(req,res, next) {
    console.log("masuk")
    const title = req.query.title;

    connection.query("SELECT * FROM menu WHERE nama LIKE '%" + title + "%'", function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};