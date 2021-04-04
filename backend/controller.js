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

exports.get_cooklist = function(req, res) {
    const id = req.params.id;
    // TODO: tgl_transaksi perlu diganti jadi buat tgl berapa order ini
    const query = `
        SELECT t.tgl_transaksi, m.id, m.nama, SUM(tm.jumlah_porsi) as qty
        FROM transaksi_menu tm JOIN menu m ON (tm.id_menu = m.id)
            JOIN transaksi t ON (tm.id_transaksi = t.id)
        WHERE m.id_warung = ${id} AND tm.status = 0
        GROUP BY t.tgl_transaksi, m.nama;
    `;

    connection.query(query, (error, rows, field) => {
        if (error) console.log("Get cooklist", error);
        else response.ok(rows, res);
    });
}

exports.orderlist_penjual = function(req, res) {
    const id = req.params.id;
    const query = `
        SELECT id_pembeli, tgl_transaksi, alamat_tujuan, total, status, id_warung
        FROM transaksi
        WHERE id_warung = ${id}
    `;

    connection.query(query, async (error, rows, field) => {
        if (error) console.log("Orderlist penjual", error);
        else {
            console.log(rows);
            var details = await orderlist_details(rows);
            console.log("details", details);
            response.ok(details, res);
        }

    });
}

var orderlist_details = async function(rows) {
    var promises = [];
    for (var i = 0; i < rows.length; i++) {
        const row = rows[i];
        promises.push(new Promise((resolve, reject) => {
            var date = ("0" + row.tgl_transaksi.getDate()).slice(-2);
            var month = ("0" + (row.tgl_transaksi.getMonth() + 1)).slice(-2);
            var year = row.tgl_transaksi.getFullYear();
            var tgl = `${year}-${month}-${date}`;
            var query = `
                SELECT jumlah_porsi, m.nama, m.harga, tm.status
                FROM menu m JOIN transaksi_menu tm ON (m.id = tm.id_menu)
                    JOIN transaksi t ON (t.id = tm.id_transaksi)
                WHERE id_pembeli = ${row.id_pembeli} AND tgl_transaksi = "${tgl}";
            `;
            console.log(query);
            connection.query(query, (error, rows, field) => {
                if (error) reject("Orderlist details", row.id_pembeli, error);
                else {
                    row.orders = rows;
                    console.log(row);
                    resolve(row);
                }
            });
        }));
    }
    return Promise.all(promises).then((values) => values).catch((error) => console.log(error));
}

exports.orderlist_pembeli = function(req, res) {
    const id = req.params.id;
    // TODO: waktu
    const query = `
        SELECT w.nama, SUM(tm.jumlah_porsi), t.tgl_transaksi, 
            t.total, t.status 
        FROM transaksi t JOIN transaksi_menu tm ON (t.id = tm.id_transaksi)
            JOIN menu m ON (tm.id_menu = m.id)
            JOIN warung w ON (w.id = m.id_warung)
        WHERE id_pembeli = ${id}
        GROUP BY w.nama;
    `;        

    connection.query(query, (error, rows, field) => {
        if (error) console.log("Orderlist pembeli", error);
        else response.ok(rows, res);
    });
}

exports.add_order = function(req, res) {
    const id_pembeli = req.body.id_pembeli;
    const tgl_transaksi = req.body.tgl_transaksi;
    const total = req.body.total;
    const alamat = req.body.alamat;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const orders = req.body.orders;
    const id_warung = req.body.id_warung;
    // contoh orders = [
    //     { "id_menu": "1", "qty": 5},
    //     { "id_menu": "5", "qty": 9},
    // ]

    const query_transaksi = `
        INSERT INTO transaksi VALUES (
            DEFAULT, ${id_pembeli}, "${tgl_transaksi}", ${total}, 
            "${alamat}", ${longitude}, ${latitude}, 0, ${id_warung}
        );
    `;

    connection.query(query_transaksi, (error, rows, field) => {
        if (error) console.log("Add order", error);
        else {
            console.log(rows);
            var query_menu = `INSERT INTO transaksi_menu VALUES`;

            for (var i = 0; i < orders.length; i++) {
                query_menu += ` (${rows.insertId}, ${orders[i].id_menu}, ${orders[i].qty}, 0)`
                if (i < orders.length-1) query_menu += `,`;
            }

            connection.query(query_menu, (error, rows, field) => {
                if (error) console.log("Add transaksi menu", error);
                else response.ok(rows, res);
            });
        }
    });
}

exports.update_order = function(req, res) {
    // Mengubah status order menjadi completed / cancelled
    // Prereq: semua menu dalam order ini harus berstatus 1 kalau mau jadi completed
    const status = req.body.status;
    const id_order = req.body.id;

    const query = `
        UPDATE transaksi SET status = ${status} WHERE id = ${id_order};
    `;

    connection.query(query, (error, rows, field) => {
        if (error) console.log("Update order", error);
        else response.ok(rows, res);
    });
}

exports.update_ordermenu = function(req, res) {
    // Mengubah status pemasakan menu menjadi completed
    const id_menu = req.body.id;
    const tanggal = req.body.tanggal;

    const query = `
        UPDATE transaksi_menu tm JOIN transaksi t ON (tm.id_transaksi = t.id)
        SET tm.status = 1
        WHERE tm.id_menu = ${id_menu} AND tgl_transaksi = "${tanggal}";
    `;

    connection.query(query, (error, rows, field) => {
        if (error) console.log("Update order", error);
        else response.ok(rows, res);
    });
}

exports.overview_order = function(req, res) {
    const id = req.params.id;
    var promises = [];
    const query_order = `
        SELECT YEAR(tgl_transaksi) as year, MONTH(tgl_transaksi) as month, COUNT(*) as qty
        FROM transaksi_menu tm JOIN menu m ON (tm.id_menu = m.id)
            JOIN transaksi t ON (t.id = tm.id_transaksi)
        WHERE t.id_warung = ${id}
        GROUP BY year, month;
    `;
    const query_profit = `
        SELECT YEAR(tgl_transaksi) as year, MONTH(tgl_transaksi) as month, SUM(total) as profit
        FROM transaksi_menu tm JOIN menu m ON (tm.id_menu = m.id)
            JOIN transaksi t ON (t.id = tm.id_transaksi)
        WHERE t.id_warung = ${id}
        GROUP BY year, month; 
    `;

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_order, (error, rows, field) => {
            if (error) reject(error);
            else {
                resolve(rows, res);
            }
        });
    }));

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_profit, (error, rows, field) => {
            if (error) reject(error);
            else {
                resolve(rows, res);
            }
        });
    }));

    Promise.all(promises)
        .then((values) => response.ok(values, res))
        .catch((error) => console.log(error));
}