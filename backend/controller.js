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

exports.add_menu = function(req,res){
    const id_warung = req.body.id_warung;
    const nama = req.body.nama;
    const harga = parseInt(req.body.harga);
    const desc_menu = req.body.desc_menu;
    const pic = req.body.pic;
    const hari = req.body.hari;

    const query_add_menu = 'INSERT INTO menu (id_warung, nama, harga, desc_menu, pic) VALUES (' + id_warung + ', "' + nama + '", ' + harga + ', "' + desc_menu + '", "' + pic + '")';
    connection.query(query_add_menu, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            var id_menu = rows.insertId

            let query_add_hari_menu = 'INSERT INTO hari_menu (id_menu, hari) VALUES '
            for (var i=0; i < hari.length; i++){
                query_add_hari_menu += '(' + id_menu + ', "' + hari[i] + '")' 
                if(i < hari.length-1){
                    query_add_hari_menu += ', '
                }    
            }
            connection.query(query_add_hari_menu, function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    response.ok(rows, res)
                }
            })
        }
    });
}

exports.delete_menu = function(req, res){
    const id_menu = req.body.id;

    const query_delete_menu = "DELETE FROM menu WHERE id = " + id_menu
    const query_delete_hari_menu = "DELETE FROM hari_menu WHERE id_menu = " + id_menu
    connection.query(query_delete_hari_menu, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            connection.query(query_delete_menu, function (error, rows, fields){
                if(error){
                    console.log(error)
                }else{
                    response.ok(rows, res)
                }
            });
        }
    });
}

exports.update_menu = function(req,res){
    const id_menu = req.body.id;
    const nama = req.body.nama;
    const harga = req.body.harga;
    const desc_menu = req.body.desc_menu;
    const pic = req.body.pic;
    const hari = req.body.hari;

    const query_update_menu = 'UPDATE menu SET nama = "' + nama + '", harga = ' + harga + ', desc_menu = "' + desc_menu + '", pic = "' + pic + '" WHERE id = ' + id_menu
    connection.query(query_update_menu, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            const query_delete_hari_menu = "DELETE FROM hari_menu WHERE id_menu = " + id_menu
            connection.query(query_delete_hari_menu, function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    let query_add_hari_menu = 'INSERT INTO hari_menu (id_menu, hari) VALUES '
                    for (var i=0; i < hari.length; i++){
                        query_add_hari_menu += '(' + id_menu + ', "' + hari[i] + '")' 
                        if(i < hari.length-1){
                            query_add_hari_menu += ', '
                        }    
                    }
                    connection.query(query_add_hari_menu, function (error, rows, fields){
                        if(error){
                            console.log(error)
                        } else{
                            response.ok(rows, res)
                        }
                    })
                }
                
            })
        }
    });
}


exports.ubah_data_warung = function(req,res){
    const username = req.body.username
    const id_warung = req.body.id_warung
    const nama_warung = req.body.nama_warung
    const nama_owner = req.body.nama_owner
    const no_hp = req.body.no_hp
    const email = req.body.email
    const alamat = req.body.alamat
    const kategori = req.body.kategori
    const pic = req.body.pic

    console.log(req.body)
    const query_update_warung = 'UPDATE warung, user_penjual SET warung.nama = "' + nama_warung + '", warung.alamat = "' + alamat + '", warung.kategori = "' + kategori + '", warung.pic = "' + pic + 
                                '", user_penjual.nama = "' + nama_owner + '", user_penjual.email = "' + email + '", user_penjual.no_hp = "' + no_hp +
                                '" WHERE user_penjual.id_warung = warung.id AND warung.id = ' + id_warung
    console.log(query_update_warung)

    connection.query(query_update_warung, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.tambah_warung = function(req,res){
    connection.query('INSERT INTO warung SET (nama,alamat,kategori,pic,longitude,langitude) VALUES ("' + 
                     req.body.nama + '", "' + req.body.alamat + '", "' + req.body.cat + '", "' + req.body.pic + '", ' + parseFloat(req.body.long) + ', ' + parseFloat(req.body.lang) + 
                     ')', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.hapus_warung = function(req,res){
    connection.query("DELETE FROM warung WHERE id=" + req.body.id, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}