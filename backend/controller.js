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
    const title = req.query.title;

    connection.query("SELECT * FROM menu WHERE nama LIKE '%" + title + "%'", function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.daftar_hari_menu = function(req,res){
    connection.query("SELECT hari FROM hari_menu WHERE id_menu = " + req.query.id, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.ubah_data_warung = function(req,res){
    connection.query("UPDATE warung, user_penjual SET warung.nama = " + req.body.nama + ", warung.alamat = " + req.body.alamat + ", warung.kategori = " + req.body.cat + ", warung.pic = " + req.body.pic + 
                     "user_penjual.username = " + req.body.username + "user_penjual.email = " + req.body.email + "user_penjual.no_hp = " + req.body.hp +
                     " WHERE user_penjual.id_warung = warung.id AND warung.id = " + req.body.idwarung, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}