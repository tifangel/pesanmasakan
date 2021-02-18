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
}